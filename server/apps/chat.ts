import { Hono } from 'hono';
import 'reflect-metadata';

const chat = new Hono();

chat.get('/api/chat', async (c) => {
  const durableObject = c.env.$DurableObject;
  const id = durableObject.idFromName('chat-room');
  const room = durableObject.get(id);
  return room.fetch(c.req.raw);
});

export default chat;
