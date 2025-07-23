import pino from 'pino';
import { CONFIG } from '../config/config';

const logger = pino({
  level: CONFIG.LOG_LEVEL,
});

export default logger;
