import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { clearUserScopedCache } from "../../../lib/query-client";
import { useAuthStore } from "../../../store/auth.store";

export function useSignOut() {
  const navigate = useNavigate();
  const clearSession = useAuthStore((state) => state.clearSession);

  return () => {
    clearSession();
    clearUserScopedCache();
    navigate(ROUTES.login, { replace: true });
  };
}
