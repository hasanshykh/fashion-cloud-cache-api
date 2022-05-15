import { appConfig, Environments } from '../config/app';
import winston from 'winston';

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: appConfig.environment === Environments.PRODUCTION ? 'info' : 'debug',
    }),
  ],
};

const winstonLogger = winston.createLogger(options);
type LogLevels = 'info' | 'debug' | 'error';

const logMessage = (level: LogLevels, code: string, message: unknown): void => {
  if (typeof message === 'object') {
    try {
      message =
        message instanceof Error
          ? JSON.stringify(message, Object.getOwnPropertyNames(message))
          : JSON.stringify(message);
    } catch (e) {
      message = `logger could not stringify ${message}`;
    }
  }
  winstonLogger[level]({ code, message });
};

class Logger {
  info(code: string, message: unknown): void {
    logMessage('info', code, message);
  }

  debug(code: string, message: unknown): void {
    logMessage('debug', code, message);
  }

  error(code: string, message: unknown): void {
    logMessage('error', code, message);
  }
}

export const logger: Logger = new Logger();
