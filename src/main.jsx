import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import './styles/theme.css';
import AppRoutes from './routes/AppRoutes';
import Loader from './components/Loader';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loader fullPage />}>
        <AppRoutes />
        <Heartbeat />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
