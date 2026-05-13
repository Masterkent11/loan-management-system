import { calculateLoanRepayment } from "@loan-management/shared";
import { prisma } from "../database/prisma.client.js";
import { HttpError } from "../utils/http-error.js";
import type { CreateLoanInput } from "../validators/loan.validator.js";

const loanSelect = {
  id: true,
  userId: true,
  amount: true,
  termMonths: true,
  interestRate: true,
  monthlyPayment: true,
  totalRepayment: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
};

export const loanService = {
  async createLoan(userId: string, input: CreateLoanInput) {
    const repayment = calculateLoanRepayment(
      input.amount,
      input.termMonths as 3 | 6 | 12,
    );

    return prisma.loan.create({
      data: {
        userId,
        amount: input.amount,
        termMonths: input.termMonths,
        interestRate: repayment.interestRate,
        monthlyPayment: repayment.monthlyPayment,
        totalRepayment: repayment.totalRepayment,
      },
      select: loanSelect,
    });
  },

  async getMyLoans(userId: string) {
    return prisma.loan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: loanSelect,
    });
  },

  async getAllLoans() {
    return prisma.loan.findMany({
      orderBy: { createdAt: "desc" },
      select: loanSelect,
    });
  },

  async updateStatus(loanId: string, status: "APPROVED" | "REJECTED") {
    const loan = await prisma.loan.findUnique({ where: { id: loanId } });

    if (!loan) {
      throw new HttpError(404, "Loan application not found.");
    }

    return prisma.loan.update({
      where: { id: loanId },
      data: { status },
      select: loanSelect,
    });
  },
};
