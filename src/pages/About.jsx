import Breadcrumbs from '../components/Breadcrumbs';

export default function About() {
  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: 'About', active: true }]} />
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <span className="eyebrow">About PrimeValue</span>
            <h1>Independent valuation expertise with a modern client experience.</h1>
            <p className="lead">We support financial institutions, legal professionals, developers, and individual owners with dependable valuation reports and clear operational workflows.</p>
          </div>
          <div className="col-lg-6">
            <div className="stats-grid">
              <div><strong>12+</strong><span>Years experience</span></div>
              <div><strong>40+</strong><span>City coverage</span></div>
              <div><strong>8k+</strong><span>Assets reviewed</span></div>
              <div><strong>24/7</strong><span>Portal access</span></div>
            </div>
          </div>
        </div>
        <div className="row g-4 mt-4">
          <div className="col-md-6"><div className="content-card"><h3>Mission</h3><p>To make property valuation accurate, transparent, and easier to coordinate for every stakeholder.</p></div></div>
          <div className="col-md-6"><div className="content-card"><h3>Vision</h3><p>To become the most trusted digital valuation operations partner for property decisions across India.</p></div></div>
        </div>
      </div>
    </section>
  );
}
