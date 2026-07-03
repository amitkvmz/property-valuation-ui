import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <EmptyState title="Page not found" message="The page you are looking for is unavailable." />
        <div className="text-center mt-3"><Link className="btn btn-primary" to="/">Return Home</Link></div>
      </div>
    </section>
  );
}
