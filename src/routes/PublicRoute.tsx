import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";

export const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return isAuthenticated
    ? <Navigate to="/dashboard" replace />
    : <Outlet />;
};
