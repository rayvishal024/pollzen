import express from 'express';
import cors from 'cors';
import hetmet from 'helmet';

import { errorHandler } from './middleware/error.middleware.js';
import { notFound } from './middleware/notFound.middleware.js';
import { limiter } from './middleware/rateLimiter.middleware.js';
import corsOptions from './middleware/cors.middleware.js';

import authRouter from './modules/auth/auth.routes.js';
import healthRouter from './modules/health/health.routes.js';
import pollRouter from './modules/polls/polls.routes.js';
import responseRouter from './modules/responses/response.routes.js';
import analyticRouter from './modules/analytics/analytic.routes.js';

export default function createApp() {
  const app = express();

  // Middleware
  app.use(cors(corsOptions));
  app.use(express.json({ limit: '16kb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(limiter);
  app.use(helmet());
  
  // Routes Register
  app.use('/api/v1/health', healthRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/polls', pollRouter);
  app.use('/api/v1/responses', responseRouter);
  app.use('/api/v1/analytics', analyticRouter);

  // Error Handling
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
