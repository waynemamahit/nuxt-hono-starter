import { Hono } from 'hono';
import { upgradeWebSocket } from 'hono/cloudflare-workers';
import type { DurableObjectState, WebSocket } from '@cloudflare/workers-types';

interface Session {
  ws: WebSocket;
  quit?: boolean;
}

export class $DurableObject {
  state: DurableObjectState;
  sessions: Session[] = [];
  app: Hono = new Hono();

  constructor(state: DurableObjectState) {
    this.state = state;

    // The request path from the main worker is `/chat`.
    this.app.get(
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
  }

  async fetch(request: Request) {
    return this.app.fetch(request);
  }

  broadcast(message: string) {
    this.sessions.forEach((session) => {
      session.ws.send(message);
    });
  }
}
