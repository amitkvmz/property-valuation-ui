import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaBuilding, FaUserShield } from 'react-icons/fa';
import { APP_NAME } from '../constants/app';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-white border-bottom">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span className="brand-mark"><FaBuilding /></span>
          <span>{APP_NAME}</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Toggle navigation">
          <FaBars />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/apply">Apply</NavLink>
            <NavLink className="nav-link" to="/track">Track</NavLink>
            <NavLink className="nav-link" to="/about">About</NavLink>
            <NavLink className="nav-link" to="/contact">Contact</NavLink>
            <NavLink className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-2 mt-2 mt-lg-0" to="/admin">
              <FaUserShield /> Admin
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
