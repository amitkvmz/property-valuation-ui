export const orders = [
  {
    id: 1,
    trackingId: 'PV-2026-1042',
    customer: 'Riya Mehta',
    email: 'riya@example.com',
    mobile: '+91 98765 43210',
    address: '24 Lake View Road, Pune',
    status: 'Payment Pending',
    paymentStatus: 'Pending',
    amountDue: 1000,
    revenue: 1000,
    reportUploaded: true,
    reportUnlocked: false,
    remarks: 'Final valuation report is ready. Payment confirmation is required to unlock the report.',
    property: {
      type: 'Residential',
      address: '24 Lake View Road, Pune',
      area: '1420 sq ft',
      ownership: 'Freehold',
      purpose: 'Home loan'
    },
    documents: ['Sale deed.pdf', 'Tax receipt.jpg', 'Building plan.png'],
    timeline: [
      { status: 'Submitted', timestamp: '02 Jul 2026, 10:15 AM', description: 'Application submitted successfully.' },
      { status: 'Documents Verified', timestamp: '02 Jul 2026, 02:40 PM', description: 'Documents reviewed by operations team.' },
      { status: 'Inspection Scheduled', timestamp: '03 Jul 2026, 11:30 AM', description: 'Inspection assigned to field valuer.' },
      { status: 'Inspection Completed', timestamp: '04 Jul 2026, 04:20 PM', description: 'Site visit completed and notes uploaded.' },
      { status: 'Report Under Preparation', timestamp: '05 Jul 2026, 12:10 PM', description: 'Report drafting is in progress.' },
      { status: 'Payment Pending', timestamp: '06 Jul 2026, 09:00 AM', description: 'Report uploaded and locked until payment completion.' }
    ]
  },
  {
    id: 2,
    trackingId: 'PV-2026-1043',
    customer: 'Arun Shah',
    email: 'arun@example.com',
    mobile: '+91 99887 76655',
    address: '12 Industrial Estate, Nashik',
    status: 'Completed',
    paymentStatus: 'Paid',
    amountDue: 0,
    revenue: 1500,
    reportUploaded: true,
    reportUnlocked: true,
    remarks: 'Report completed and shared with the registered email address.',
    property: {
      type: 'Industrial',
      address: '12 Industrial Estate, Nashik',
      area: '8600 sq ft',
      ownership: 'Leasehold',
      purpose: 'Asset financing'
    },
    documents: ['Lease agreement.pdf', 'Factory license.pdf'],
    timeline: [
      { status: 'Submitted', timestamp: '24 Jun 2026, 09:20 AM', description: 'Application received.' },
      { status: 'Documents Verified', timestamp: '24 Jun 2026, 01:35 PM', description: 'Documents accepted.' },
      { status: 'Inspection Completed', timestamp: '26 Jun 2026, 03:00 PM', description: 'Industrial site inspection completed.' },
      { status: 'Completed', timestamp: '28 Jun 2026, 06:10 PM', description: 'Final report unlocked.' }
    ]
  }
];
