import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import User from "../entities/User.js";

// Explicitly point to the .env file in the current folder
dotenv.config({ path: "./config/.env" });

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: "Haider@123", // Cast to String to prevent the SASL error
  database: process.env.DB_NAME || "Assignment-2-db",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: ["migrations/*.js"], // Removed 'src/' as per your folder structure
  migrationsTableName: "migrations"
});

export default AppDataSource;