const redis = require('redis');
const { REDIS_HOST, REDIS_PORT } = process.env;
  
const redisClient = redis.createClient(REDIS_PORT, REDIS_HOST);

module.exports = {
    redisClient
};
