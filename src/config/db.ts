export const dbConfig: any = {
  development: {
    mongodbConnectionUri: process.env.CONNECTION_URI || 'mongodb://localhost/fashion-cloud-db-local',
    shouldRefreshDB: false,
    cacheTimeToLive: parseInt(process.env.CACHE_TTL) || 60 * 60, // 60 minutes
  },
  test: {
    mongodbConnectionUri: 'mongodb://localhost/fashion-cloud-db-test',
    shouldRefreshDB: true,
    cacheTimeToLive: 60, // 60 seconds
  },
  staging: {
    /* */
  },
  production: {
    /* */
  }
}
