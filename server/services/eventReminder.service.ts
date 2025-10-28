import { injectable } from 'inversify';
import type { IEventReminderService } from '../interfaces/eventReminder.interface';
import type { EventReminder } from '../models/eventReminder.model';

@injectable()
export class EventReminderService implements IEventReminderService {
  getById(_id: number): Promise<EventReminder | null> {
    throw new Error('Method not implemented.');
  }

  getAll(): Promise<EventReminder[]> {
    throw new Error('Method not implemented.');
  }

  create(_data: Omit<EventReminder, 'id'>): Promise<EventReminder | null> {
    throw new Error('Method not implemented.');
  }

  update(_id: number, _data: EventReminder): Promise<EventReminder | null> {
    throw new Error('Method not implemented.');
  }

  delete(_id: number): Promise<EventReminder | null> {
    throw new Error('Method not implemented.');
  }
}
