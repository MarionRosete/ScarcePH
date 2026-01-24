import { Navigate, Outlet } from "react-router";
import LoadingScreen from "@/features/LoadingScreen";
import { useEffect, useState } from "react";
import { useAuthCheck } from "@/features/auth/hooks/useAuth";

export const AdminRoute: React.FC = () => {
  const {data, isLoading } = useAuthCheck();
  const [delay, setDelay] = useState(false);

  

  useEffect(() => {
    const timer = setTimeout(() => setDelay(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen
        msg={
          delay
            ? "Server is waking up (free tier). Almost there…"
            : "Checking authentication…"
        }
      />
    );
  }

  if (!data || data.user?.role !== "super_admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
