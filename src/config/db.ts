export const dbConfig: any = {
  development: {
    mongodbConnectionUri: process.env.CONNECTION_URI || 'mongodb://localhost/fashion-cloud-db-local',
    shouldRefreshDB: false,
  },
  test: {
    mongodbConnectionUri: 'mongodb://localhost/fashion-cloud-db-test',
    shouldRefreshDB: true,
  },
  staging: {
    /* */
  },
  production: {
    /* */
  }
}
