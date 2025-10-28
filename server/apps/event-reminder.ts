import { Hono } from 'hono';
import { getLogger } from '../container/resolvers';

const eventReminder = new Hono();

eventReminder.get('', (c) => {
  const logger = getLogger(c);
  logger.info('GET /event-reminder called!');
  return c.json({ data: [] });
});

eventReminder.get('/:id', (c) => {
  const id = c.req.param('id');
  const logger = getLogger(c);
  logger.info('GET /event-reminder/:id called!', { id });
  return c.json({ eventId: id });
});

eventReminder.post('', async (c) => {
  try {
    const body = await c.req.json();
    const logger = getLogger(c);
    logger.info('POST /event-reminder called!', body);
    return c.json({ received: body }, 201);
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400);
  }
});

eventReminder.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const logger = getLogger(c);
  logger.info('PUT /event-reminder/:id called!', { body, id });
  return c.json({ eventId: id, body });
});

eventReminder.delete('/:id', (c) => {
  const id = c.req.param('id');
  const logger = getLogger(c);
  logger.info('PUT /event-reminder/:id called!', { id });
  return c.json({ eventId: id });
});

export default eventReminder;
