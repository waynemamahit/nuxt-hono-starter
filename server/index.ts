import 'reflect-metadata';
import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import hono from './app';
import { getLogger } from './container/resolvers';

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
const fetch = (
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> => {
  if (request.headers.get('Upgrade') === 'websocket') {
    // Handle WebSocket requests if needed
    return new Response('WebSocket upgrade not implemented', { status: 426 });
  }

  // Bind environment to Hono
  (hono.fetch as any) = hono.fetch.bind(hono);
  return handle(hono, (c) => {
    c.set('env', env);
    c.set('ctx', ctx);
  })(request, env, ctx);
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
      `Cron job '${controller.cron}' triggered at ${new Date(controller.scheduledTime).toISOString()}`,
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
