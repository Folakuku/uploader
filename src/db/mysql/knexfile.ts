import type { Knex } from "knex";
import path from "path";

import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "..", "..", "..", "./.env") });

const config: Record<string, Knex.Config<any>> = {
  production: {
    client: "mysql2",
    connection: {
      host: process.env.MYSQL_DB_HOST,
      user: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      port: Number(process.env.MYSQL_DB_PORT),
    },
    migrations: {
      directory: path.join(__dirname + "/migrations"),
    },
    seeds: {
      directory: path.join(__dirname + "/seeds"),
    },
  },
  development: {
    client: "mysql2",
    connection: {
      host: process.env.MYSQL_DB_HOST,
      user: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      port: Number(process.env.MYSQL_DB_PORT),
    },
    migrations: {
      directory: path.join(__dirname + "/migrations"),
    },
    seeds: {
      directory: path.join(__dirname + "/seeds"),
    },
  },
};

export default config;
