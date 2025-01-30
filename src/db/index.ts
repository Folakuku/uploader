import mongoose from "mongoose";
import env from "../config/env";
import logger from "../config/logger";
import knex from "knex";
import config from "./mysql/knexfile";
import { DatabaseFactory } from "./database.factory";
import { RepositoryFactory } from "./repository.factory";

export const getRepositories = async () => {
  const dbConnection = await DatabaseFactory.createConnection();
  const userRepository = RepositoryFactory.getUserRepository(dbConnection);
  const fileRepository = RepositoryFactory.getFileRepository(dbConnection);
  return { userRepository, fileRepository };
};

export const checkDB = async () => {
  if (env.db_type === "mongodb") {
    await mongoose.connect(env.mongodb_uri!);
    logger.log("Connected to MongoDB");
    return;
  }

  if (env.db_type === "mysql") {
    const envMode = process.env.NODE_ENV || "development";
    const db = knex(config[envMode]);

    try {
      await db.raw("SELECT 1");
      logger.log("Connected to MySQL ");
      return;
    } catch (error: any) {
      logger.log("MySQL connection failed");
      logger.logErrorToConsole(error);
      process.exit(1);
    }
  }
};
