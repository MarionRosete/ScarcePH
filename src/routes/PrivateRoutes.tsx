import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import LoadingScreen from '@/pages/LoadingScreen';


export const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();


  if (isLoading) {
    return <LoadingScreen msg={"Loading authentication status… "}/>
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