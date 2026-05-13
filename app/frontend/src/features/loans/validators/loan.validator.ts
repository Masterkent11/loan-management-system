import { z } from "zod";

export const loanFormSchema = z.object({
  amount: z.coerce
    .number()
    .positive("Amount must be greater than zero.")
    .max(1_000_000),
  termMonths: z.preprocess(
    (value) => Number(value),
    z.union([z.literal(3), z.literal(6), z.literal(12)], {
      message: "Choose a valid term.",
    }),
  ),
});
