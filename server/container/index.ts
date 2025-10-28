import { Container } from 'inversify';
import 'reflect-metadata';

// Interfaces
import type { IConfigService } from '../interfaces/core/config.interface';
import type {
  ILogger,
  ILoggerFactory,
} from '../interfaces/core/logger.interface';

// Implementations
import type { IEventReminderService } from '../interfaces/eventReminder.interface';
import { ConfigService } from '../services/config.service';
import { EventReminderService } from '../services/eventReminder.service';
import { Logger, LoggerFactory } from '../services/logger.service';
import { TYPES } from './types';

// Extend Hono's context to include DI container
declare module 'hono' {
  interface ContextVariableMap {
    container: typeof container;
  }
}

// Create IoC Container
const container = new Container();

// Bind Core services
container.bind<ILogger>(TYPES.Logger).toConstantValue(new Logger('API'));
container.bind<ILoggerFactory>(TYPES.LoggerFactory).to(LoggerFactory);
container
  .bind<IConfigService>(TYPES.ConfigService)
  .to(ConfigService)
  .inSingletonScope();

// Bind Feature services
container
  .bind<IEventReminderService>(TYPES.IEventReminderService)
  .to(EventReminderService)
  .inSingletonScope();

export { container };
