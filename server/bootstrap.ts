import type { Context, Next } from 'hono';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { getLogger } from './container/resolvers';
import { container } from './container';
import type { ApiResponse } from './interfaces/core/api.interface';
import {
  BadRequestError,
  errorNames,
  NotFoundError,
  ValidationError,
} from './models/error.model';

const app = new Hono();

app.use('*', logger());

// Add DI middleware
app.use('*', async (c: Context, next: Next) => {
  c.set('container', container);
  await next();
});

function createErrorResponse(error: string): ApiResponse {
  return {
    success: false,
    error,
    timestamp: new Date().toISOString(),
  };
}

// Global error handler middleware
app.onError(async (error, c) => {
  const logger = getLogger(c);
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';

  // Handle known custom errors - check instanceof first, then fallback to name
  if (error instanceof NotFoundError) {
    logger.warn(`NotFoundError: ${errorMessage}`, { errorMessage });
    return c.json(createErrorResponse(errorMessage), 404);
  }

  if (error instanceof BadRequestError) {
    logger.warn(`BadRequestError: ${errorMessage}`, { errorMessage });
    return c.json(createErrorResponse(errorMessage), 400);
  }

  if (error instanceof ValidationError) {
    logger.warn(`ValidationError: ${errorMessage}`, { errorMessage });
    return c.json(createErrorResponse(errorMessage), 400);
  }

  // Fallback to errorNames mapping
  if (error instanceof Error && error.name && errorNames[error.name]) {
    const statusCode = errorNames[error.name];
    logger.info(
      `Handling custom error via errorNames: ${error.name} with status ${statusCode}`,
      {
        errorMessage,
      },
    );

    if (statusCode >= 500) {
      logger.error(`${error.name}: ${errorMessage}`, error);
    } else {
      logger.warn(`${error.name}: ${errorMessage}`, { errorMessage });
    }

    return c.json(createErrorResponse(errorMessage), statusCode);
  }

  // Handle validation errors from services (legacy support)
  if (errorMessage.includes('Validation failed')) {
    logger.warn('Service validation error (legacy)', { errorMessage });
    return c.json(createErrorResponse(errorMessage), 400);
  }

  // Handle general errors
  logger.error(
    'Unhandled error',
    error instanceof Error ? error : new Error(String(error)),
  );
  return c.json(createErrorResponse('Internal server error'), 500);
});

export default app;
