import { Router } from "express";
import { authRoutes } from "./auth.routes.js";
import { loanRoutes } from "./loan.routes.js";

export const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/loans", loanRoutes);
