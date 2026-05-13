import { EmptyState } from "../../../components/common/EmptyState";
import { LoadingState } from "../../../components/common/LoadingState";
import { AppShell } from "../../../components/layout/AppShell";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { formatPhilippinePeso } from "../../../utils/currency";
import { LoanForm } from "../../loans/components/LoanForm";
import { LoanTable } from "../../loans/components/LoanTable";
import { useMyLoansQuery } from "../../loans/hooks/useLoanQueries";
import { summarizeLoans } from "../../loans/utils/loan-summary";

export function UserDashboardPage() {
  const loanModal = useDisclosure();
  const loansQuery = useMyLoansQuery();
  const loans = loansQuery.data ?? [];
  const summary = summarizeLoans(loans);

  return (
    <AppShell
      title="Dashboard"
      actions={
        <Button type="button" onClick={loanModal.open}>
          Apply for Loan
        </Button>
      }
    >
      <section className="summary-grid">
        <article>
          <span>Approved Loans</span>
          <strong>{summary.approvedApplications}</strong>
        </article>
        <article>
          <span>Total Borrowed</span>
          <strong>{formatPhilippinePeso(summary.totalBorrowed)}</strong>
        </article>
      </section>
      <section className="dashboard-section">
        <h2>Loans</h2>
        {loansQuery.isLoading ? <LoadingState /> : null}
        {!loansQuery.isLoading && loans.length === 0 ? (
          <EmptyState
            title="No applications yet"
            description="Your submitted loan applications will appear here."
          />
        ) : null}
        {loans.length > 0 ? <LoanTable loans={loans} /> : null}
      </section>
      <Modal
        description="Enter the details for your new loan request."
        isOpen={loanModal.isOpen}
        title="New Loan Application"
        onClose={loanModal.close}
      >
        <LoanForm onCancel={loanModal.close} onSuccess={loanModal.close} />
      </Modal>
    </AppShell>
  );
}
