export default function Loader({ fullPage = false }) {
  return (
    <div className={fullPage ? 'loader-page' : 'py-4 text-center'}>
      <div className="spinner-border text-primary" role="status" aria-label="Loading" />
    </div>
  );
}
