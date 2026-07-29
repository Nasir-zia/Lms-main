import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDb from './src/config/dbconnection.js';
import { database_validation_handling}  from './src/config/errorhandling.js';
import dns from 'dns';

// Redis & BullMQ Queue Imports
import { initRedis, isRedisConnected } from './src/config/redis.js';
import { initEmailQueue } from './src/queues/emailQueue.js';
import { startEmailWorker } from './src/workers/emailWorker.js';

const PORT = process.env.PORT || 5000;

// DB connect and then start server
const startServer = async () => {
  try {
    await connectDb(); 
    database_validation_handling(); 

    // Initialize Redis connection and BullMQ queue + worker (only if Redis is online)
    await initRedis();
    if (isRedisConnected) {
      initEmailQueue();
      startEmailWorker();
    } else {
      console.warn("⚠️ Redis is offline. BullMQ background queue is disabled. Emails will be sent directly/synchronously.");
    }

    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error(" Failed to connect to the database:", error);
    database_validation_handling(); 
  }
};

startServer();

