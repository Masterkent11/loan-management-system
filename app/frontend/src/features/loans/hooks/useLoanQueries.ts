import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loanApi } from "../services/loan.service";

export const loanQueryKeys = {
  myLoans: ["loans", "mine"] as const,
  allLoans: ["loans", "all"] as const,
};

export function useMyLoansQuery() {
  return useQuery({
    queryKey: loanQueryKeys.myLoans,
    queryFn: loanApi.getMyLoans,
  });
}

export function useAllLoansQuery() {
  return useQuery({
    queryKey: loanQueryKeys.allLoans,
    queryFn: loanApi.getAllLoans,
  });
}

export function useCreateLoanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loanApi.createLoan,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: loanQueryKeys.myLoans });
    },
  });
}

export function useApproveLoanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loanApi.approveLoan,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: loanQueryKeys.allLoans });
    },
  });
}

export function useRejectLoanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loanApi.rejectLoan,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: loanQueryKeys.allLoans });
    },
  });
}
