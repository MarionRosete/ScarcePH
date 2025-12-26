import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";
import LoadingScreen from "@/pages/LoadingScreen";

export const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return  <LoadingScreen msg={"Loading authentication status… "}/>
  return isAuthenticated
    ? <Navigate to="/dashboard" replace />
    : <Outlet />;
};
