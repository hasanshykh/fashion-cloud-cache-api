import { DeleteResult, Document } from 'mongodb';
import { logger, randomString } from '../util';
import { ICache } from '../interfaces';
import { Cache } from '../models';

export const getCacheKeys = async (): Promise<ICache[]> => {
  return Cache.find({}, { key: 1 }).lean();
}

export const getCache = async (key: string): Promise<string | ICache> => {
  let cache: Document = await Cache.findOne({ key });
  let randomValue: string = randomString();
  let isCacheMissed: boolean = false;

  if (!cache) {
    cache = await Cache.create({ key, value: randomValue });
    isCacheMissed = true;
  }
  logger.info('CACHE_INFO', isCacheMissed ? 'cache miss' : 'cache hit');

  return isCacheMissed ? randomValue : cache as ICache;
}

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

export const updateCache = async (key: string, value: string): Promise<ICache> => {
  let cache: Document = await Cache.findOne({ key });

  if (cache) {
    cache.value = value;
    await cache.save();
  }

  return cache as ICache;
}

export const deleteCache = async (key: string): Promise<DeleteResult> => {
  return Cache.deleteOne({ key });
}

export const deleteAllCache = async (): Promise<DeleteResult> => {
  return Cache.deleteMany();
}

export const CacheService = {
  getCacheKeys,
  getCache,
  createCache,
  updateCache,
  deleteCache,
  deleteAllCache,
};
