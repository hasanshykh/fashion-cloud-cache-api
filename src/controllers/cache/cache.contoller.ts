import { DeleteResult } from 'mongodb';
import { Request, Response } from 'express';
import { CacheService } from '../../services';
import { ICache } from '../../interfaces';
import { SuccessResponse, NotFoundResponse } from '../../util';

const getCacheKeys = async (_req: Request, res: Response): Promise<void> => {
  const result: ICache[] = await CacheService.getCacheKeys();
  new SuccessResponse(res, 'success', result);
}

const getCache = async (_req: Request, res: Response): Promise<void> => {
  const { key } = _req.params;
  const result: string | ICache = await CacheService.getCache(key);
  new SuccessResponse(res, 'success', result);
}

const createCache = async (_req: Request, res: Response): Promise<void> => {
  const { key } = _req.params;
  const { value } = _req.body;
  const result: ICache = await CacheService.createCache(key, value);
  new SuccessResponse(res, 'cache with this key has been successfully created in db', result);
}

const updateCache = async (_req: Request, res: Response): Promise<void> => {
  const { key } = _req.params;
  const { value } = _req.body;
  const result: ICache = await CacheService.updateCache(key, value);

  if (!result) {
    new NotFoundResponse(res, 'cache with this key not found in db');
  } else {
    new SuccessResponse(res, 'cache with this key has been successfully updated in db', result);
  }
}

const deleteCache = async (_req: Request, res: Response): Promise<void> => {
  const { key } = _req.params;
  const result: DeleteResult = await CacheService.deleteCache(key);

  if (!result.deletedCount) {
    new NotFoundResponse(res, 'cache with this key not found in db');
  } else {
    new SuccessResponse(res, 'cache with this key has been successfully deleted from db');
  }
}

const deleteAllCache = async (_req: Request, res: Response): Promise<void> => {
  const result: DeleteResult = await CacheService.deleteAllCache();

  if (!result.deletedCount) {
    new NotFoundResponse(res, 'No cache keys found in db');
  } else {
    new SuccessResponse(res, 'All cache keys has been successfully deleted from db');
  }
}

export const CacheController = {
  getCacheKeys,
  getCache,
  createCache,
  updateCache,
  deleteCache,
  deleteAllCache,
};
