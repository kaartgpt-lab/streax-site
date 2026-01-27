import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog';
    
    await mongoose.connect(mongoUri);
    
    isConnected = true;
    console.log('MongoDB Connected Successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectDB;
