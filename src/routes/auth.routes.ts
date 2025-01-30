import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { asyncHandler } from "../helpers/handler";
import validate from "../middlewares/validators/validate";
import * as schema from "../middlewares/validators/schema";

const router = Router();

router.post(
  "/signup",
  validate(schema.signupSchema, { body: true }),
  asyncHandler(authController.signup)
);

router.post(
  "/login",
  validate(schema.loginSchema, { body: true }),
  asyncHandler(authController.login)
);

router.post(
  "/resend-otp",
  validate(schema.resendOtpSchema, { body: true }),
  asyncHandler(authController.resendVerificationCode)
);

router.post(
  "/verify",
  validate(schema.verifyEmailSchema, { body: true }),
  asyncHandler(authController.verifyEmail)
);

export default router;
