export interface ICache {
  _id: string;
  key: string;
  value: string;
  timeToLive: number;
  createdAt: string;
  updatedAt: string;
}
