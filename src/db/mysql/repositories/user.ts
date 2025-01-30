import { Knex } from "knex";
import { IUser, IUserRepository } from "../../../typings/user";
import { Tables } from "../../../typings/customs";
import { v4 as uuidv4 } from "uuid";

export class KnexUserRepository implements IUserRepository {
  constructor(private readonly knex: Knex) {}

  async create(user: IUser): Promise<IUser> {
    const [newUser] = await this.knex(Tables.User)
      .insert({ ...user, id: uuidv4() })
      .returning("*");

    //         // Retrieve create user
    //   const users = await db(Tables.User)
    //   .join(Tables.Wallet, "users.id", "=", "wallets.user_id")
    //   .select(
    //     "users.id",
    //     "users.fullname",
    //     "users.email",
    //     { wallet_id: "wallets.id" },
    //     "wallets.balance"
    //   )
    //   .where({ email });

    // const user = users[0];

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
    await this.knex("table").where(query).update({
      update,
    });

    return await this.knex("table").where(query).select("last_opening").first();
  }
}
