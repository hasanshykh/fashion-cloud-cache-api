import { Request, Response } from 'express';
import { CacheService } from '../../services';
import { ICache } from '../../interfaces';
import { SuccessResponse } from '../../util';

const createCache = async (_req: Request, res: Response): Promise<void> => {
  const { key } = _req.params;
  const { value } = _req.body;
  const result: ICache = await CacheService.createCache(key, value);
  new SuccessResponse(res, 'cache with this key has been successfully created in db', result);
}

export const CacheController = { createCache };