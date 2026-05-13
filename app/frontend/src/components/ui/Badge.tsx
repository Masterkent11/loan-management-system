import type { LoanStatus } from "@loan-management/shared";

type BadgeProps = {
  status: LoanStatus;
};

export function Badge({ status }: BadgeProps) {
  return (
    <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>
  );
}
