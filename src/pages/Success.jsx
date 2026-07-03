import { Link, useLocation } from 'react-router-dom';
import { FaCircleCheck } from 'react-icons/fa6';

export default function Success() {
  const { state } = useLocation();
  const trackingId = state?.trackingId || 'PV-2026-1042';

  return (
    <section className="section">
      <div className="container">
        <div className="success-card">
          <FaCircleCheck className="success-icon" />
          <h1>Application submitted</h1>
          <p>Your confirmation email has been sent. Use this tracking ID to follow every update.</p>
          <div className="tracking-code">{trackingId}</div>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link className="btn btn-primary" to="/track">Track Application</Link>
            <Link className="btn btn-light" to="/">Return Home</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
