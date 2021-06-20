import { config } from 'dotenv';

config();

export const { SESSION_SECRET, PORT } = process.env;
