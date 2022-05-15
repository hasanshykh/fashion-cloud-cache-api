import { DeleteResult, Document } from 'mongodb';
import { ICache } from '../interfaces';
import { Cache } from '../models';

export const getCacheKeys = async (): Promise<ICache[]> => {
  return Cache.find({}, { key: 1 }).lean();
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
  createCache,
  updateCache,
  deleteCache,
  deleteAllCache,
};
