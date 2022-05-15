import mongoose from 'mongoose';

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
      default: 'xyz',
    },
    timeToLive: {
      type: Number,
      default: 60,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'cache',
  }
);

export const Cache = mongoose.model('Cache', CacheSchema);
