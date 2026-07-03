import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaDownload, FaLock, FaMagnifyingGlass, FaUnlock } from 'react-icons/fa6';
import Breadcrumbs from '../components/Breadcrumbs';
import StatusBadge from '../components/StatusBadge';
import Timeline from '../components/Timeline';
import Skeleton from '../components/Skeleton';
import { orderService } from '../services/orderService';
import { formatCurrency } from '../utils/formatters';

export default function TrackApplication() {
  const [trackingId, setTrackingId] = useState('PV-2026-1042');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const search = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      setOrder(await orderService.getByTrackingId(trackingId));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const pay = async () => {
    const result = await orderService.pay(order.trackingId);
    setOrder((current) => ({ ...current, ...result, paymentStatus: 'Paid', amountDue: 0 }));
    setShowPayment(false);
    toast.success('Payment successful. Report unlocked.');
  };

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Track Application', active: true }]} />
        <div className="section-heading"><span className="eyebrow">Application status</span><h1>Track your valuation request</h1></div>
        <form className="track-search" onSubmit={search}>
          <input className="form-control form-control-lg" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} placeholder="Enter tracking ID" />
          <button className="btn btn-primary btn-lg"><FaMagnifyingGlass /> Track</button>
        </form>
        {loading && <div className="mt-4"><Skeleton rows={5} /></div>}
        {error && <div className="alert alert-danger mt-4">{error}</div>}
        {order && (
          <div className="row g-4 mt-2">
            <div className="col-lg-8">
              <div className="content-card">
                <div className="d-flex justify-content-between flex-wrap gap-2 mb-4">
                  <div><p className="text-muted mb-1">Tracking ID</p><h3>{order.trackingId}</h3></div>
                  <StatusBadge status={order.status} />
                </div>
                <Timeline items={order.timeline} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="content-card vstack gap-3">
                <h4>Report Access</h4>
                {order.reportUploaded ? (
                  order.reportUnlocked ? (
                    <>
                      <div className="report-state unlocked"><FaUnlock /> Report Unlocked</div>
                      <button className="btn btn-success"><FaDownload /> Download Report</button>
                      <div><strong>Firm Remarks</strong><p className="mb-0">{order.remarks}</p></div>
                    </>
                  ) : (
                    <>
                      <div className="report-state locked"><FaLock /> Report Locked</div>
                      <p>Payment pending: {formatCurrency(order.amountDue)}</p>
                      <button className="btn btn-accent" onClick={() => setShowPayment(true)}>Unlock Report</button>
                    </>
                  )
                ) : <p className="text-muted">Report has not been uploaded yet.</p>}
              </div>
            </div>
          </div>
        )}
      </div>
      {showPayment && (
        <div className="modal-backdrop-custom">
          <div className="modal-card">
            <h4>Mock Payment</h4>
            <p>Complete a simulated payment of {formatCurrency(order.amountDue)} to unlock the report.</p>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-light" onClick={() => setShowPayment(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={pay}>Pay Now</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
