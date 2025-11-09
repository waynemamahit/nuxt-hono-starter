import 'reflect-metadata';
import { Hono } from 'hono';
import { nitroApp } from 'nitropack/runtime';
import { getLogger } from './container/resolvers';
import app from './app';

// Placeholder for Durable Objects
// For more information, see https://developers.cloudflare.com/durable-objects/
export class MyDurableObject {
  state: DurableObjectState;
  constructor(state: DurableObjectState) {
    this.state = state;
  }
  async fetch(request: Request) {
    const url = new URL(request.url);
    if (url.pathname === '/increment') {
      const value = (await this.state.storage.get('value')) || 0;
      await this.state.storage.put('value', (value as number) + 1);
    }
    return new Response(JSON.stringify(await this.state.storage.list()));
  }
}

// Main fetch handler
const fetch = async (
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> => {
  const url = new URL(request.url);
  // Route API requests to Hono
  if (url.pathname.startsWith('/api/')) {
    return app.fetch(request, env, ctx);
  }
  // Let Nuxt handle all other requests
  return nitroApp.localFetch(request, {
    context: {
      cloudflare: {
        env,
        ctx,
      },
    },
  });
};

// Scheduled handler for Cron Triggers
// For more information, see https://developers.cloudflare.com/workers/runtime-apis/scheduled-event/
const scheduled: ExportedHandlerScheduledHandler<Env> = async (
  controller,
  env,
  ctx,
) => {
  const logger = getLogger({
    req: {
      header: () => undefined,
      json: async () => ({}),
      addValidatedData: () => {},
      param: () => ({}),
      query: () => ({}),
      valid: () => ({}),
    },
    env,
    ctx,
  } as any);

  try {
    logger.info(
      `Cron job '${controller.cron}' triggered at ${new Date(
        controller.scheduledTime,
      ).toISOString()}`,
    );
    // Add your cron job logic here
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error(`Error in scheduled handler: ${message}`);
  }
};
export default {
  fetch,
  scheduled,
};
