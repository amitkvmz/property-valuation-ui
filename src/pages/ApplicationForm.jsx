import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import Breadcrumbs from '../components/Breadcrumbs';
import FileUpload from '../components/FileUpload';
import { paymentModes } from '../constants/app';
import { orderService } from '../services/orderService';
import { formatCurrency } from '../utils/formatters';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  mobile: yup.string().min(10, 'Enter a valid mobile number').required('Mobile is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  pinCode: yup.string().matches(/^[0-9]{6}$/, 'PIN code must be 6 digits').required('PIN code is required'),
  propertyType: yup.string().required('Property type is required'),
  propertyAddress: yup.string().required('Property address is required'),
  area: yup.string().required('Area is required'),
  ownershipType: yup.string().required('Ownership type is required'),
  purpose: yup.string().required('Purpose is required'),
  paymentMode: yup.string().required('Payment mode is required'),
  uploadedDocuments: yup.array().min(1, 'At least one document is required'),
  declaration: yup.boolean().oneOf([true], 'Declaration is required'),
});

export default function ApplicationForm() {
  const navigate = useNavigate();
  const [coords, setCoords] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { paymentMode: 'pay_on_report', uploadedDocuments: [] },
  });
  const selectedPayment = paymentModes.find((mode) => mode.value === watch('paymentMode')) || paymentModes[0];

  const useLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not available in this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const next = { latitude: position.coords.latitude.toFixed(6), longitude: position.coords.longitude.toFixed(6) };
      setCoords(next);
      setValue('latitude', next.latitude);
      setValue('longitude', next.longitude);
      toast.success('Location captured.');
    }, () => toast.error('Unable to fetch location.'));
  };

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const result = await orderService.create({ ...values, coords });
      toast.success('Application submitted successfully.');
      navigate('/success', { state: { trackingId: result.trackingId } });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Apply', active: true }]} />
        <div className="form-shell">
          <div className="form-intro">
            <span className="eyebrow">Apply online</span>
            <h1>Property valuation application</h1>
            <p>Complete each section carefully. Your submission is stored through mock APIs and is ready for Spring Boot integration.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="vstack gap-4">
            <FormSection title="Personal Details">
              <Input label="Name" name="name" register={register} error={errors.name} />
              <Input label="Email" name="email" type="email" register={register} error={errors.email} />
              <Input label="Mobile" name="mobile" register={register} error={errors.mobile} />
              <Input label="Address" name="address" register={register} error={errors.address} wide />
              <Input label="City" name="city" register={register} error={errors.city} />
              <Input label="State" name="state" register={register} error={errors.state} />
              <Input label="PIN Code" name="pinCode" register={register} error={errors.pinCode} />
            </FormSection>

            <FormSection title="Property Details">
              <Select label="Property Type" name="propertyType" register={register} error={errors.propertyType} options={['Residential', 'Commercial', 'Industrial', 'Agricultural']} />
              <Input label="Property Address" name="propertyAddress" register={register} error={errors.propertyAddress} wide />
              <Input label="Area" name="area" register={register} error={errors.area} />
              <Input label="Ownership Type" name="ownershipType" register={register} error={errors.ownershipType} />
              <Input label="Purpose of Valuation" name="purpose" register={register} error={errors.purpose} wide />
            </FormSection>

            <FormSection title="Upload Documents">
              <div className="col-12">
                <FileUpload
                  error={errors.uploadedDocuments}
                  onChange={(files) => setValue('uploadedDocuments', files, { shouldValidate: true })}
                />
              </div>
            </FormSection>

            <FormSection title="Geo Location">
              <div className="col-12">
                <button type="button" className="btn btn-outline-primary" onClick={useLocation}><FaLocationCrosshairs /> Use Current Location</button>
              </div>
              <Input label="Latitude" name="latitude" register={register} readOnly />
              <Input label="Longitude" name="longitude" register={register} readOnly />
              {coords && <div className="col-12"><iframe title="Property location" className="map-frame" src={`https://maps.google.com/maps?q=${coords.latitude},${coords.longitude}&z=15&output=embed`} /></div>}
            </FormSection>

            <FormSection title="Payment Mode">
              <div className="col-lg-7">
                <div className="vstack gap-2">
                  {paymentModes.map((mode) => (
                    <label className="radio-card" key={mode.value}>
                      <input type="radio" value={mode.value} {...register('paymentMode')} />
                      <span>{mode.label}</span>
                      <strong>{mode.amount ? formatCurrency(mode.amount) : 'No upfront payment'}</strong>
                    </label>
                  ))}
                </div>
                {errors.paymentMode && <div className="text-danger small mt-2">{errors.paymentMode.message}</div>}
              </div>
              <div className="col-lg-5"><div className="summary-card"><h5>Payment Summary</h5><p>{selectedPayment.label}</p><strong>{formatCurrency(selectedPayment.amount)}</strong></div></div>
            </FormSection>

            <div className="declaration-box">
              <label><input type="checkbox" {...register('declaration')} /> I confirm the information submitted is accurate and authorize document verification.</label>
              {errors.declaration && <div className="text-danger small mt-2">{errors.declaration.message}</div>}
            </div>
            <button className="btn btn-primary btn-lg align-self-start" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Application'}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function FormSection({ title, children }) {
  return <section className="form-section"><h3>{title}</h3><div className="row g-3">{children}</div></section>;
}

function Input({ label, name, register, error, wide = false, type = 'text', readOnly = false }) {
  return (
    <div className={wide ? 'col-12' : 'col-md-6 col-lg-4'}>
      <label className="form-label">{label}</label>
      <input className={`form-control ${error ? 'is-invalid' : ''}`} type={type} readOnly={readOnly} {...register(name)} />
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
}

function Select({ label, name, register, error, options }) {
  return (
    <div className="col-md-6 col-lg-4">
      <label className="form-label">{label}</label>
      <select className={`form-select ${error ? 'is-invalid' : ''}`} {...register(name)}>
        <option value="">Select</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
}
