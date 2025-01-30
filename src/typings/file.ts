import { Schema } from "mongoose";

export interface IFile {
  id: string;
  // userId: string | Schema.Types.ObjectId;
  userId: string;
  filename: string;
  s3Key: string;
  mimetype: string;
  size?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFileRepository {
  create(user: Omit<IFile, "id" | "isVerified">): Promise<IFile>;
  findOne(query: Record<string, any>): Promise<IFile | null | undefined>;
  find(query: Record<string, any>): Promise<IFile[] | null>;
  update(
    query: Record<string, any>,
    update: Partial<IFile>
  ): Promise<IFile | null>;
  deleteOne(query: Record<string, any>): Promise<void>;
}
