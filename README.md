# Fashion Cloud Coding Challenge (Cache API)

This project covers the endpoints for Cache API, that exposes methods to interact with cached data.
- .env file added to allow configuration change, if needed.
- Configuration can also be changed in config/* files, for example, database related configs for different environments.
- Logger is also added to facilitate response/error logs.
- It also includes tests, with almost 94% covergae.
- Postman collection is added to facilitate with endpoints testing

# Endpoints:

## GET /cache

It will return all cache keys that exist in database

## GET /cache/:key

It will return the data for a given key

## POST /cache/:key

It will create the data for a given key in database

## PUT /cache/:key

It will update the data for a given key in database

## DELETE /cache/:key

It will remove a given key from database

## DELETE /cache

It will remove all keys from database


# Useful Commands:

1) Install project and dev dependencies:
```javascript
npm install
```

2) Run this docker command to launch a mongoDB instance, if not already running:
```javascript
docker run --name mongodb -d --net=host mongo
```

3) Build and run the project
```javascript
npm start
```

4) Run tests
```javascript
npm run test
```
