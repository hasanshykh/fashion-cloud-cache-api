import express from 'express';
import { CacheController } from './cache.contoller';

const CacheRouter: express.Router = express.Router();
CacheRouter.post('/:key', CacheController.createCache);

export { CacheRouter };
