import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import LoadingScreen from '@/pages/LoadingScreen';
import { useEffect, useState } from 'react';


export const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

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

 
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/"
      replace
      state={{ from: location }} 
    />
  );
};