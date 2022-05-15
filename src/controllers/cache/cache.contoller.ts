import { Request, Response } from 'express';
import { CacheService } from '../../services';
import { ICache } from '../../interfaces';
import { SuccessResponse, NotFoundResponse } from '../../util';

const getCacheKeys = async (_req: Request, res: Response): Promise<void> => {
  const result: ICache[] = await CacheService.getCacheKeys();
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

export const CacheController = {
  getCacheKeys,
  createCache,
  updateCache,
};
