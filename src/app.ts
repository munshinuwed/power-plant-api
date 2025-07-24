import express, { Express } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { CONFIG } from './config/config';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import powerPlantsRouter from './api/powerPlants/router';
import { apiKeyAuth } from './middleware/auth';
import logger from './utils/logger';
import { apiRateLimiter } from './middleware/rateLimiter';

export function createApp(): Express {
  const app = express();

  // CORS setup: Only allow specific origins
  // app.use(cors({
  //   origin: (origin, callback) => {
  //     if (!origin || CONFIG.ALLOWED_ORIGINS.includes(origin)) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'), false);
  //     }
  //   },
  //   methods: ['GET'], // Restrict to needed methods
  //   credentials: true,
  // }));

  app.use(cors());

  // Basic Auth middleware for all routes
//   app.use(basicAuth);

  // Routes
  app.get('/health', (req, res) => {
    res.json({ message: 'Welcome to the Power Plants API', version: CONFIG.API_VERSION });
  });
//   // Swagger Options
const swaggerFilePath = path.join(__dirname, '../docs/swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(apiKeyAuth) // Apply API key authentication middleware
  app.use(apiRateLimiter); // Apply rate limiting middleware

  app.use('/v1/power-plants', powerPlantsRouter);

  // Global error handler
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error({ err, path: req.path }, 'Internal Server Error');
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
}
