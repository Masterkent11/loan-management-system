import { EmptyState } from "../../../components/common/EmptyState";
import { LoadingState } from "../../../components/common/LoadingState";
import { AppShell } from "../../../components/layout/AppShell";
import { LoanForm } from "../../loans/components/LoanForm";
import { LoanTable } from "../../loans/components/LoanTable";
import { useMyLoansQuery } from "../../loans/hooks/useLoanQueries";
import { summarizeLoans } from "../../loans/utils/loan-summary";

export function UserDashboardPage() {
  const loansQuery = useMyLoansQuery();
  const loans = loansQuery.data ?? [];
  const summary = summarizeLoans(loans);

  return (
    <AppShell title="User Dashboard">
      <section className="summary-grid">
        <article>
          <span>Total applications</span>
          <strong>{summary.totalApplications}</strong>
        </article>
        <article>
          <span>Pending</span>
          <strong>{summary.pendingApplications}</strong>
        </article>
        <article>
          <span>Total requested</span>
          <strong>${summary.totalRequested.toLocaleString()}</strong>
        </article>
      </section>
      <section className="content-grid">
        <LoanForm />
        <div className="panel">
          <h2>My applications</h2>
          {loansQuery.isLoading ? <LoadingState /> : null}
          {!loansQuery.isLoading && loans.length === 0 ? (
            <EmptyState
              title="No applications yet"
              description="Your submitted loan applications will appear here."
            />
          ) : null}
          {loans.length > 0 ? <LoanTable loans={loans} /> : null}
        </div>
      </section>
    </AppShell>
  );
}
