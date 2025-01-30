import Joi from "joi";
import { IUser } from "../../typings/user";

export const signupSchema = Joi.object({
  body: Joi.object<IUser>({
    email: Joi.string().email().required(),
    fullname: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,20}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character",
        "string.min": "Password must be at least 8 characters long",
      }),
  }),
}).required();

export const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}).required();
