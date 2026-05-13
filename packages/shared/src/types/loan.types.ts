export type LoanTermMonths = 3 | 6 | 12;

export type LoanStatus = "PENDING" | "APPROVED" | "REJECTED";

export type LoanRepayment = {
  interestRate: number;
  monthlyPayment: number;
  totalRepayment: number;
};

export type Loan = {
  id: string;
  userId: string;
  amount: number | string;
  termMonths: number;
  interestRate: number | string;
  monthlyPayment: number | string;
  totalRepayment: number | string;
  status: LoanStatus;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
};
