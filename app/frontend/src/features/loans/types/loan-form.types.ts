import { z } from "zod";
import { loanFormSchema } from "../validators/loan.validator";

export type LoanFormInput = z.input<typeof loanFormSchema>;

export type LoanFormValues = {
  amount: number;
  termMonths: 3 | 6 | 12;
};
