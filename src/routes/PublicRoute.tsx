// import { Navigate, Outlet } from "react-router";
// import { useAuth } from "@/context/AuthContext";
// import LoadingScreen from "@/pages/LoadingScreen";
// import { useEffect, useState } from "react";

// export const PublicRoute = () => {
//   const { isAuthenticated, isLoading } = useAuth();

//     const [delay, setDelay] = useState(false)
  
//     useEffect(() => {
//       const timer = setTimeout(() => setDelay(true), 3000)
//       return () => clearTimeout(timer)
//     }, [])

//   if (isLoading) return  <LoadingScreen 
//       msg={
//         delay
//           ? "Server is waking up (free tier). Almost there…"
//           : "Checking authentication…"
//       } 
//     />
//   return isAuthenticated
//     ? <Navigate to="/dashboard" replace />
//     : <Outlet />;
// };
