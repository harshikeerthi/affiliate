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

// Under Master Prompt rules: No fabricated leads.
// When no genuine leads exist, the UI renders honest empty states.
export const INITIAL_SAMPLE_LEADS: Lead[] = [];

