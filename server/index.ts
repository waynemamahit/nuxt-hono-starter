import chat from './apps/chat';
import eventReminder from './apps/event-reminder';
import app from './bootstrap';

// Routes
app.route('/chat', chat);
app.route('/event-reminder', eventReminder);

export default app;
