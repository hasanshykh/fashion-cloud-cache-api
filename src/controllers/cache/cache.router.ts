import express from 'express';
import { validator, asyncWrapper } from '../../middleware';
import { CacheController } from './cache.contoller';
import { CacheValidation } from './cache.validator';

const CacheRouter: express.Router = express.Router();
CacheRouter.get('/', CacheController.getCacheKeys);
CacheRouter.get('/:key', CacheController.getCache);
CacheRouter.post('/:key', [
  validator(CacheValidation.cacheBody, 'body'),
  asyncWrapper(CacheController.createCache),
]);
CacheRouter.put('/:key', [
  validator(CacheValidation.cacheBody, 'body'),
  asyncWrapper(CacheController.updateCache),
]);
CacheRouter.delete('/:key', CacheController.deleteCache);
CacheRouter.delete('/', CacheController.deleteAllCache);

export { CacheRouter };
