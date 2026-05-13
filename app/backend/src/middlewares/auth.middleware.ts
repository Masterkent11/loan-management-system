import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/http-error.js";
import { verifyAccessToken } from "../utils/token.util.js";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    next(new HttpError(401, "Authentication token is required."));
    return;
  }

  try {
    req.user = verifyAccessToken(header.replace("Bearer ", ""));
    next();
  } catch {
    next(new HttpError(401, "Invalid or expired authentication token."));
  }
};
