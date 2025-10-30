import fs from 'fs';
import path from 'path';

/**
 * Replaces placeholders in a string with environment variable values.
 * e.g., "${MY_VAR}" -> "value-of-my-var"
 * @param {string} str The string to process.
 * @returns {string} The string with placeholders replaced.
 */
const replacePlaceholders = (str) => {
  return str.replace(/\${(.+?)}/g, (match, varName) => {
    const value = process.env[varName];
    if (value === undefined) {
      console.warn(
        `Warning: Environment variable "${varName}" not found for placeholder "${match}".`,
      );
      return match; // Keep the placeholder if the variable is not found
    }
    return value;
  });
};

/**
 * Recursively traverses the config object and replaces placeholders in all string values.
 * @param {any} obj The object to process.
 * @returns {any} The object with placeholders replaced.
 */
const substituteVariables = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = replacePlaceholders(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      substituteVariables(obj[key]);
    }
  }
  return obj;
};

const main = async () => {
  const wranglerConfigPath = path.resolve(
    process.cwd(),
    '.output/server/wrangler.json',
  );
  const environment = process.argv[2];

  if (!environment) {
    console.error(
      'Error: Environment (staging or production) must be provided as an argument.',
    );
    process.exit(1);
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

    // 1. Merge the environment-specific config into the top-level config
    let flattenedConfig = { ...config, ...envConfig };

    // 2. Remove the 'env' key as it's not allowed in redirected configurations
    delete flattenedConfig.env;

    // 3. Substitute all ${...} placeholders with actual environment variable values
    flattenedConfig = substituteVariables(flattenedConfig);

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
