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

export const SAMPLE_INVOICES: InvoiceItem[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-SBLOOM-2026-09',
    payoutPeriod: 'September 2026',
    generatedDate: '05 Oct 2026',
    amount: '₹62,500',
    status: 'Paid',
    payoutMethod: 'Direct Bank Transfer (NEFT)',
    referenceId: 'UTR-SBIN992817263',
    isDemoSample: true,
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-SBLOOM-2026-10',
    payoutPeriod: 'October 2026',
    generatedDate: '05 Nov 2026',
    amount: '₹80,000',
    status: 'Processing',
    payoutMethod: 'UPI (harshitha@oksbi)',
    referenceId: 'PENDING-SETTLEMENT',
    isDemoSample: true,
  },
];

export const EARNINGS_METRICS = {
  totalCleared: '₹1,42,500',
  pendingPayout: '₹38,000',
  nextPayoutDate: '10 Nov 2026',
  lifetimeConversions: 12,
  averageCommissionPerDeal: '₹24,350',
  isDemoSample: true,
};
