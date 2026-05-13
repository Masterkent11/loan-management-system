import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { AuthUser } from "../types/auth.types.js";

export const signAccessToken = (user: AuthUser) =>
  jwt.sign(user, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, env.JWT_SECRET) as AuthUser;
