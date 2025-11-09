import { eventHandler, toWebRequest } from 'h3';
import app from '../hono';

export default eventHandler(async (event) => {
  return app.fetch(toWebRequest(event), {
    // @ts-expect-error: Cloudflare bindings are not in the types
    cloudflare: {
      env: event.context.cloudflare.env,
      ctx: event.context.cloudflare.ctx,
    },
  });
});
