import express from "express";

import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userSignupSchema,
  userSigninSchema,
  userEmailSchema,
} from "../../models/User.js";

import authController from "../../controllers/auth-controllers.js";
const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.get("/verify/:verificationCode", authController.verify);

authRouter.post(
  "/verify",
  isEmptyBody,
  validateBody(userEmailSchema),
  authController.resendVerify
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSigninSchema),
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.signout);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updAvatar
);

export default authRouter;
