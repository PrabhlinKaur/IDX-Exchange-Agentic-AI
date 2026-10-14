
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import os from "node:os";
import path from "node:path";

// Load the existing OpenClaw environment file.
dotenv.config({
  path: path.join(os.homedir(), "openclaw", ".env")
});

// Check that required database settings exist.
const requiredVariables = [
  "MYSQL_HOST",
  "MYSQL_USER",
  "MYSQL_DATABASE"
];

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    throw new Error(`Missing environment variable: ${variable}`);
  }
}

// Create a reusable MySQL connection pool.
export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD ?? "",
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});
