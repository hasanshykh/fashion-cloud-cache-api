import express from 'express';
import { validator } from '../../middleware';
import { asyncWrapper } from '../../middleware/async-wrapper';
import { CacheController } from './cache.contoller';
import { CacheValidation } from './cache.validator';

const CacheRouter: express.Router = express.Router();
CacheRouter.get('/', CacheController.getCacheKeys);
CacheRouter.post('/:key', [
  validator(CacheValidation.cacheBody, 'body'),
  asyncWrapper(CacheController.createCache),
]);
CacheRouter.put('/:key', [
  validator(CacheValidation.cacheBody, 'body'),
  asyncWrapper(CacheController.updateCache),
]);

export { CacheRouter };
