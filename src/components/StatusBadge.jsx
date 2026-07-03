const styles = {
  Completed: 'success',
  Pending: 'warning',
  Paid: 'success',
  'Payment Pending': 'warning',
  Submitted: 'info',
};

export default function StatusBadge({ status }) {
  return <span className={`badge rounded-pill text-bg-${styles[status] || 'secondary'}`}>{status}</span>;
}
