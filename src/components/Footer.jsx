import { Link } from 'react-router-dom';
import { FaEnvelope, FaLocationDot, FaPhone } from 'react-icons/fa6';
import { APP_NAME } from '../constants/app';

export default function Footer() {
  return (
    <footer className="site-footer mt-5">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-5">
            <h5>{APP_NAME}</h5>
            <p className="text-white-50 mb-0">Trusted property valuation services for lending, legal, investment, and compliance decisions.</p>
          </div>
          <div className="col-sm-6 col-lg-3">
            <h6>Quick Links</h6>
            <div className="footer-links">
              <Link to="/apply">Apply for Valuation</Link>
              <Link to="/track">Track Application</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <h6>Contact</h6>
            <p><FaLocationDot /> 4th Floor, Business Square, Pune, India</p>
            <p><FaEnvelope /> support@primevalue.example</p>
            <p><FaPhone /> +91 20 4000 1200</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom py-3">
        <div className="container small">Copyright 2026 {APP_NAME}. All rights reserved.</div>
      </div>
    </footer>
  );
}
