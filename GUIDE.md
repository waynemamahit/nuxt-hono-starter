# Comprehensive CI/CD and Resource Setup Guide

This guide provides a complete walkthrough for setting up your Cloudflare Workers CI/CD pipeline. All resource IDs (for KV, D1, Hyperdrive) are managed via variables for security and maintainability.

## Part 1: Create the Cloudflare API Token

A correctly permissioned API token is crucial for the pipeline to work.

1.  **Navigate to API Tokens:** Go to **My Profile > API Tokens** in your Cloudflare dashboard.
2.  **Create a Custom Token:** Click **Create Token**, then find "Custom token" and click **Get started**.
3.  **Name Your Token:** Use a descriptive name like `CI-CD-Deployment-Token`.
4.  **Set Permissions:** Grant the following permissions exactly as listed.

| Resource    | Permission          | Level    |
| :---------- | :------------------ | :------- |
| **User**    | **Memberships**     | **Read** |
| **User**    | **API Tokens**      | **Read** |
| **Account** | **Workers Scripts** | **Edit** |
| Account     | Workers KV Storage  | Edit     |
| Account     | D1                  | Edit     |
| Account     | Hyperdrive          | Edit     |

5.  **Set Account Resources:** Under **Account Resources**, select your account.
6.  **Client IP Address Filtering:** Leave this section **blank**.
7.  **Create and Copy the Token:** Click **Continue to summary**, then **Create Token**. Copy the generated token immediately.

---

## Part 2: Create Cloudflare Resources

Run these `wrangler` commands in your local terminal to create the necessary resources for both staging and production. **Copy the `id` output from each command.** You will need them in the next step.

### 1. Create KV Namespaces

```bash
wrangler kv:namespace create "CF_KV_STAGING"
wrangler kv:namespace create "CF_KV_PRODUCTION"
```

### 2. Create D1 Databases

```bash
wrangler d1 create "staging_db"
wrangler d1 create "production_db"
```

### 3. Create Hyperdrive Configs

```bash
# Staging Hyperdrive
wrangler hyperdrive create "staging-hyperdrive" --connection-string="your-staging-db-connection-string"

# Production Hyperdrive
wrangler hyperdrive create "production-hyperdrive" --connection-string="your-production-db-connection-string"
```

---

## Part 3: Configure CI/CD Secrets and Variables

Now, you will add the token and all the resource IDs you just created to your CI/CD provider's settings.

### 1. Add the API Token Secret

In your GitHub, GitLab, or Bitbucket repository settings, create one **secret**:

- **Name:** `CLOUDFLARE_API_TOKEN`
- **Value:** Paste the API token you copied from Part 1.

### 2. Add the Resource ID Variables

In the same settings area for your repository, create the following **variables** (note: these are _variables_, not _secrets_).

**Staging Variables:**

- `STAGING_KV_ID`: The ID from your staging KV namespace.
- `STAGING_D1_ID`: The `database_id` from your staging D1 database.
- `STAGING_HYPERDRIVE_ID`: The ID from your staging Hyperdrive config.

**Production Variables:**

- `PRODUCTION_KV_ID`: The ID from your production KV namespace.
- `PRODUCTION_D1_ID`: The `database_id` from your production D1 database.
- `PRODUCTION_HYPERDRIVE_ID`: The ID from your production Hyperdrive config.

This is the only place you need to put these IDs. You do not need to edit `wrangler.jsonc`.

---

## Part 4: Running the Project Locally

To run the project on your local machine, you need to provide your **staging** resource IDs.

1.  Open the `.dev.vars` file in the root of the project.
2.  Paste your staging resource IDs into the placeholder values.

**Example `.dev.vars` file:**

```
WRANGLER_ENV=staging
STAGING_KV_ID="a1b2c3d4e5f6..."
STAGING_D1_ID="b2c3d4e5f6a1..."
STAGING_HYPERDRIVE_ID="c3d4e5f6a1b2..."
```

Once this file is configured, you can use the following commands:

- **`pnpm dev`**: Starts the Nuxt development server with a live connection to your Cloudflare staging resources.
- **`pnpm preview`**: Creates a production build and serves it locally using Wrangler, connected to your staging resources.
