import express from 'express';
import bodyParser from 'body-parser';

export const middlewares = (app: express.Application): void => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
}
