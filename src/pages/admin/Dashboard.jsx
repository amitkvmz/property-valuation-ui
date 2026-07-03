import { FaClipboardList, FaHourglassHalf, FaIndianRupeeSign, FaSquareCheck } from 'react-icons/fa6';
import useMockQuery from '../../hooks/useMockQuery';
import { orderService } from '../../services/orderService';
import StatusBadge from '../../components/StatusBadge';
import Skeleton from '../../components/Skeleton';
import { formatCurrency } from '../../utils/formatters';

export default function Dashboard() {
  const { data: orders, loading, error } = useMockQuery(orderService.list, []);
  const stats = orders ? [
    ['Total Orders', orders.length, FaClipboardList],
    ['Pending', orders.filter((o) => o.status !== 'Completed').length, FaHourglassHalf],
    ['Completed', orders.filter((o) => o.status === 'Completed').length, FaSquareCheck],
    ['Revenue', formatCurrency(orders.reduce((sum, order) => sum + order.revenue, 0)), FaIndianRupeeSign],
  ] : [];

  return (
    <>
      <div className="admin-header"><h1>Dashboard</h1><p>Operational overview for valuation orders.</p></div>
      {loading ? <Skeleton rows={4} /> : error ? <div className="alert alert-danger">{error}</div> : (
        <>
          <div className="admin-stats">
            {stats.map(([label, value, Icon]) => <div className="stat-card" key={label}><Icon /><span>{label}</span><strong>{value}</strong></div>)}
          </div>
          <div className="admin-card">
            <h3>Recent Orders</h3>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead><tr><th>Tracking ID</th><th>Customer</th><th>Status</th><th>Payment</th></tr></thead>
                <tbody>{(orders || []).map((order) => <tr key={order.id}><td>{order.trackingId}</td><td>{order.customer}</td><td><StatusBadge status={order.status} /></td><td><StatusBadge status={order.paymentStatus} /></td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
