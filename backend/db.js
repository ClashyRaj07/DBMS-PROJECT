import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to PlanetScale Database!");

export default db;
