import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

export const validateRequest =
  (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      next(result.error);
      return;
    }

    next();
  };
