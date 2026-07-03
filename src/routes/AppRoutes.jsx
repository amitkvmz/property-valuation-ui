import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

const Home = lazy(() => import('../pages/Home'));
const ApplicationForm = lazy(() => import('../pages/ApplicationForm'));
const Success = lazy(() => import('../pages/Success'));
const TrackApplication = lazy(() => import('../pages/TrackApplication'));
const Contact = lazy(() => import('../pages/Contact'));
const About = lazy(() => import('../pages/About'));
const NotFound = lazy(() => import('../pages/NotFound'));
const AdminLogin = lazy(() => import('../pages/admin/Login'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const Orders = lazy(() => import('../pages/admin/Orders'));
const OrderDetails = lazy(() => import('../pages/admin/OrderDetails'));
const PolicyModule = lazy(() => import('../pages/Policy').then((module) => ({ default: module.PrivacyPolicy })));
const TermsModule = lazy(() => import('../pages/Policy').then((module) => ({ default: module.Terms })));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="apply" element={<ApplicationForm />} />
        <Route path="success" element={<Success />} />
        <Route path="track" element={<TrackApplication />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="privacy" element={<PolicyModule />} />
        <Route path="terms" element={<TermsModule />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="login" element={<AdminLogin />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetails />} />
      </Route>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
