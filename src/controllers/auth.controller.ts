import { Request, Response } from "express";
import JWT from "../helpers/jwt";
import { errorResponse, successResponse } from "../helpers/response";
import { IUser } from "../typings/user";
import { getRepositories } from "../db";
import redis from "../db/redis";
import { sendVerificationEmail } from "../services/email";
import {
  compareHash,
  generateHash,
  generateRandomNumberString,
} from "../helpers/utils";

export const signup = async (req: Request, res: Response) => {
  const payload: IUser = req.body;
  const { email, fullname, password } = payload;

  const { userRepository } = await getRepositories();

  //Check for existing users with email
  const existingUsers = await userRepository.find({
    email: email.toLowerCase(),
  });
  if (existingUsers?.length) {
    return errorResponse(res, "This email has already been registered", 400);
  }

  // hash password
  const hashedPassword = generateHash(password);

  // save user record
  const user = await userRepository.create({
    email: email.toLowerCase(),
    password: hashedPassword,
    fullname,
  });

  // send verification email
  const otp = generateRandomNumberString(6);
  await redis.set(otp, email.toLowerCase(), "EX", 5 * 60);
  await sendVerificationEmail(email, otp);

  // generate access
  const jwt = new JWT();
  const accessToken = jwt.accessToken({ userId: user.id });

  return successResponse(
    res,
    "user registered successfully",
    { user, accessToken },
    201
  );
};

export const login = async (req: Request, res: Response) => {
  const payload = req.body;
  const { email, password } = payload;

  // check for user in database
  const { userRepository } = await getRepositories();

  const user = await userRepository.findOne({ email });
  if (!user) {
    return errorResponse(res, "Invalid email or password", 404);
  }

  // validate password
  const valid = compareHash(password, user.password);
  if (!valid) {
    return errorResponse(res, "Invalid email or password", 401);
  }

  // generate access
  const jwt = new JWT();
  const accessToken = jwt.accessToken({ userId: user.id });

  successResponse(
    res,
    "user logged in successfully",
    {
      user,
      accessToken,
    },
    200
  );
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { otp } = req.body;

  const email = await redis.get(otp);
  if (!email) {
    return errorResponse(res, "Invalid or expired otp", 401);
  }

  await redis.del(otp);

  // check for user in database
  const { userRepository } = await getRepositories();

  let user = await userRepository.findOne({ email });
  if (!user) {
    return errorResponse(res, "User not found", 404);
  }

  user = await userRepository.update({ email }, { isVerified: true });

  successResponse(
    res,
    "Verification successful",
    {
      user,
    },
    200
  );
};
