import type { Context } from 'hono';
import { Hono } from 'hono';
import 'reflect-metadata';

const chat = new Hono();

chat.get('/', async (c: Context) => {
  const durableObject = c.env.$DurableObject;
  const id = durableObject.idFromName('$DurableObject');
  const room = durableObject.get(id);
  return room.fetch(c.req.raw);
});

export default chat;
