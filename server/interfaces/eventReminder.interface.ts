import type { EventReminder } from '../models/eventReminder.model';

export interface IEventReminderService {
  getById(id: number): Promise<EventReminder | null>;
  getAll(): Promise<EventReminder[]>;
  create(data: Omit<EventReminder, 'id'>): Promise<EventReminder | null>;
  update(id: number, data: EventReminder): Promise<EventReminder | null>;
  delete(id: number): Promise<EventReminder | null>;
}
