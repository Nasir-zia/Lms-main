import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

let redisClient = null;
let isRedisConnected = false;

const initRedis = async () => {
  const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
  console.log(`Connecting to Redis at ${redisUrl}...`);
  
  redisClient = createClient({
    url: redisUrl,
    socket: {
      connectTimeout: 5000,
      reconnectStrategy: (retries) => {
        if (retries > 5) {
          console.warn('Redis reconnection failed after 5 retries. Disabling Redis operations.');
          isRedisConnected = false;
          return new Error('Redis connection lost');
        }
        return Math.min(retries * 100, 3000);
      }
    }
  });

  redisClient.on('error', (err) => {
    console.error('Redis error occurred:', err.message);
    isRedisConnected = false;
  });

  redisClient.on('connect', () => {
    console.log('Redis client connecting...');
  });

  redisClient.on('ready', () => {
    console.log('Redis client is ready!');
    isRedisConnected = true;
  });

  try {
    await redisClient.connect();
  } catch (err) {
    console.error('Could not establish a connection with Redis:', err.message);
    isRedisConnected = false;
  }
};

export { initRedis, redisClient, isRedisConnected };
