import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="public-main">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
}
