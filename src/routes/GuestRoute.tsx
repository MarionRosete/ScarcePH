import { Navigate, Outlet } from "react-router";
import { useAuthCheck } from "@/features/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import LoadingScreen from "@/features/LoadingScreen";

export function GuestRoute() {
  const { data: user, isLoading } = useAuthCheck();

  const [delay, setDelay] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDelay(true), 3000)
    return () => clearTimeout(timer)
  }, [])
  
  if (isLoading) {
    return <LoadingScreen 
      msg={
        delay
          ? "Server is waking up (free tier). Almost there…"
          : "Checking authentication…"
      } 
    />
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet/>
}
