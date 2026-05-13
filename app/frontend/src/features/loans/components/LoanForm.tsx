import {
  calculateLoanRepayment,
  LOAN_TERM_OPTIONS,
} from "@loan-management/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWatch, useForm } from "react-hook-form";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { useCreateLoanMutation } from "../hooks/useLoanQueries";
import type { LoanFormInput, LoanFormValues } from "../types/loan-form.types";
import { loanFormSchema } from "../validators/loan.validator";

const termOptions = LOAN_TERM_OPTIONS.map((term) => ({
  value: term,
  label: `${term} months`,
}));

export function LoanForm() {
  const createLoanMutation = useCreateLoanMutation();
  const form = useForm<LoanFormInput, unknown, LoanFormValues>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: { amount: 10000, termMonths: 12 },
  });
  const amount = useWatch({ control: form.control, name: "amount" });
  const termMonths = useWatch({ control: form.control, name: "termMonths" });
  const repayment = calculateLoanRepayment(
    Number(amount || 0),
    Number(termMonths) as 3 | 6 | 12,
  );

  return (
    <form
      className="panel stack"
      onSubmit={form.handleSubmit((values) =>
        createLoanMutation.mutate(values),
      )}
    >
      <h2>Apply for a loan</h2>
      <Input
        label="Amount"
        type="number"
        min={1}
        step={100}
        error={form.formState.errors.amount?.message}
        {...form.register("amount")}
      />
      <Select
        label="Term"
        options={termOptions}
        error={form.formState.errors.termMonths?.message}
        {...form.register("termMonths")}
      />
      <div className="repayment-grid">
        <span>Interest {(repayment.interestRate * 100).toFixed(0)}%</span>
        <strong>${repayment.monthlyPayment.toLocaleString()} / month</strong>
        <span>Total ${repayment.totalRepayment.toLocaleString()}</span>
      </div>
      <Button type="submit" disabled={createLoanMutation.isPending}>
        {createLoanMutation.isPending ? "Submitting" : "Submit application"}
      </Button>
      {createLoanMutation.error ? (
        <p className="form-error">{createLoanMutation.error.message}</p>
      ) : null}
    </form>
  );
}
