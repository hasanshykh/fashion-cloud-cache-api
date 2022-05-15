import express from 'express';
import { appConfig } from './config';
import { middlewares } from './server-middlewares';
import { NotFoundError } from './util';
import { errorHandler } from './middleware';
import { databaseConnection } from './database/mongo';


// configrations for server
export const app: express.Application = express();
app.set('port', appConfig.port);
app.set('env', appConfig.environment);

// initialising middlewares
middlewares(app);

// initialising errors handler
app.use((_req, _res, next) => next(new NotFoundError()));
app.use(errorHandler);

// initialising DB
databaseConnection();

export default app;