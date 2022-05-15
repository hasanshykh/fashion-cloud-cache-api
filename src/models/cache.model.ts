import mongoose from 'mongoose';
import { appConfig, dbConfig } from '../config';
import { randomString } from '../util';

const defaultTTL: number = dbConfig[appConfig.environment].cacheTimeToLive;

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

export const Cache = mongoose.model('Cache', CacheSchema);
