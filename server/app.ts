import eventReminder from './apps/event-reminder';
import app from './bootstrap';

// Routes
app.route('/event-reminder', eventReminder);

export default app;
