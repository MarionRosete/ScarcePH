import { Navigate, Outlet } from "react-router";
import { useAuthCheck } from "@/features/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import LoadingScreen from "@/features/LoadingScreen";

export function GuestRoute() {
  const { data: user, isLoading } = useAuthCheck();

  const [delay, setDelay] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setDelay(false)
      return
    }

    const timer = setTimeout(() => setDelay(true), 3000)
    return () => clearTimeout(timer)
  }, [isLoading])
  
  if (isLoading) {
    return <LoadingScreen 
      msg={
        delay
          ? "Establishing a secure connection…"
          : "Getting things ready…"
      } 
    />
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet/>
}
