import { LOAN_INTEREST_RATES } from "../constants/loan.constants.js";
import type { LoanRepayment, LoanTermMonths } from "../types/loan.types.js";

const roundMoney = (value: number) => Number(value.toFixed(2));

export function calculateLoanRepayment(
  amount: number,
  termMonths: LoanTermMonths,
): LoanRepayment {
  const interestRate = LOAN_INTEREST_RATES[termMonths];
  const totalRepayment = roundMoney(amount + amount * interestRate);
  const monthlyPayment = roundMoney(totalRepayment / termMonths);

  return {
    interestRate,
    monthlyPayment,
    totalRepayment,
  };
}
