import Breadcrumbs from '../components/Breadcrumbs';

export function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" body={['We collect applicant, property, document, and location details only for valuation workflow purposes.', 'Uploaded files and application data are intended for secure backend storage once integrated with Spring Boot services.', 'Mock data in this frontend is for demonstration and does not transmit private information to a production backend.']} />;
}

export function Terms() {
  return <LegalPage title="Terms & Conditions" body={['Submitted information must be accurate and complete for report processing.', 'Valuation timelines may vary based on document clarity, inspection availability, and payment completion.', 'Final reports are released through the portal after applicable payment and administrative approval.']} />;
}

function LegalPage({ title, body }) {
  return (
    <section className="section">
      <div className="container narrow">
        <Breadcrumbs items={[{ label: title, active: true }]} />
        <div className="content-card">
          <h1>{title}</h1>
          {body.map((text) => <p key={text}>{text}</p>)}
        </div>
      </div>
    </section>
  );
}
