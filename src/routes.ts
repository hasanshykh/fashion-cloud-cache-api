import express from 'express';
import { CacheRouter } from './controllers';

const AppRouter: express.Router = express.Router();
AppRouter.use('/cache', CacheRouter);

export { AppRouter };
