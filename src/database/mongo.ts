import mongoose from 'mongoose';
import { logger } from '../util';
import { appConfig, dbConfig } from '../config';
import { Cache } from '../models';

export const databaseConnection = async (): Promise<void> => {
  const config = dbConfig[appConfig.environment];
  await mongoose.connect(config.mongodbConnectionUri)
    .then(async (): Promise<void> => {
      logger.info('DB_INFO', 'database connected successully');
      if (config.shouldRefreshDB) await refreshDatabase();
    })
    .catch((err): void => {
      logger.error('DB_ERROR', `database failed to connect: ${err}`);
    });
}

const refreshDatabase = async (): Promise<void> => {
  await Cache.deleteMany().exec((): void => {
    logger.info('DB_INFO', 'database refreshed successully');
  });
}
