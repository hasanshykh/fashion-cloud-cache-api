import { ICache } from '../interfaces';
import { Cache } from '../models';

export const createCache = async (key: string, value: string): Promise<ICache> => {
  const cache = Cache.create({ key, value });
  return cache;
}

export const CacheService = {
  createCache,
};