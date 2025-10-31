import fs from 'fs';
import path from 'path';

/**
 * Parses a .dev.vars file content into a key-value object.
 * Handles comments and quoted values.
 * @param {string} content The content of the .dev.vars file.
 * @returns {Record<string, string>} The parsed key-value pairs.
 */
const parseDevVars = (content) => {
  const vars = {};
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const equalsIndex = trimmedLine.indexOf('=');
      if (equalsIndex > 0) {
        const key = trimmedLine.substring(0, equalsIndex).trim();
        let value = trimmedLine.substring(equalsIndex + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.substring(1, value.length - 1);
        }
        vars[key] = value;
      }
    }
  }
  return vars;
};

/**
 * Checks if any placeholder in a given string is missing from the variables.
 * @param {string} str The string to check.
 * @param {Record<string, string>} variables The environment variables.
 * @returns {boolean} True if a required variable is missing, false otherwise.
 */
const isPlaceholderMissing = (str, variables) => {
  const matches = str.match(/\${(.+?)}/g);
  if (!matches) {
    return false;
  }
  return matches.some((match) => {
    const varName = match.substring(2, match.length - 1);
    return variables[varName] === undefined;
  });
};

/**
 * Recursively checks an object for any string value that has an unresolved placeholder.
 * @param {any} obj The object to check.
 * @param {Record<string, string>} variables The environment variables.
 * @returns {boolean} True if any value has a missing placeholder, false otherwise.
 */
const hasMissingVariables = (obj, variables) => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      if (isPlaceholderMissing(obj[key], variables)) {
        return true;
      }
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (hasMissingVariables(obj[key], variables)) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Replaces placeholders in a string with variable values.
 * Throws an error if a variable is not found.
 * @param {string} str The string to process.
 * @param {Record<string, string>} variables The variables to use for substitution.
 * @returns {string} The string with placeholders replaced.
 */
const replacePlaceholders = (str, variables) => {
  return str.replace(/\${(.+?)}/g, (match, varName) => {
    const value = variables[varName];
    if (value === undefined) {
      // This should not happen if the pre-filtering is done correctly
      throw new Error(
        `FATAL: Unhandled environment variable "${varName}" for placeholder "${match}".`,
      );
    }
    return value;
  });
};

/**
 * Recursively traverses the config object and replaces placeholders in all string values.
 * @param {any} obj The object to process.
 * @param {Record<string, string>} variables The variables to use for substitution.
 * @returns {any} The object with placeholders replaced.
 */
const substituteVariables = (obj, variables) => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = replacePlaceholders(obj[key], variables);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      substituteVariables(obj[key], variables);
    }
  }
  return obj;
};

const BINDING_KEYS = [
  'kv_namespaces',
  'd1_databases',
  'hyperdrive',
  'durable_objects',
  'vectorize',
  'r2_buckets',
  'queues',
  'services',
  'analytics_engine_datasets',
  'browser',
  'ai',
];

const main = async () => {
  const wranglerConfigPath = path.resolve(
    process.cwd(),
    '.output/server/wrangler.json',
  );
  const devVarsPath = path.resolve(process.cwd(), '.dev.vars');
  const environment = process.argv[2];
  let variables = process.env;

  if (!environment) {
    console.error(
      'Error: Environment (staging or production) must be provided as an argument.',
    );
    process.exit(1);
  }

  if (fs.existsSync(devVarsPath)) {
    console.log('Found .dev.vars file. Using it for variable substitution.');
    const devVarsContent = fs.readFileSync(devVarsPath, 'utf-8');
    variables = { ...variables, ...parseDevVars(devVarsContent) };
  } else {
    console.log(
      'No .dev.vars file found. Falling back to process.env for variable substitution.',
    );
  }

  try {
    const wranglerConfigFile = fs.readFileSync(wranglerConfigPath, 'utf-8');
    const config = JSON.parse(wranglerConfigFile);

    if (!config.env || !config.env[environment]) {
      console.error(
        `Error: Environment "${environment}" not found in wrangler.json.`,
      );
      process.exit(1);
    }

    const envConfig = config.env[environment];
    let flattenedConfig = { ...config, ...envConfig };
    delete flattenedConfig.env;

    // 1. Filter out bindings with missing environment variables
    for (const key of BINDING_KEYS) {
      if (flattenedConfig[key]) {
        const bindingConfig = flattenedConfig[key];

        if (Array.isArray(bindingConfig)) {
          const originalCount = bindingConfig.length;
          flattenedConfig[key] = bindingConfig.filter((binding) => {
            const hasMissing = hasMissingVariables(binding, variables);
            if (hasMissing) {
              console.log(
                `Excluding binding from '${key}' due to missing environment variables:`,
                JSON.stringify(binding),
              );
            }
            return !hasMissing;
          });

          if (flattenedConfig[key].length === 0) {
            console.log(
              `Removing empty binding key '${key}' from configuration.`,
            );
            delete flattenedConfig[key];
          } else if (flattenedConfig[key].length < originalCount) {
            console.log(
              `Filtered '${key}' bindings. Kept ${flattenedConfig[key].length} of ${originalCount}.`,
            );
          }
        } else if (
          typeof bindingConfig === 'object' &&
          bindingConfig !== null
        ) {
          // Handle nested arrays like in durable_objects
          if (bindingConfig.bindings && Array.isArray(bindingConfig.bindings)) {
            const originalCount = bindingConfig.bindings.length;
            bindingConfig.bindings = bindingConfig.bindings.filter(
              (binding) => {
                const hasMissing = hasMissingVariables(binding, variables);
                if (hasMissing) {
                  console.log(
                    `Excluding binding from '${key}.bindings' due to missing environment variables:`,
                    JSON.stringify(binding),
                  );
                }
                return !hasMissing;
              },
            );

            if (bindingConfig.bindings.length === 0) {
              console.log(
                `Removing empty binding key '${key}' from configuration because its 'bindings' array is empty.`,
              );
              delete flattenedConfig[key];
            } else if (bindingConfig.bindings.length < originalCount) {
              console.log(
                `Filtered '${key}.bindings'. Kept ${bindingConfig.bindings.length} of ${originalCount}.`,
              );
            }
          } else {
            // Handle simple objects like 'ai' or 'browser'
            const hasMissing = hasMissingVariables(bindingConfig, variables);
            if (hasMissing) {
              console.log(
                `Excluding binding key '${key}' due to missing environment variables:`,
                JSON.stringify(bindingConfig),
              );
              delete flattenedConfig[key];
            }
          }
        }
      }
    }

    // 2. Substitute all remaining ${...} placeholders with actual variable values
    flattenedConfig = substituteVariables(flattenedConfig, variables);

    fs.writeFileSync(
      wranglerConfigPath,
      JSON.stringify(flattenedConfig, null, 2),
    );

    console.log(
      `Successfully flattened and substituted variables in wrangler.json for the "${environment}" environment.`,
    );
  } catch (error) {
    console.error('Error processing wrangler.json:', error.message);
    process.exit(1);
  }
};

main();
