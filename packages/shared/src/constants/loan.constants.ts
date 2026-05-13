export const LOAN_TERMS = {
  THREE_MONTHS: 3,
  SIX_MONTHS: 6,
  TWELVE_MONTHS: 12,
} as const;

export const LOAN_TERM_OPTIONS = [
  LOAN_TERMS.THREE_MONTHS,
  LOAN_TERMS.SIX_MONTHS,
  LOAN_TERMS.TWELVE_MONTHS,
] as const;

export const LOAN_INTEREST_RATES = {
  3: 0.03,
  6: 0.06,
  12: 0.12,
} as const;
