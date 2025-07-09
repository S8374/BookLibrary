import { Server } from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config(); // Load env variables

let server: Server;
const port = process.env.PORT || 5000;

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: process.env.MONGO_DB_NAME,
    });
    console.log('✅ Connected to MongoDB');

    server = app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
  }
}

main();
