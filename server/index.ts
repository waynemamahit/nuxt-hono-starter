import eventReminder from './apps/event-reminder';
import app from './bootstrap';

// Routes
app.route('/event-reminder', eventReminder);

export default {
  fetch: app.fetch,
  async scheduled(event, env, ctx) {
    console.log('Cron job started at:', new Date(event.scheduledTime).toISOString());
    const response = await app.fetch(
      new Request('http://worker.internal/event-reminder', {
        method: 'GET',
      }),
      env,
      ctx
    );
    console.log(
      'Cron job finished. Status:',
      response.status,
      'Response:',
      await response.text()
    );
  },
};
