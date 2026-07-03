import apiClient from './apiClient';

const toDisplayStatus = (value) => {
  switch (value) {
    case 'SUBMITTED':
      return 'Submitted';
    case 'DOCUMENTS_RECEIVED':
      return 'Documents Verified';
    case 'UNDER_REVIEW':
      return 'Inspection Scheduled';
    case 'PAYMENT_PENDING':
      return 'Payment Pending';
    case 'REPORT_PREPARING':
      return 'Report Preparation';
    case 'REPORT_UPLOADED':
      return 'Report Uploaded';
    case 'COMPLETED':
      return 'Completed';
    default:
      return value || 'Submitted';
  }
};

const toDisplayPaymentStatus = (value) => {
  switch (value) {
    case 'PAID':
      return 'Paid';
    case 'CREATED':
    case 'PENDING':
      return 'Pending';
    case 'FAILED':
      return 'Failed';
    case 'REFUNDED':
      return 'Refunded';
    default:
      return value || 'Pending';
  }
};

const normalizeOrder = (payload) => {
  const customer = payload.customer || {};
  const property = payload.property || {};
  return {
    id: payload.id,
    trackingId: payload.trackingId,
    customer: customer.name || '',
    email: customer.email || '',
    mobile: customer.mobile || '',
    address: customer.address || '',
    status: toDisplayStatus(payload.currentStatus || payload.status),
    paymentStatus: toDisplayPaymentStatus(payload.paymentStatus),
    reportUploaded: Boolean(payload.reportUploaded || payload.reportStatus || payload.downloadUrl),
    reportUnlocked: Boolean(payload.reportUnlocked || payload.locked === false),
    amountDue: payload.amountDue || 0,
    remarks: payload.remarks || '',
    timeline: payload.timeline || [],
    property: {
      type: property.propertyType || '',
      address: property.propertyAddress || '',
      area: property.area || '',
      ownership: property.ownershipType || '',
      purpose: property.purpose || '',
    },
    documents: payload.documents || [],
  };
};

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;

const toBackendPayload = (payload) => ({
  customer: {
    name: payload.name,
    email: payload.email,
    mobile: payload.mobile,
    address: payload.address,
    city: payload.city,
    state: payload.state,
    pinCode: payload.pinCode,
  },
  property: {
    propertyType: payload.propertyType?.toUpperCase?.() || payload.propertyType,
    propertyAddress: payload.propertyAddress,
    area: payload.area,
    ownershipType: payload.ownershipType,
    purpose: payload.purpose,
    latitude: payload.coords?.latitude,
    longitude: payload.coords?.longitude,
  },
  paymentMode: payload.paymentMode === 'pay_on_report' ? 'NOT_REQUIRED' : 'ONLINE',
});

export const orderService = {
  endpoints: {
    getOrder: (trackingId) => `/orders/${trackingId}`,
    createOrder: '/orders',
    adminOrders: '/admin/orders',
    paymentCreate: '/payment/create',
    paymentWebhook: '/payment/webhook',
  },
  async getByTrackingId(trackingId) {
    const [orderResponse, timelineResponse, reportResponse] = await Promise.all([
      apiClient.get(`/orders/${encodeURIComponent(trackingId)}`),
      apiClient.get(`/orders/${encodeURIComponent(trackingId)}/status`),
      apiClient.get(`/orders/${encodeURIComponent(trackingId)}/report`),
    ]);

    const order = unwrap(orderResponse);
    const timeline = unwrap(timelineResponse) || [];
    const report = unwrap(reportResponse) || {};

    if (!order?.trackingId) {
      throw new Error('No application found for this tracking ID.');
    }

    return {
      ...normalizeOrder(order),
      timeline: timeline.map((item) => ({
        title: toDisplayStatus(item.status),
        description: item.remarks || 'Updated',
        date: item.updatedAt,
      })),
      reportUploaded: Boolean(report.downloadUrl || report.remarks),
      reportUnlocked: !report.locked,
      remarks: report.remarks || '',
      downloadUrl: report.downloadUrl || '',
    };
  },
  async create(payload) {
    const response = await apiClient.post('/orders', toBackendPayload(payload));
    const order = unwrap(response);
    return { trackingId: order?.trackingId, ...payload };
  },
  async list() {
    const response = await apiClient.get('/admin/orders', { params: { page: 0, size: 50 } });
    const content = unwrap(response);
    if (Array.isArray(content)) {
      return content.map(normalizeOrder);
    }
    return (content?.content || []).map(normalizeOrder);
  },
  async update(id, payload) {
    const response = await apiClient.put(`/admin/orders/${id}/status`, payload);
    return normalizeOrder(unwrap(response));
  },
  async pay(trackingId, amountDue = 0) {
    const createResponse = await apiClient.post('/payment/create', { trackingId, amount: amountDue });
    const paymentOrder = unwrap(createResponse);
    await apiClient.post('/payment/webhook', {
      razorpayOrderId: paymentOrder.razorpayOrderId,
      razorpayPaymentId: 'mock-payment',
      signature: 'mock-signature',
      status: 'paid',
    });
    return { trackingId, paymentStatus: 'Paid', reportUnlocked: true, amountDue: 0 };
  },
};
