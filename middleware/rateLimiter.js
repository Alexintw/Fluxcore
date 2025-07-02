const rateLimit = require('express-rate-limit');
// Support both CommonJS exports and ES modules default
const RedisStoreModule = require('rate-limit-redis');
const RedisStore = RedisStoreModule.default || RedisStoreModule;
const redisClient = require('../config/redis');

// Limit auth endpoints to 10 requests per 15 minutes
const authLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    // For compatibility with rate-limit-redis v2+, ensure "sendCommand" is defined
    sendCommand: (...args) => redisClient.call(...args)
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' }
});

module.exports = { authLimiter };