export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  payoutPeriod: string;
  generatedDate: string;
  amount: string;
  status: 'Paid' | 'Processing';
  payoutMethod: string;
  referenceId: string;
  isDemoSample: boolean;
}

// Under Master Prompt rules: No fabricated invoices or simulated earnings.
// When no verified settlements exist, the UI renders honest empty states.
export const SAMPLE_INVOICES: InvoiceItem[] = [];

export const EARNINGS_METRICS = {
  totalCleared: '₹0',
  pendingPayout: '₹0',
  nextPayoutDate: 'Pending verification',
  lifetimeConversions: 0,
  averageCommissionPerDeal: '₹0',
  isDemoSample: false,
};

