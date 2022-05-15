import { Server } from 'http';
import { app } from './app';
import { logger } from './util';

const server: Server = app.listen(app.get('port'), (): void => {
  logger.info(
    'APP_INFO',
    `App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`,
  );
});

export default server;