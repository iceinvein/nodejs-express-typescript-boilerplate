import { config } from 'dotenv';

config();

export const { SESSION_SECRET, PORT, MONGODB_URI } = process.env;
