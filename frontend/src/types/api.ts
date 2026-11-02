export type ConnectionStatus = 'checking' | 'connected' | 'disconnected' | 'error';

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  environment: string;
  timestamp: string;
  uptime_seconds: number;
  storage_mode: string;
  database_connected: boolean;
  storage_notice: string;
  modules_ready?: string[];
  message: string;
}


export interface HealthCheckResult {
  status: ConnectionStatus;
  data: HealthResponse | null;
  latencyMs: number;
  checkedAt: string;
  errorMessage?: string;
  targetUrl: string;
}

// ==========================================
// Affiliate Models
// ==========================================

export interface AffiliateRegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  category: string;
  payout_upi?: string;
  consent: boolean;
}

export interface AffiliateUpdateRequest {
  name?: string;
  phone?: string;
  category?: string;
  payout_upi?: string;
  notification_whatsapp?: boolean;
  notification_email?: boolean;
}

export interface AffiliateProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  referral_code: string;
  category: string;
  payout_upi?: string;
  joined_at: string;
  role: string;
  notification_whatsapp: boolean;
  notification_email: boolean;
  disclaimer: string;
}

// ==========================================
// Lead Models
// ==========================================

export type LeadStatus = 'Pending' | 'Contacted' | 'Qualified' | 'Converted' | 'Rejected';

export interface LeadCreatePayload {
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  location: string;
  sector: string;
  services_of_interest: string[];
  business_requirements: string;
  preferred_meeting_datetime?: string;
  timezone?: string;
  consent: boolean;
  affiliate_code?: string;
  notes?: string;
}

export interface LeadItem {
  id: string;
  reference_number: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  location: string;
  sector: string;
  services_of_interest: string[];
  business_requirements: string;
  preferred_meeting_datetime?: string;
  timezone: string;
  consent: boolean;
  status: LeadStatus;
  estimated_value: string;
  estimated_commission: string;
  affiliate_code?: string;
  notes?: string;
  created_at: string;
  is_demo_sample: boolean;
}

export interface LeadListResponse {
  total: number;
  skip: number;
  limit: number;
  leads: LeadItem[];
  disclaimer: string;
}

// ==========================================
// Service & Verified Client Models
// ==========================================

export interface VerifiedClientBusiness {
  id: string;
  name: string;
  category: string;
  service_id: string;
  service_name?: string;
  website_url?: string;
  location?: string;
  verified: boolean;
  source?: string;
  notes?: string;
}

export interface ServiceCatalogItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  commission_rate: string;
  avg_commission: string;
  cookie_duration: string;
  description: string;
  features: string[];
  clients?: VerifiedClientBusiness[];
}

export interface ServiceListResponse {
  total: number;
  categories?: string[];
  services: ServiceCatalogItem[];
}

export interface ClientListResponse {
  total: number;
  categories: string[];
  clients: VerifiedClientBusiness[];
}

