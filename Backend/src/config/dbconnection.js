import mongoose from 'mongoose';
import { database_validation_handling } from './errorhandling.js';
import dotenv from 'dotenv';
dotenv.config();



const connectDb = async () => {
    try {
        const connectdatabase = await mongoose.connect(process.env.MONGO_URL) 
        database_validation_handling();
        return connectdatabase;
          

    } catch (error) {
        console.error("Database connection error:", error);
        
        

        
    }
}


export default connectDb;
