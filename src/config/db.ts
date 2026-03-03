import mongoose from "mongoose";
import dotenv from "dotenv";
import env from "./env";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI!);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
        const errorMessage = err instanceof Error 
          ? ` ${err.message}` 
          : String(err);  
    console.error("MongoDB connection failed:", errorMessage);
    process.exit(1);
  }
};

