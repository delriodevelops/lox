import pg from "pg";
import * as dotenv from 'dotenv' 
dotenv.config()

export const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_ENDPOINT,
    password: process.env.DB_PASS,
    database: process.env.DB_USER,
    port: process.env.DB_PORT,
});


