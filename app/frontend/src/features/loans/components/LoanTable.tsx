import type { Loan } from "@loan-management/shared";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";

type LoanTableProps = {
  loans: Loan[];
  isAdmin?: boolean;
  onApprove?: (loanId: string) => void;
  onReject?: (loanId: string) => void;
};

const money = (value: number | string) => `$${Number(value).toLocaleString()}`;

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
            {isAdmin ? <th>Applicant</th> : null}
            <th>Amount</th>
            <th>Term</th>
            <th>Monthly</th>
            <th>Total</th>
            <th>Status</th>
            {isAdmin ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              {isAdmin ? <td>{loan.user?.name ?? "Unknown"}</td> : null}
              <td>{money(loan.amount)}</td>
              <td>{loan.termMonths} months</td>
              <td>{money(loan.monthlyPayment)}</td>
              <td>{money(loan.totalRepayment)}</td>
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
