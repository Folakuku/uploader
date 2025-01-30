import env from "../config/env";
import knex from "knex";
import config from "./mysql/knexfile";

export class DatabaseFactory {
  static async createConnection() {
    if (env.db_type === "mongodb") {
      return;
    }

    if (env.db_type === "mysql") {
      const envMode = process.env.NODE_ENV || "development";

      return knex(config[envMode]);
    }

    throw new Error("Invalid DB_TYPE in environment variables");
  }
}
