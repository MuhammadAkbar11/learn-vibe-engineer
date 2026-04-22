import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import * as schema from './schema';

dotenv.config();

const connectionUrl = process.env.DATABASE_URL;

if (!connectionUrl) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

export const connection = await mysql.createConnection({
  uri: connectionUrl,
});

export const db = drizzle(connection, { schema, mode: 'default' });
