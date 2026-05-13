import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { AdminDashboardPage } from "../features/dashboard/admin/AdminDashboardPage";
import { UserDashboardPage } from "../features/dashboard/user/UserDashboardPage";
import { GuestRoute } from "./guest-route";
import { ProtectedRoute } from "./protected-route";

export const appRouter = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      { path: ROUTES.login, element: <LoginPage /> },
      { path: ROUTES.register, element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={["USER"]} />,
    children: [{ path: ROUTES.userDashboard, element: <UserDashboardPage /> }],
  },
  {
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      { path: ROUTES.adminDashboard, element: <AdminDashboardPage /> },
    ],
  },
  { path: "*", element: <Navigate to={ROUTES.login} replace /> },
]);
