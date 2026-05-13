import { Navigate, Outlet } from "react-router-dom";
import type { UserRole } from "@loan-management/shared";
import { ROUTES } from "../constants/routes";
import { useAuthStore } from "../store/auth.store";

type ProtectedRouteProps = {
  allowedRoles: UserRole[];
};

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { token, user } = useAuthStore();

  if (!token || !user) {
    return <Navigate to={ROUTES.login} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to={
          user.role === "ADMIN" ? ROUTES.adminDashboard : ROUTES.userDashboard
        }
        replace
      />
    );
  }

  return <Outlet />;
}
