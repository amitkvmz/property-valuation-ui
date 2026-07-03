import { Link } from 'react-router-dom';
import useMockQuery from '../../hooks/useMockQuery';
import { orderService } from '../../services/orderService';
import Skeleton from '../../components/Skeleton';
import StatusBadge from '../../components/StatusBadge';

export default function Orders() {
  const { data: orders, loading, error } = useMockQuery(orderService.list, []);
  return (
    <>
      <div className="admin-header"><h1>Orders</h1><p>Review, edit, and manage valuation requests.</p></div>
      <div className="admin-card">
        {loading ? <Skeleton rows={4} /> : error ? <div className="alert alert-danger">{error}</div> : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead><tr><th>Tracking ID</th><th>Customer</th><th>Status</th><th>Payment Status</th><th>Actions</th></tr></thead>
              <tbody>
                {(orders || []).map((order) => (
                  <tr key={order.id}>
                    <td>{order.trackingId}</td>
                    <td>{order.customer}</td>
                    <td><StatusBadge status={order.status} /></td>
                    <td><StatusBadge status={order.paymentStatus} /></td>
                    <td><Link className="btn btn-sm btn-outline-primary" to={`/admin/orders/${order.id}`}>View / Edit</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="pagination-row"><button className="btn btn-light btn-sm">Previous</button><span>Page 1 of 1</span><button className="btn btn-light btn-sm">Next</button></div>
      </div>
    </>
  );
}
