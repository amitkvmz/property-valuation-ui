import { Link } from 'react-router-dom';
import { FaArrowRight, FaClipboardCheck, FaFileInvoice, FaHouseChimney, FaLocationDot, FaShieldHalved } from 'react-icons/fa6';
import { faqs } from '../mock/faqs';
import { testimonials } from '../mock/testimonials';

const services = ['Residential valuation', 'Commercial valuation', 'Industrial assets', 'Agricultural land', 'Loan and mortgage reports', 'Legal and tax valuation'];

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="eyebrow">Certified valuation workflow</span>
              <h1>Property valuation made transparent, fast, and professionally managed.</h1>
              <p>Apply online, upload documents, track inspections, and unlock your final report through a polished digital process built for serious property decisions.</p>
              <div className="d-flex flex-wrap gap-3">
                <Link className="btn btn-accent btn-lg" to="/apply">Apply for Valuation <FaArrowRight /></Link>
                <Link className="btn btn-outline-light btn-lg" to="/track">Track Application</Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="hero-panel">
                <div><strong>1,850+</strong><span>Reports issued</span></div>
                <div><strong>72 hr</strong><span>Typical turnaround</span></div>
                <div><strong>98%</strong><span>Client satisfaction</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Our services</span>
            <h2>Valuations for every property decision</h2>
          </div>
          <div className="row g-3">
            {services.map((service) => (
              <div className="col-md-6 col-lg-4" key={service}>
                <div className="service-card"><FaHouseChimney /><h5>{service}</h5><p>Structured review, document checks, inspection notes, and report-ready valuation outputs.</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft-band">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5">
              <span className="eyebrow">Why choose us</span>
              <h2>Built for trust, speed, and auditability.</h2>
              <p className="lead">Our portal keeps applicants, administrators, and valuation teams aligned from submission through final report delivery.</p>
            </div>
            <div className="col-lg-7">
              <div className="row g-3">
                {[
                  [FaShieldHalved, 'Verified process', 'Mandatory document, status, and declaration controls.'],
                  [FaLocationDot, 'Geo-enabled', 'Capture location and view coordinates directly in the application.'],
                  [FaFileInvoice, 'Report access', 'Locked reports can be unlocked after mock payment completion.'],
                  [FaClipboardCheck, 'Admin ready', 'Manage orders, statuses, remarks, and final report uploads.'],
                ].map(([Icon, title, text]) => (
                  <div className="col-sm-6" key={title}><div className="feature-card"><Icon /><h5>{title}</h5><p>{text}</p></div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading"><span className="eyebrow">How it works</span><h2>From application to report in four steps</h2></div>
          <div className="process-grid">
            {['Submit application', 'Upload documents', 'Inspection and review', 'Pay and download'].map((step, index) => (
              <div className="process-step" key={step}><span>{index + 1}</span><h5>{step}</h5><p>Clear progress updates keep every stakeholder informed.</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft-band">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="section-heading text-start"><span className="eyebrow">Testimonials</span><h2>Clients value the clarity.</h2></div>
              <div className="vstack gap-3">
                {testimonials.map((item) => <div className="quote-card" key={item.name}><p>"{item.quote}"</p><strong>{item.name}</strong><span>{item.role}</span></div>)}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="section-heading text-start"><span className="eyebrow">FAQ</span><h2>Common questions</h2></div>
              <div className="accordion" id="faq">
                {faqs.map((item, index) => (
                  <div className="accordion-item" key={item.question}>
                    <h3 className="accordion-header"><button className={`accordion-button ${index ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#faq-${index}`}>{item.question}</button></h3>
                    <div id={`faq-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#faq"><div className="accordion-body">{item.answer}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
