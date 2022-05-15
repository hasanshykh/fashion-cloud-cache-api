export const dbConfig: any = {
  development: {
    mongodbConnectionUri: process.env.CONNECTION_URI || 'mongodb://localhost/fashion-cloud-db-local',
    shouldRefreshDB: false,
    cacheTimeToLive: parseInt(process.env.CACHE_TTL) || 60 * 60, // 60 minutes
    cacheLimit: parseInt(process.env.CACHE_LIMIT) || 10,
  },
  test: {
    mongodbConnectionUri: 'mongodb://localhost/fashion-cloud-db-test',
    shouldRefreshDB: true,
    cacheTimeToLive: 3, // 3 seconds
    cacheLimit: 3,
  },
  staging: {
    /* */
  },
  production: {
    /* */
  }
}
