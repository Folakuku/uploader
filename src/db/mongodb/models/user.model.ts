// src/db/mongoose/schemas/user.schema.ts
import { Schema, model } from "mongoose";
import { IUser } from "../../../typings/user";

const userSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const User = model<IUser>("User", userSchema);
export default User;
