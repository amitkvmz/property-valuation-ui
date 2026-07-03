import { FaTriangleExclamation } from 'react-icons/fa6';

export default function ErrorState({ title = 'Something went wrong', message = 'Please try again in a moment.' }) {
  return (
    <div className="error-state">
      <FaTriangleExclamation />
      <h5>{title}</h5>
      <p>{message}</p>
    </div>
  );
}
