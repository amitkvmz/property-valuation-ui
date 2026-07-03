import { FaCheck, FaClock } from 'react-icons/fa6';

export default function Timeline({ items = [] }) {
  return (
    <div className="timeline">
      {items.map((item, index) => (
        <div className="timeline-item" key={`${item.status}-${index}`}>
          <div className="timeline-icon">{index === items.length - 1 ? <FaClock /> : <FaCheck />}</div>
          <div>
            <h6>{item.status}</h6>
            <p className="small text-muted mb-1">{item.timestamp}</p>
            <p className="mb-0">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
