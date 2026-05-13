import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useAuthStore } from "../store/auth.store";

export function GuestRoute() {
  const { token, user } = useAuthStore();

  if (token && user) {
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
