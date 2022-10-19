import { config } from "dotenv";
config();

export const PORT = process.env.PORT
export const DB_HOST = process.env.DB_HOST || "127.0.0.1"
export const DB_PORT = process.env.DB_PORT||3306
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_DATABASE = process.env.DB_DATABASE || hygienehabits_db
