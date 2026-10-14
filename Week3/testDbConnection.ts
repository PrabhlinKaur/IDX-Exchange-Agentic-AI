
import { pool } from "./dbConnection.ts";

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT DATABASE() AS databaseName");
    console.log("Connected to MySQL successfully!");
    console.log("Database:", rows);

    const [tables] = await pool.query("SHOW TABLES");
    console.log("Available tables:", tables);

  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await pool.end();
  }
}

testConnection();
