import dotenv from 'dotenv';
dotenv.config();

export enum Environments {
  DEV = 'development',
  TEST = 'test',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export const appConfig = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || Environments.DEV,
};
