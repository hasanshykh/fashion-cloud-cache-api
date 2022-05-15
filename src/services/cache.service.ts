import { Document } from 'mongodb';
import { ICache } from '../interfaces';
import { Cache } from '../models';

export const createCache = async (key: string, value: string): Promise<ICache> => {
  let cache: Document = await Cache.findOne({ key });

  if (cache) {
    cache.value = value;
    await cache.save();
  } else {
    cache = Cache.create({ key, value });
  }

  return cache as ICache;
}

export const CacheService = { createCache };