import type { Loan } from "@loan-management/shared";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { formatPhilippinePeso } from "../../../utils/currency";
import { formatDisplayDate } from "../../../utils/date";

type LoanTableProps = {
  loans: Loan[];
  isAdmin?: boolean;
  onApprove?: (loanId: string) => void;
  onReject?: (loanId: string) => void;
};

export function LoanTable({
  isAdmin = false,
  loans,
  onApprove,
  onReject,
}: LoanTableProps) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            {isAdmin ? <th>Applicant</th> : null}
            <th>Date</th>
            <th>Amount</th>
            <th>Term</th>
            <th>Rate</th>
            <th>Monthly</th>
            <th>Repayment</th>
            <th>Status</th>
            {isAdmin ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, index) => (
            <tr key={loan.id}>
              <td>{index + 1}</td>
              {isAdmin ? <td>{loan.user?.name ?? "Unknown"}</td> : null}
              <td>{formatDisplayDate(loan.createdAt)}</td>
              <td>{formatPhilippinePeso(loan.amount)}</td>
              <td>{loan.termMonths} Months</td>
              <td>{(Number(loan.interestRate) * 100).toFixed(0)}%</td>
              <td>{formatPhilippinePeso(loan.monthlyPayment)}</td>
              <td>{formatPhilippinePeso(loan.totalRepayment)}</td>
              <td>
                <Badge status={loan.status} />
              </td>
              {isAdmin ? (
                <td className="actions">
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={loan.status !== "PENDING"}
                    onClick={() => onApprove?.(loan.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    disabled={loan.status !== "PENDING"}
                    onClick={() => onReject?.(loan.id)}
                  >
                    Reject
                  </Button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
