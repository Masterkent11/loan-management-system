import type { NextFunction, Request, Response } from "express";
import { envValidationErrors } from "../config/env.js";

export const requireRuntimeConfig = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envValidationErrors.length === 0) {
    next();
    return;
  }

  console.error("Runtime configuration blocked request", {
    issues: envValidationErrors,
    path: req.originalUrl,
  });

  res.status(503).json({
    message:
      "Server configuration is incomplete. Verify Vercel environment variables.",
  });
};
