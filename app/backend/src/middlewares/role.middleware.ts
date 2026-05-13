import type { NextFunction, Request, Response } from "express";
import type { Role } from "@prisma/client";
import { HttpError } from "../utils/http-error.js";

export const authorizeRole =
  (...allowedRoles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      next(
        new HttpError(
          403,
          "You do not have permission to access this resource.",
        ),
      );
      return;
    }

    next();
  };
