import { EmptyState } from "../../../components/common/EmptyState";
import { LoadingState } from "../../../components/common/LoadingState";
import { AppShell } from "../../../components/layout/AppShell";
import { formatPhilippinePeso } from "../../../utils/currency";
import { LoanTable } from "../../loans/components/LoanTable";
import {
  useAllLoansQuery,
  useApproveLoanMutation,
  useRejectLoanMutation,
} from "../../loans/hooks/useLoanQueries";
import { summarizeLoans } from "../../loans/utils/loan-summary";

export function AdminDashboardPage() {
  const loansQuery = useAllLoansQuery();
  const approveLoanMutation = useApproveLoanMutation();
  const rejectLoanMutation = useRejectLoanMutation();
  const loans = loansQuery.data ?? [];
  const summary = summarizeLoans(loans);

  return (
    <AppShell title="Dashboard">
      <section className="summary-grid">
        <article>
          <span>Total Applications</span>
          <strong>{summary.totalApplications}</strong>
        </article>
        <article>
          <span>Pending Review</span>
          <strong>{summary.pendingApplications}</strong>
        </article>
        <article>
          <span>Total Borrowed</span>
          <strong>{formatPhilippinePeso(summary.totalBorrowed)}</strong>
        </article>
        <article>
          <span>Approved Loans</span>
          <strong>{summary.approvedApplications}</strong>
        </article>
      </section>
      <section className="dashboard-section">
        <h2>Loans</h2>
        {loansQuery.isLoading ? <LoadingState /> : null}
        {!loansQuery.isLoading && loans.length === 0 ? (
          <EmptyState
            title="No loan applications"
            description="Applications from users will be listed here."
          />
        ) : null}
        {loans.length > 0 ? (
          <LoanTable
            isAdmin
            loans={loans}
            onApprove={(loanId) => approveLoanMutation.mutate(loanId)}
            onReject={(loanId) => rejectLoanMutation.mutate(loanId)}
          />
        ) : null}
      </section>
    </AppShell>
  );
}
