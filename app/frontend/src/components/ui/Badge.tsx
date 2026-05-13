import type { LoanStatus } from "@loan-management/shared";

type BadgeProps = {
  status: LoanStatus;
};

const statusLabel: Record<LoanStatus, string> = {
  APPROVED: "Approved",
  PENDING: "Pending",
  REJECTED: "Rejected",
};

export function Badge({ status }: BadgeProps) {
  return (
    <span className={`badge badge-${status.toLowerCase()}`}>
      {statusLabel[status]}
    </span>
  );
}
