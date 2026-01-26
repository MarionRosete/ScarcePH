import { Navigate, Outlet } from 'react-router';
import LoadingScreen from '@/features/LoadingScreen';
import { useEffect, useState } from 'react';
import { useAuthCheck } from '@/features/auth/hooks/useAuth';
import { PublicHeader  } from '@/features/public/PublicHeader';
import { UserHeader } from '@/features/public/UserHeader';


export const Header: React.FC = () => {
  const { data, isLoading } = useAuthCheck();

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

  if (data?.user?.role === "super_admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

 
  return  (
    <div className="flex h-screen w-screen">
        <div className="m-5 w-full h-full">
         { data?.user?.role === "user" ?  
          <UserHeader user={data.user.email} /> 
          : 
          <PublicHeader/>

        }
          <Outlet/>
        </div>
    </div>
  ) 
};


