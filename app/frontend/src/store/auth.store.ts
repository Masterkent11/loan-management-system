import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CurrentUser } from "@loan-management/shared";

type AuthState = {
  token: string | null;
  user: CurrentUser | null;
  setSession: (session: { token: string; user: CurrentUser }) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: ({ token, user }) => set({ token, user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    {
      name: "loan-management-auth",
    },
  ),
);
