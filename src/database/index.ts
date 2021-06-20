import mongoose from 'mongoose';
import { MONGODB_URI } from '../config';
import Logger from '../logger';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI || '', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    Logger.info('Database connected.');
  } catch (error) {
    Logger.error('Failed to connect to database');
  }
};

export default connectDB;
