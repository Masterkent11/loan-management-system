import type { Loan } from "@loan-management/shared";
import { httpClient } from "../../../services/http-client";
import type { LoanFormValues } from "../types/loan-form.types";

export const loanApi = {
  async getMyLoans() {
    const { data } = await httpClient.get<{ loans: Loan[] }>("/loans/my-loans");
    return data.loans;
  },

  async getAllLoans() {
    const { data } = await httpClient.get<{ loans: Loan[] }>(
      "/loans/admin/all",
    );
    return data.loans;
  },

  async createLoan(payload: LoanFormValues) {
    const { data } = await httpClient.post<{ loan: Loan }>("/loans", payload);
    return data.loan;
  },

  async approveLoan(loanId: string) {
    const { data } = await httpClient.patch<{ loan: Loan }>(
      `/loans/admin/${loanId}/approve`,
    );
    return data.loan;
  },

  async rejectLoan(loanId: string) {
    const { data } = await httpClient.patch<{ loan: Loan }>(
      `/loans/admin/${loanId}/reject`,
    );
    return data.loan;
  },
};
