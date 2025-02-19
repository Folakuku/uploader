import { Knex } from "knex";
import { IFile, IFileRepository } from "../../../typings/file";
import { Tables } from "../../../typings/customs";
import { v4 as uuidv4 } from "uuid";

export class KnexFileRepository implements IFileRepository {
  constructor(private readonly knex: Knex) {}

  async create(file: IFile): Promise<IFile> {
    const id = uuidv4();
    await this.knex(Tables.File).insert({ ...file, id });

    const newFile = await this.knex(Tables.File).where({ id }).first();

    return newFile;
  }

  async findOne(query: Partial<IFile>): Promise<IFile | null | undefined> {
    return await this.knex<IFile>(Tables.File).where(query).first();
  }

  async find(query: Partial<IFile>): Promise<IFile[] | null> {
    return await this.knex<IFile>(Tables.File).where(query);
  }

  async update(
    query: Partial<IFile>,
    update: Partial<IFile>
  ): Promise<IFile | null> {
    await this.knex(Tables.File).where(query).update(update);

    return await this.knex(Tables.File).where(query).select("*").first();
  }

  async deleteOne(query: Partial<IFile>) {
    await this.knex(Tables.File).where(query).del();

    return;
  }
}
