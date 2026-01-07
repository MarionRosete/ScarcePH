import { lazy } from 'react';
import { Routes, Route } from 'react-router';
import { PrivateRoute } from '@/routes/PrivateRoutes';
import { PublicRoute } from './PublicRoute';
import Layout from '@/Layout';
import Dashboard from '@/pages/dashboard';
import Inventory from '@/pages/Inventory/Inventory';
import OrderPage from '@/pages/Orders/OrderPage';

const Login = lazy(() => import('@/pages/login'));
const PageNotFound = lazy(()=> import('@/pages/notfound'));


export default function LazyRoutes() {
  return (
   
      <Routes>
        <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<Layout/>}>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/orders" element={<OrderPage/>}/>
            <Route path='/pairs' element={<Inventory/>}/>
          </Route>
        </Route>

        <Route path='*' element={<PageNotFound />} />
      </Routes>
  );
}