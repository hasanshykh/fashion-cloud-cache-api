import supertest from 'supertest';
import { app } from '../app';
process.env.APP_ENV = 'test';

describe('Cache tests', (): void => {
  it('should get 404 if route not found', async (): Promise<void> => {
    const { statusCode, body } = await supertest(app).get('/api/unknown_route');

    expect(statusCode).toBe(404);
    expect(body.message).toEqual('Not Found');
  });
});
