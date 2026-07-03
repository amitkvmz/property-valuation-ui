export default function Skeleton({ rows = 3 }) {
  return (
    <div className="vstack gap-3" aria-label="Loading content">
      {Array.from({ length: rows }).map((_, index) => <div className="skeleton-line" key={index} />)}
    </div>
  );
}
