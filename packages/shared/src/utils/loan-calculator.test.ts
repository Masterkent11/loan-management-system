import { describe, expect, it } from "vitest";
import { calculateLoanRepayment } from "./loan-calculator.js";

describe("calculateLoanRepayment", () => {
  it("uses the configured interest rate for the selected loan term", () => {
    expect(calculateLoanRepayment(5000, 6)).toEqual({
      interestRate: 0.06,
      monthlyPayment: 883.33,
      totalRepayment: 5300,
    });
  });
});
