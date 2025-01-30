import { FilterQuery, UpdateQuery } from "mongoose";
import { IUser, IUserRepository } from "../../../typings/user";
import User from "../models/user.model";

export class MongooseUserRepository implements IUserRepository {
  async create(user: Omit<IUser, "id">): Promise<IUser> {
    return await User.create(user);
  }

  async findOne(query: FilterQuery<IUser>): Promise<IUser | null> {
    if ("id" in query) {
      query._id = query.id;
      delete query.id;
    }

    return await User.findOne(query);
  }

  async find(query: FilterQuery<IUser>): Promise<IUser[] | null> {
    if ("id" in query) {
      query._id = query.id;
      delete query.id;
    }
    return await User.find(query);
  }

  async update(
    query: FilterQuery<IUser>,
    update: UpdateQuery<IUser>
  ): Promise<IUser | null> {
    if ("id" in query) {
      query._id = query.id;
      delete query.id;
    }
    return await User.findOneAndUpdate(query, update);
  }
}
