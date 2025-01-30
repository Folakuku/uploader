// src/factories/repository.factory.ts
import env from "../config/env";
import { IUserRepository } from "../typings/user";
import { MongooseUserRepository } from "./mongodb/repositories/user";
import { KnexUserRepository } from "./mysql/repositories/user";
import { MongooseFileRepository } from "./mongodb/repositories/file";
import { IFileRepository } from "../typings/file";
import { KnexFileRepository } from "./mysql/repositories/file";

export class RepositoryFactory {
  static getUserRepository(dbConnection: any): IUserRepository {
    if (env.db_type === "mongodb") {
      return new MongooseUserRepository();
    }

    if (env.db_type === "mysql") {
      return new KnexUserRepository(dbConnection);
    }

    throw new Error("Invalid DB_TYPE");
  }

  static getFileRepository(dbConnection: any): IFileRepository {
    if (env.db_type === "mongodb") {
      return new MongooseFileRepository();
    }

    if (env.db_type === "mysql") {
      return new KnexFileRepository(dbConnection);
    }

    throw new Error("Invalid DB_TYPE");
  }
}
