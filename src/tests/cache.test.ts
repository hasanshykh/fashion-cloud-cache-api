import mongoose from 'mongoose';
import supertest from 'supertest';
import server from '../server';
import { app } from '../app';
import { randomString, sleep } from '../util';
import { appConfig, dbConfig } from '../config';

process.env.APP_ENV = 'test';
const baseUrl: string = '/api';
const cacheRoute: string = `${baseUrl}/cache`;

describe('Cache tests', (): void => {
  const testApp = supertest(app);

  it('should get 404 if route not found', async (): Promise<void> => {
    const { statusCode, body } = await testApp.get(`${baseUrl}/unknown_route`);

    expect(statusCode).toBe(404);
    expect(body.message).toEqual('Not Found');
  });

  it('GET/:key - should create random data if key not found in db', (async (): Promise<void> => {
    const key: string = 'dummy-key';
    const { statusCode, body } = await testApp.get(`${cacheRoute}/${key}`);

    expect(statusCode).toBe(200);
    expect(body.message).toBe('success');
    expect(typeof body.data).toBe('string');
  }));

  it('GET/:key - should return data if key found in db', (async (): Promise<void> => {
    const key: string = 'dummy-key';
    const { statusCode, body } = await testApp.get(`${cacheRoute}/${key}`);

    expect(statusCode).toBe(200);
    expect(body.message).toBe('success');
    expect(typeof body.data).toBe('object');
  }));

  it('GET - should return all stored keys in cache', (async (): Promise<void> => {
    const res = await testApp.get(cacheRoute);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data.length).toBe(1);
  }));

  it('POST/:key - should return validation error if data is missing', (async (): Promise<void> => {
    const key: string = 'dummy-key';
    const { statusCode, body } = await testApp.post(`${cacheRoute}/${key}`).send({});

    expect(statusCode).toBe(400);
    expect(body.message).toBe('\"value\" is required');
  }));

  it('POST/:key - should create a new cache for a given key', (async (): Promise<void> => {
    const key: string = 'dummy-key2';
    const payload = { value: randomString() };
    const { statusCode, body } = await testApp.post(`${cacheRoute}/${key}`).send(payload);

    expect(statusCode).toBe(200);
    expect(body.message).toBe('cache with this key has been successfully created in db');
  }));

  it('POST/:key - should update data if key already exists', (async (): Promise<void> => {
    const key: string = 'dummy-key2';
    const payload = { value: randomString() };
    const { statusCode, body } = await testApp.post(`${cacheRoute}/${key}`).send(payload);

    expect(statusCode).toBe(200);
    expect(body.message).toBe('cache with this key has been successfully created in db');
    expect(body.data.key).toBe(key);
    expect(body.data.value).toBe(payload.value);
  }));

  it('PUT/:key - should return validation error if data is missing', (async (): Promise<void> => {
    const key: string = 'dummy-key2';
    const { statusCode, body } = await testApp.put(`${cacheRoute}/${key}`).send({});

    expect(statusCode).toBe(400);
    expect(body.message).toBe('\"value\" is required');
  }));

  it('PUT/:key - should return error if key not found in db', (async (): Promise<void> => {
    const key: string = 'dummy-key3';
    const payload = { value: randomString() };
    const { statusCode, body } = await testApp.put(`${cacheRoute}/${key}`).send(payload);

    expect(statusCode).toBe(404);
    expect(body.message).toBe('cache with this key not found in db');
  }));

  it('PUT/:key - should update data if key found in db', (async (): Promise<void> => {
    const key: string = 'dummy-key2';
    const payload = { value: randomString() };
    const { statusCode, body } = await testApp.put(`${cacheRoute}/${key}`).send(payload);

    expect(statusCode).toBe(200);
    expect(body.message).toBe('cache with this key has been successfully updated in db');
    expect(body.data.key).toBe(key);
    expect(body.data.value).toBe(payload.value);
  }));

  it('DELETE/:key - should return error if key not found in db', (async (): Promise<void> => {
    const key: string = 'dummy-key3';
    const { statusCode, body } = await testApp.delete(`${cacheRoute}/${key}`);

    expect(statusCode).toBe(404);
    expect(body.message).toBe('cache with this key not found in db');
  }));

  it('DELETE/:key - should delete data if key found in db', (async (): Promise<void> => {
    const key: string = 'dummy-key2';
    const { statusCode, body } = await testApp.delete(`${cacheRoute}/${key}`);

    expect(statusCode).toBe(200);
    expect(body.message).toBe('cache with this key has been successfully deleted from db');
  }));

  it('DELETE - should delete all keys from db', (async (): Promise<void> => {
    const { statusCode, body } = await testApp.delete(`${cacheRoute}`);

    expect(statusCode).toBe(200);
    expect(body.message).toBe('All cache keys has been successfully deleted from db');
  }));

  it('DELETE - should return error if no keys found in db', (async (): Promise<void> => {
    const { statusCode, body } = await testApp.delete(`${cacheRoute}`);

    expect(statusCode).toBe(404);
    expect(body.message).toBe('No cache keys found in db');
  }));

  it('cache time to live', (async (): Promise<void> => {
    // create a key in cache
    const key: string = 'dummy-key4';
    const payload = { value: randomString() };
    await testApp.post(`${cacheRoute}/${key}`).send(payload);

    // pause execution for defaultTTL (3 sec in db config) and wait for cache to expire
    const defaultTTL: number = dbConfig[appConfig.environment].cacheTimeToLive;
    await sleep(defaultTTL * 1000);

    // fetch the data for that key, cache will miss and should return random string
    const { statusCode, body } = await testApp.get(`${cacheRoute}/${key}`);

    expect(statusCode).toBe(200);
    expect(body.message).toBe('success');
    expect(typeof body.data).toBe('string');
  }));
});

afterAll(() => {
  mongoose.disconnect();
  server.close();
});
