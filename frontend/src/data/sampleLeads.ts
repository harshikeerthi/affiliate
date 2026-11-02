export type LeadStatus = 'Pending' | 'Contacted' | 'Qualified' | 'Converted' | 'Rejected';

export interface Lead {
  id: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  estimatedValue: string;
  commissionEst: string;
  status: LeadStatus;
  submittedDate: string;
  notes: string;
  isDemoSample: boolean;
}

export const INITIAL_SAMPLE_LEADS: Lead[] = [
  {
    id: 'LEAD-9041',
    clientName: 'Vikramaditya Sharma',
    companyName: 'Apex Cloud Solutions',
    email: 'vikram@apexcloud.in',
    phone: '+91 98450 11223',
    serviceId: 'srv-agentic-pipeline',
    serviceName: 'Enterprise Agentic AI Pipeline',
    estimatedValue: '₹1,80,000',
    commissionEst: '₹45,000',
    status: 'Converted',
    submittedDate: '24 Oct 2026',
    notes: 'Client completed onboarding demo. Agreement signed for 12 months.',
    isDemoSample: true,
  },
  {
    id: 'LEAD-9042',
    clientName: 'Ananya Reddy',
    companyName: 'Nava Digital Agency',
    email: 'ananya@navadigital.co',
    phone: '+91 97000 88991',
    serviceId: 'srv-workflow-automation',
    serviceName: 'Autonomous Workflow Automation',
    estimatedValue: '₹92,500',
    commissionEst: '₹18,500',
    status: 'Qualified',
    submittedDate: '27 Oct 2026',
    notes: 'Technical POC scheduled with the engineering leadership.',
    isDemoSample: true,
  },
  {
    id: 'LEAD-9043',
    clientName: 'Sanjay Varma',
    companyName: 'Deccan Retailers Pvt Ltd',
    email: 'sanjay@deccanretail.com',
    phone: '+91 94401 55432',
    serviceId: 'srv-creator-funnel',
    serviceName: 'Omnichannel Creator Funnel Suite',
    estimatedValue: '₹80,000',
    commissionEst: '₹12,000',
    status: 'Contacted',
    submittedDate: '29 Oct 2026',
    notes: 'Introductory call completed. Shared product deck & pricing tiers.',
    isDemoSample: true,
  },
  {
    id: 'LEAD-9044',
    clientName: 'Priya Sundaram',
    companyName: 'Kaizen FinTech Labs',
    email: 'priya@kaizenfintech.io',
    phone: '+91 99881 77221',
    serviceId: 'srv-data-intelligence',
    serviceName: 'Creator Data Intelligence Engine',
    estimatedValue: '₹1,10,000',
    commissionEst: '₹22,000',
    status: 'Pending',
    submittedDate: '01 Nov 2026',
    notes: 'New referral submitted via affiliate custom UTM link.',
    isDemoSample: true,
  },
  {
    id: 'LEAD-9045',
    clientName: 'Karthik Narayanan',
    companyName: 'Zenith Logistics',
    email: 'karthik@zenithlog.com',
    phone: '+91 91234 56780',
    serviceId: 'srv-workflow-automation',
    serviceName: 'Autonomous Workflow Automation',
    estimatedValue: '₹75,000',
    commissionEst: '₹15,000',
    status: 'Rejected',
    submittedDate: '15 Oct 2026',
    notes: 'Client looking for on-premise hardware installation only.',
    isDemoSample: true,
  },
];
