import { Role } from "@prisma/client";
import { Router } from "express";
import { loanController } from "../controllers/loan.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";
import {
  createLoanSchema,
  loanIdParamSchema,
} from "../validators/loan.validator.js";

export const loanRoutes = Router();

loanRoutes.use(authenticate);

loanRoutes.get(
  "/my-loans",
  authorizeRole(Role.USER),
  asyncHandler(loanController.myLoans),
);
loanRoutes.post(
  "/",
  authorizeRole(Role.USER),
  validateRequest(createLoanSchema),
  asyncHandler(loanController.create),
);

loanRoutes.get(
  "/admin/all",
  authorizeRole(Role.ADMIN),
  asyncHandler(loanController.allLoans),
);
loanRoutes.patch(
  "/admin/:loanId/approve",
  authorizeRole(Role.ADMIN),
  validateRequest(loanIdParamSchema),
  asyncHandler(loanController.approve),
);
loanRoutes.patch(
  "/admin/:loanId/reject",
  authorizeRole(Role.ADMIN),
  validateRequest(loanIdParamSchema),
  asyncHandler(loanController.reject),
);
