import {
  calculateLoanRepayment,
  LOAN_TERM_OPTIONS,
} from "@loan-management/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWatch, useForm } from "react-hook-form";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { formatPhilippinePeso } from "../../../utils/currency";
import { useCreateLoanMutation } from "../hooks/useLoanQueries";
import type { LoanFormInput, LoanFormValues } from "../types/loan-form.types";
import { loanFormSchema } from "../validators/loan.validator";

const termOptions = LOAN_TERM_OPTIONS.map((term) => ({
  value: term,
  label: `${term} Months`,
}));

type LoanFormProps = {
  onCancel?: () => void;
  onSuccess?: () => void;
};

export function LoanForm({ onCancel, onSuccess }: LoanFormProps) {
  const createLoanMutation = useCreateLoanMutation({ onSuccess });
  const form = useForm<LoanFormInput, unknown, LoanFormValues>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: { amount: 1000, termMonths: 12 },
  });
  const amount = useWatch({ control: form.control, name: "amount" });
  const termMonths = useWatch({ control: form.control, name: "termMonths" });
  const repayment = calculateLoanRepayment(
    Number(amount || 0),
    Number(termMonths) as 3 | 6 | 12,
  );

  return (
    <form
      className="loan-form"
      onSubmit={form.handleSubmit((values) =>
        createLoanMutation.mutate(values),
      )}
    >
      <Input
        label="Loan Amount"
        type="number"
        min={1}
        step={1}
        error={form.formState.errors.amount?.message}
        {...form.register("amount")}
      />
      <Select
        label="Term (Months)"
        options={termOptions}
        error={form.formState.errors.termMonths?.message}
        {...form.register("termMonths")}
      />
      <div className="repayment-grid">
        <label>
          <span>Monthly Payment</span>
          <output>{formatPhilippinePeso(repayment.monthlyPayment)}</output>
        </label>
        <label>
          <span>Total Repayment</span>
          <output>{formatPhilippinePeso(repayment.totalRepayment)}</output>
        </label>
      </div>
      <div className="modal-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={createLoanMutation.isPending}>
          {createLoanMutation.isPending ? "Submitting" : "Submit Application"}
        </Button>
      </div>
      {createLoanMutation.error ? (
        <p className="form-error">{createLoanMutation.error.message}</p>
      ) : null}
    </form>
  );
}
