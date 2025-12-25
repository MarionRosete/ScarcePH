import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router';
import { PrivateRoute } from '@/routes/PrivateRoutes';
import { PublicRoute } from './PublicRoute';
const Dashboard = lazy(() => import('@/pages/dashboard'));
const Login = lazy(() => import('@/pages/login'));
const PageNotFound = lazy(()=> import('@/pages/notfound'));

export default function LazyRoutes() {
  return (
    <Suspense fallback={<div>Loading module…</div>}>
      <Routes>

       
        <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}