import { NextFunction, Request, Response } from "express";
import JWT from "../helpers/jwt";
import { getRepositories } from "../db";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "User not authorized",
    });
  }
  try {
    // verify token
    const jwt = new JWT();
    const decoded = jwt.verifyToken(token) as any;

    // check if user exists or not
    const { userRepository } = await getRepositories();

    const user = await userRepository.findOne({ id: decoded.userId });
    if (!user) {
      return res.status(404).json({
        message: `User not found`,
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: `User not verified`,
      });
    }
    req.user = user;
    next();
  } catch (err: any) {
    return res.status(403).json({
      message: "Invalid authorization token",
    });
  }
}
