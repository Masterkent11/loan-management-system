import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { clearUserScopedCache } from "../../../lib/query-client";
import { useAuthStore } from "../../../store/auth.store";
import { authApi } from "../services/auth.service";

const getRedirectRoute = (role: "USER" | "ADMIN") =>
  role === "ADMIN" ? ROUTES.adminDashboard : ROUTES.userDashboard;

export function useLoginMutation() {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (session) => {
      clearUserScopedCache();
      setSession(session);
      navigate(getRedirectRoute(session.user.role), { replace: true });
    },
  });
}

export function useRegisterMutation() {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (session) => {
      clearUserScopedCache();
      setSession(session);
      navigate(getRedirectRoute(session.user.role), { replace: true });
    },
  });
}
