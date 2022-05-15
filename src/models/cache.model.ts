import mongoose from 'mongoose';
import { appConfig, dbConfig } from '../config';
import { randomString } from '../util';

const defaultTTL: number = dbConfig[appConfig.environment].cacheTimeToLive;
const cacheLimit: number = dbConfig[appConfig.environment].cacheLimit;

const CacheSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    value: {
      type: String,
      default: randomString(),
    },
    timeToLive: {
      type: Number,
      default: defaultTTL,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'cache',
  }
);

// This method is called before saving a record in db
async function checkCacheLimit(next: Function): Promise<void> {
  // checks if new record is being saved in db
  if (this.isNew) {
    const cacheCount: number = await Cache.count();
    if (cacheCount >= cacheLimit) {
      // if cache limit is reached in db, finds the least used record in db and overwrites that
      const leastUsedCache = await Cache.findOne({}, null, { sort: { updatedAt: 1 } });
      this._id = leastUsedCache._id;
      this.isNew = false;
    }
  }

  next();
};

CacheSchema.pre('save', checkCacheLimit);

export const Cache = mongoose.model('Cache', CacheSchema);
