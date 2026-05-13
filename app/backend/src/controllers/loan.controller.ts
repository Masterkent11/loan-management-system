import type { Request, Response } from "express";
import { loanService } from "../services/loan.service.js";
import { requireAuthUser } from "../utils/auth.util.js";
import type { CreateLoanInput } from "../validators/loan.validator.js";

export const loanController = {
  async create(req: Request, res: Response) {
    const authUser = requireAuthUser(req);
    const loan = await loanService.createLoan(
      authUser.id,
      req.body as CreateLoanInput,
    );
    res.status(201).json({ loan });
  },

  async myLoans(req: Request, res: Response) {
    const authUser = requireAuthUser(req);
    const loans = await loanService.getMyLoans(authUser.id);
    res.json({ loans });
  },

  async allLoans(_req: Request, res: Response) {
    const loans = await loanService.getAllLoans();
    res.json({ loans });
  },

  async approve(req: Request, res: Response) {
    const loan = await loanService.updateStatus(
      String(req.params.loanId),
      "APPROVED",
    );
    res.json({ loan });
  },

  async reject(req: Request, res: Response) {
    const loan = await loanService.updateStatus(
      String(req.params.loanId),
      "REJECTED",
    );
    res.json({ loan });
  },
};
