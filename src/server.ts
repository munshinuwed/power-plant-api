import { createApp } from './app';
import { loadData } from './lib/dataLoader';
import { CONFIG } from './config/config';
import logger from './utils/logger';

async function startServer() {
  try {
    logger.info('Starting loadData...');
    const start = Date.now();
    await loadData();
    logger.info(`Data loaded in ${(Date.now() - start) / 1000}s`); 
    const app = createApp();
    app.listen(CONFIG.PORT, () => {
      logger.info(`Server running on port ${CONFIG.PORT}`);
    });
  } catch (error) {
    logger.fatal(`${error}, 'Failed to start server`);
    process.exit(1);
  }
}

startServer();
