// Service identifiers for InversifyJS
export const TYPES = {
  // Feature Services
  IEventReminderService: Symbol.for('IEventReminderService'),

  // Infrastructure services
  Logger: Symbol.for('Logger'),
  LoggerFactory: Symbol.for('LoggerFactory'),
  ConfigService: Symbol.for('ConfigService'),
} as const;
