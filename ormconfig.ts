import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
// Adjust the path if your .env file is not in the project root
// relative to where this script is run from.
dotenv.config({ path: path.resolve(__dirname, '.env') }); // Go up levels if needed

// --- Verification (Optional but recommended during debugging) ---
// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_PORT:', process.env.DB_PORT);
// console.log('DB_USERNAME:', process.env.DB_USERNAME);
// console.log('DB_DATABASE:', process.env.DB_DATABASE);
// console.log('DB_SCHEMA:', process.env.DB_SCHEMA);
// console.log('__dirname:', __dirname); // Check current directory context
// console.log('Resolved .env path:', path.resolve(__dirname, '../../.env'));
// --- End Verification ---

// Basic check if essential variables are loaded
if (
  !process.env.DB_HOST ||
  !process.env.DB_USERNAME ||
  !process.env.DB_DATABASE
) {
  console.error('Error: Database environment variables are not loaded!');
  // Optionally throw an error to prevent DataSource creation with undefined values
  // throw new Error("Database environment variables are not loaded!");
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10), // Provide default directly to parseInt
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  uuidExtension: 'pgcrypto',
});
