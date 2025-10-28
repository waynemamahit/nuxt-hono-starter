import type { Context } from 'hono';
import { TYPES } from './types';
import type { ILogger } from '../interfaces/core/logger.interface';
import type { IConfigService } from '../interfaces/core/config.interface';
import type { IEventReminderService } from '../interfaces/eventReminder.interface';

// Helper function to resolve services from Hono context
export const getService = <T>(c: Context, serviceType: symbol): T => {
  const diContainer = c.get('container');
  return diContainer.get<T>(serviceType);
};

// Service resolver helpers for feature services
export const getLogger = (c: Context) => {
  return getService<ILogger>(c, TYPES.Logger);
};

export const getConfigService = (c: Context) => {
  return getService<IConfigService>(c, TYPES.ConfigService);
};

export const getEventRemindeService = (c: Context) => {
  return getService<IEventReminderService>(c, TYPES.IEventReminderService);
};
