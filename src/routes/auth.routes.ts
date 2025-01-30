import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { asyncHandler } from "../helpers/handler";
import validate from "../middlewares/validators/validate";
import { loginSchema, signupSchema } from "../middlewares/validators/schema";

const router = Router();

router.post(
  "/signup",
  validate(signupSchema, { body: true }),
  asyncHandler(authController.signup)
);

router.post(
  "/login",
  validate(loginSchema, { body: true }),
  asyncHandler(authController.login)
);

router.post(
  "/verify",
  //   validate(loginSchema, { body: true }),
  asyncHandler(authController.verifyEmail)
);

export default router;
