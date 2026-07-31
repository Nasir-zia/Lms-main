import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDb from './src/config/dbconnection.js';
import { database_validation_handling}  from './src/config/errorhandling.js';
import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);


const PORT = process.env.PORT || 5000;

// DB connect and then start server
const startServer = async () => {
  try {
    await connectDb(); 
    database_validation_handling(); 


    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error(" Failed to connect to the database:", error);
    database_validation_handling(); 
  }
};

startServer();

