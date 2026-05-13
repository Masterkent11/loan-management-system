import type { Request } from "express";
import type { AuthUser } from "../types/auth.types.js";
import { HttpError } from "./http-error.js";

export function requireAuthUser(req: Request): AuthUser {
  if (!req.user) {
    throw new HttpError(401, "Authentication token is required.");
  }

  return req.user;
}
