import type { Request, Response } from "express";
import { authService } from "../services/auth.service.js";
import { requireAuthUser } from "../utils/auth.util.js";
import type {
  LoginInput,
  RegisterInput,
} from "../validators/auth.validator.js";

export const authController = {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body as RegisterInput);
    res.status(201).json(result);
  },

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body as LoginInput);
    res.json(result);
  },

  async me(req: Request, res: Response) {
    const authUser = requireAuthUser(req);
    const user = await authService.me(authUser.id);
    res.json({ user });
  },
};
