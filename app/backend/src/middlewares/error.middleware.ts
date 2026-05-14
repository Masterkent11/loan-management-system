import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/http-error.js";
import {
  getPrismaErrorDetails,
  isDatabaseSetupError,
} from "../utils/prisma-error.util.js";

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    res.status(422).json({
      message: "Validation failed.",
      errors: error.flatten(),
    });
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  console.error("Unhandled API error", getPrismaErrorDetails(error));

  if (isDatabaseSetupError(error)) {
    res.status(503).json({
      message:
        "Database is not ready. Verify Neon environment variables and run Prisma migrations.",
    });
    return;
  }

  res.status(500).json({ message: "Internal server error." });
};
