# Nuxt Hono Starter

A minimal starter project for building Nuxt applications with Hono for server-side APIs, Inversify for dependency injection, and deployment to Cloudflare Workers.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Features

- **Nuxt 4**: Modern Vue.js framework for building server-rendered applications.
- **Hono**: Lightweight web framework for building APIs on the edge.
- **Inversify**: Powerful dependency injection container for TypeScript.
- **Cloudflare Workers**: Deploy your application to the edge for global performance.

## Setup

Make sure to install dependencies:

```bash
# pnpm
pnpm install
```

This project uses Hono for server-side API routing and Inversify for dependency injection to keep your code modular and testable.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev
```

The development server includes Hono APIs integrated with Nuxt for a seamless full-stack experience.

## Production

Build the application for production:

```bash
# pnpm
pnpm build
```

Locally preview production build using Wrangler for Cloudflare Workers simulation:

```bash
# pnpm
pnpm preview
```

## Deployment

Deploy to Cloudflare Workers:

```bash
# pnpm
pnpm deploy
```

Check out the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/) and [Wrangler documentation](https://developers.cloudflare.com/workers/wrangler/) for more information on deployment.
