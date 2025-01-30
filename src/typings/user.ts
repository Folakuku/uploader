export interface IUser {
  id: string;
  email: string;
  fullname: string;
  password: string;
  isVerified: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserRepository {
  create(user: Omit<IUser, "id" | "isVerified">): Promise<IUser>;
  findOne(query: Record<string, any>): Promise<IUser | null | undefined>;
  find(query: Record<string, any>): Promise<IUser[] | null>;
  update(
    query: Record<string, any>,
    update: Partial<IUser>
  ): Promise<IUser | null>;
  // delete(id: string): Promise<boolean>;
}
