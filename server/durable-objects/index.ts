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

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request) {
    const app = new Hono();

    app.get(
      '/api/chat',
      upgradeWebSocket(async (c) => {
        // Load and send previous messages
        const messages: string[] = (await this.state.storage.get('messages')) || [];

        return {
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

    const res = await app.fetch(request);
    if (res.webSocket) {
      const session: Session = { ws: res.webSocket };
      this.sessions.push(session);

      // Send previous messages after upgrade
      const messages: string[] = (await this.state.storage.get('messages')) || [];
      messages.forEach((msg) => {
        res.webSocket.send(msg);
      });
    }

    return res;
  }

  broadcast(message: string) {
    this.sessions.forEach((session) => {
      session.ws.send(message);
    });
  }
}
