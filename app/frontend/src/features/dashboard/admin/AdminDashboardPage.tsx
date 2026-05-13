import { EmptyState } from "../../../components/common/EmptyState";
import { LoadingState } from "../../../components/common/LoadingState";
import { AppShell } from "../../../components/layout/AppShell";
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
    <AppShell title="Admin Dashboard">
      <section className="summary-grid">
        <article>
          <span>Total applications</span>
          <strong>{summary.totalApplications}</strong>
        </article>
        <article>
          <span>Pending review</span>
          <strong>{summary.pendingApplications}</strong>
        </article>
        <article>
          <span>Approved</span>
          <strong>{summary.approvedApplications}</strong>
        </article>
      </section>
      <section className="panel">
        <h2>Loan queue</h2>
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
