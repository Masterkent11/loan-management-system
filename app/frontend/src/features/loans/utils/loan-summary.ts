import type { Loan } from "@loan-management/shared";

const toNumber = (value: number | string) => Number(value);

export function summarizeLoans(loans: Loan[]) {
  return loans.reduce(
    (summary, loan) => ({
      totalApplications: summary.totalApplications + 1,
      pendingApplications:
        summary.pendingApplications + (loan.status === "PENDING" ? 1 : 0),
      approvedApplications:
        summary.approvedApplications + (loan.status === "APPROVED" ? 1 : 0),
      totalRequested: summary.totalRequested + toNumber(loan.amount),
      totalBorrowed:
        summary.totalBorrowed +
        (loan.status === "APPROVED" ? toNumber(loan.amount) : 0),
    }),
    {
      totalApplications: 0,
      pendingApplications: 0,
      approvedApplications: 0,
      totalRequested: 0,
      totalBorrowed: 0,
    },
  );
}
