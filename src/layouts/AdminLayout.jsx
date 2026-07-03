import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Sidebar from '../components/Sidebar';

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <Outlet />
      </main>
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}
