import { Hono } from 'hono';
import { upgradeWebSocket } from 'hono/cloudflare-workers';
import type { DurableObjectState, WebSocket } from '@cloudflare/workers-types';
import app from '../bootstrap';

interface Session {
  ws: WebSocket;
  quit?: boolean;
}

export class $DurableObject {
  state: DurableObjectState;
  sessions: Session[] = [];

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request) {
    app.get(
      '/chat',
      upgradeWebSocket(async (c) => {
        return {
          onOpen: async (_event, ws) => {
            const session: Session = { ws };
            this.sessions.push(session);

            // Send previous messages
            const messages: string[] = (await this.state.storage.get('messages')) || [];
            messages.forEach((msg) => {
              ws.send(msg);
            });
          },
          onMessage: async (event, ws) => {
            const currentMessages: string[] =
              (await this.state.storage.get('messages')) || [];
            currentMessages.push(event.data as string);
            await this.state.storage.put('messages', currentMessages);
            this.broadcast(event.data as string);
          },
          onClose: (_event, ws) => {
            this.sessions = this.sessions.filter((session) => session.ws !== ws);
          },
          onError: (_event, ws) => {
            this.sessions = this.sessions.filter((session) => session.ws !== ws);
          },
        };
      })
    );

    return await app.fetch(request);
  }

  broadcast(message: string) {
    this.sessions.forEach((session) => {
      session.ws.send(message);
    });
  }
}
