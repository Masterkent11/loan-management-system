import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";

export const authRoutes = Router();

authRoutes.post(
  "/register",
  validateRequest(registerSchema),
  asyncHandler(authController.register),
);
authRoutes.post(
  "/login",
  validateRequest(loginSchema),
  asyncHandler(authController.login),
);
authRoutes.get("/me", authenticate, asyncHandler(authController.me));
