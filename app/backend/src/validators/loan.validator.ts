import { LOAN_TERM_OPTIONS } from "@loan-management/shared";
import { z } from "zod";

export const createLoanSchema = z.object({
  body: z.object({
    amount: z.coerce.number().positive().max(1_000_000),
    termMonths: z.coerce
      .number()
      .refine((value) => LOAN_TERM_OPTIONS.includes(value as 3 | 6 | 12), {
        message: "Loan term must be 3, 6, or 12 months.",
      }),
  }),
});

export const loanIdParamSchema = z.object({
  params: z.object({
    loanId: z.string().uuid(),
  }),
});

export type CreateLoanInput = z.infer<typeof createLoanSchema>["body"];
