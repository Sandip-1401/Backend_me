import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  schema: 'public',
  synchronize: false,
  logging: false,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
});
