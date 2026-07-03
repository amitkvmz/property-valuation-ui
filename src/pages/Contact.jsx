import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Breadcrumbs from '../components/Breadcrumbs';
import apiClient from '../services/apiClient';

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const submit = async (values) => {
    try {
      await apiClient.post('/contact', values);
      toast.success('Your message has been sent.');
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to send message.');
    }
  };
  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Contact', active: true }]} />
        <div className="row g-4">
          <div className="col-lg-6">
            <span className="eyebrow">Contact us</span>
            <h1>Speak with our valuation desk</h1>
            <p className="lead">For application support, report questions, or institutional valuation assignments, our office team can help.</p>
            <div className="contact-list">
              <p><strong>Office:</strong> 4th Floor, Business Square, Pune, India</p>
              <p><strong>Email:</strong> support@primevalue.example</p>
              <p><strong>Phone:</strong> +91 20 4000 1200</p>
            </div>
            <iframe title="Office map" className="map-frame" src="https://maps.google.com/maps?q=Pune&t=&z=12&ie=UTF8&iwloc=&output=embed" />
          </div>
          <div className="col-lg-6">
            <form className="content-card vstack gap-3" onSubmit={handleSubmit(submit)}>
              <h3>Send a message</h3>
              <input className="form-control" placeholder="Name" {...register('name', { required: true })} />
              <input className="form-control" placeholder="Email" type="email" {...register('email', { required: true })} />
              <textarea className="form-control" rows="5" placeholder="How can we help?" {...register('message', { required: true })} />
              <button className="btn btn-primary align-self-start">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
