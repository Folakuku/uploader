import { FilterQuery, UpdateQuery } from "mongoose";
import { IFile, IFileRepository } from "../../../typings/file";
import File from "../models/file.model";

export class MongooseFileRepository implements IFileRepository {
  async create(file: Omit<IFile, "id">): Promise<IFile> {
    return await File.create(file);
  }

  async findOne(query: FilterQuery<IFile>): Promise<IFile | null> {
    if ("id" in query) {
      query._id = query.id;
      delete query.id;
    }

    return await File.findOne(query);
  }

  async find(query: FilterQuery<IFile>): Promise<IFile[] | null> {
    if ("id" in query) {
      query._id = query.id;
      delete query.id;
    }

    return await File.find(query);
  }

  async update(
    query: FilterQuery<IFile>,
    update: UpdateQuery<IFile>
  ): Promise<IFile | null> {
    if ("id" in query) {
      query._id = query.id;
      delete query.id;
    }

    return await File.findOneAndUpdate(query, update);
  }

  async deleteOne(query: FilterQuery<IFile>): Promise<void> {
    if ("id" in query) {
      query._id = query.id;
      delete query.id;
    }

    await File.deleteOne(query);
    return;
  }
}
