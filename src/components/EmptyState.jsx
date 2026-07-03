import { FaInbox } from 'react-icons/fa6';

export default function EmptyState({ title = 'No records found', message = 'Try changing your search criteria.' }) {
  return (
    <div className="empty-state">
      <FaInbox />
      <h5>{title}</h5>
      <p>{message}</p>
    </div>
  );
}
