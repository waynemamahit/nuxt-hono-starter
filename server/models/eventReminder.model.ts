export enum EventReminderStatus {
  UPCOMING = '0',
  COMPLETED = '1',
}

export type EventReminder = {
  id: string;
  title: string;
  description: string;
  event_date: Date;
  status: EventReminderStatus;
};
