export default function ConfirmDialog({ show, title, message, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="modal-backdrop-custom">
      <div className="modal-card" role="dialog" aria-modal="true">
        <h5>{title}</h5>
        <p>{message}</p>
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-light" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
