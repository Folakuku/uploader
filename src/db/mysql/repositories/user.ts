import { Knex } from "knex";
import { IUser, IUserRepository } from "../../../typings/user";
import { Tables } from "../../../typings/customs";
import { v4 as uuidv4 } from "uuid";

export class KnexUserRepository implements IUserRepository {
  constructor(private readonly knex: Knex) {}

  async create(user: IUser): Promise<IUser> {
    const id = uuidv4();
    await this.knex(Tables.User).insert({ ...user, id });

    const newUser = await this.knex(Tables.User)
      .select("users.id", "users.fullname", "users.email", "users.isVerified")
      .where({ id })
      .first();

    return newUser;
  }

  async findOne(query: Partial<IUser>): Promise<IUser | null | undefined> {
    return await this.knex<IUser>(Tables.User).where(query).first();
  }

  async find(query: Partial<IUser>): Promise<IUser[] | null> {
    return await this.knex<IUser>(Tables.User).where(query);
  }

  async update(
    query: Partial<IUser>,
    update: Partial<IUser>
  ): Promise<IUser | null> {
    await this.knex(Tables.User).where(query).update(update);

    return await this.knex(Tables.User)
      .where(query)
      .select("users.id", "users.fullname", "users.email", "users.isVerified")
      .first();
  }
}
