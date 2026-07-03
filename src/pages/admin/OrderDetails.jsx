import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orders } from '../../mock/orders';
import Timeline from '../../components/Timeline';
import StatusBadge from '../../components/StatusBadge';
import { statusOptions } from '../../constants/app';

export default function OrderDetails() {
  const { id } = useParams();
  const order = useMemo(() => orders.find((item) => String(item.id) === id) || orders[0], [id]);
  const [status, setStatus] = useState(order.status);
  const save = () => toast.success('Order changes saved through mock service.');
  const email = () => toast.success('Generated mock customer email.');

  return (
    <>
      <div className="admin-header"><h1>Order Details</h1><p>{order.trackingId} <StatusBadge status={status} /></p></div>
      <div className="row g-4">
        <div className="col-lg-6"><InfoCard title="Customer Information" rows={[['Name', order.customer], ['Email', order.email], ['Mobile', order.mobile], ['Address', order.address]]} /></div>
        <div className="col-lg-6"><InfoCard title="Property Information" rows={[['Type', order.property.type], ['Address', order.property.address], ['Area', order.property.area], ['Ownership', order.property.ownership], ['Purpose', order.property.purpose]]} /></div>
        <div className="col-lg-7">
          <div className="admin-card"><h3>Status Timeline</h3><Timeline items={order.timeline} /></div>
        </div>
        <div className="col-lg-5">
          <div className="admin-card vstack gap-3">
            <h3>Manage Order</h3>
            <label className="form-label">Update Status</label>
            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>{statusOptions.map((option) => <option key={option}>{option}</option>)}</select>
            <label className="form-label">Remarks</label>
            <textarea className="form-control" rows="4" defaultValue={order.remarks} />
            <label className="form-label">Upload Final Report</label>
            <input className="form-control" type="file" accept=".pdf" />
            <div><strong>Uploaded Documents</strong><ul className="mt-2">{order.documents.map((doc) => <li key={doc}>{doc}</li>)}</ul></div>
            <div className="d-flex gap-2 flex-wrap">
              <button className="btn btn-outline-primary" onClick={email}>Generate Email</button>
              <button className="btn btn-primary" onClick={save}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoCard({ title, rows }) {
  return (
    <div className="admin-card">
      <h3>{title}</h3>
      <dl className="details-list">
        {rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
    </div>
  );
}
