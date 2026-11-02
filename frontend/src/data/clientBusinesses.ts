import type { VerifiedClientBusiness } from '../types/api';

/**
 * Structured Local Data Layer for Verified Client and Business Records.
 * Ready to receive client listings from Excel workbooks or Google Sheets.
 * Currently unpopulated awaiting stakeholder upload of genuine client lists.
 */
export const VERIFIED_CLIENTS: VerifiedClientBusiness[] = [];

export const BUSINESS_CATEGORIES = [
  'Healthcare',
  'Education',
  'Professional Services',
] as const;

export type BusinessCategory = typeof BUSINESS_CATEGORIES[number];

/**
 * Filter verified client records by business category
 */
export function getClientsByCategory(category: string): VerifiedClientBusiness[] {
  if (!category || category === 'All') {
    return VERIFIED_CLIENTS;
  }
  return VERIFIED_CLIENTS.filter(
    (c) => c.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Filter verified client records by service identifier
 */
export function getClientsByService(serviceId: string): VerifiedClientBusiness[] {
  return VERIFIED_CLIENTS.filter((c) => c.service_id === serviceId);
}
