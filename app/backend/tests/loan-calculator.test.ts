import { describe, expect, it } from "vitest";
import { calculateLoanRepayment } from "@loan-management/shared";

describe("calculateLoanRepayment", () => {
  it("calculates total repayment and monthly payment from the selected term", () => {
    expect(calculateLoanRepayment(10000, 12)).toEqual({
      interestRate: 0.12,
      monthlyPayment: 933.33,
      totalRepayment: 11200,
    });
  });
});
