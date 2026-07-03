import { NavLink } from 'react-router-dom';
import { FaChartLine, FaClipboardList, FaGauge, FaRightToBracket } from 'react-icons/fa6';

export default function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <NavLink to="/admin" end><FaGauge /> Dashboard</NavLink>
      <NavLink to="/admin/orders"><FaClipboardList /> Orders</NavLink>
      <NavLink to="/admin/login"><FaRightToBracket /> Mock Login</NavLink>
      <a href="/track"><FaChartLine /> Public Tracking</a>
    </aside>
  );
}
