import { buildApiUrl, API_ENDPOINTS } from '../config/api';
import type {
  HealthResponse,
  HealthCheckResult,
  AffiliateRegisterRequest,
  AffiliateUpdateRequest,
  AffiliateProfile,
  LeadCreatePayload,
  LeadItem,
  LeadListResponse,
  ServiceListResponse,
} from '../types/api';

/**
 * Standardized error parsing helper for FastAPI HTTP and validation errors.
 */
export async function parseApiError(response: Response, defaultMessage: string): Promise<string> {
  try {
    const errorJson = await response.json();
    if (errorJson.detail) {
      if (typeof errorJson.detail === 'string') {
        return errorJson.detail;
      }
      if (Array.isArray(errorJson.detail)) {
        // FastAPI 422 validation error format: [{loc: [...], msg: "...", type: "..."}]
        return errorJson.detail
          .map((err: { loc?: (string | number)[]; msg?: string }) => {
            const field = err.loc ? err.loc[err.loc.length - 1] : 'Field';
            return `${field}: ${err.msg || 'Invalid value'}`;
          })
          .join('; ');
      }
    }
  } catch {
    // If response body is not JSON
  }
  return `${defaultMessage} (HTTP ${response.status}: ${response.statusText})`;
}

// ==========================================
// Central API Client Implementation
// ==========================================

export const apiClient = {
  /**
   * Health and Diagnostics Telemetry Check
   */
  async checkHealth(customBaseUrl?: string): Promise<HealthCheckResult> {
    const targetUrl = buildApiUrl(API_ENDPOINTS.HEALTH, customBaseUrl);
    const startTime = performance.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const latencyMs = Math.round(performance.now() - startTime);

      if (!response.ok) {
        const errorMsg = await parseApiError(response, 'Backend returned an error');
        return {
          status: 'error',
          data: null,
          latencyMs,
          checkedAt: new Date().toLocaleTimeString(),
          errorMessage: errorMsg,
          targetUrl,
        };
      }

      const data: HealthResponse = await response.json();
      return {
        status: 'connected',
        data,
        latencyMs,
        checkedAt: new Date().toLocaleTimeString(),
        targetUrl,
      };
    } catch (error: unknown) {
      const latencyMs = Math.round(performance.now() - startTime);
      let errorMsg = 'Failed to connect to backend server';
      if (error instanceof Error) {
        errorMsg = error.name === 'AbortError' ? 'Connection timed out after 6 seconds' : error.message;
      }
      return {
        status: 'disconnected',
        data: null,
        latencyMs,
        checkedAt: new Date().toLocaleTimeString(),
        errorMessage: errorMsg,
        targetUrl,
      };
    }
  },

  /**
   * Register Demo Affiliate Partner
   */
  async registerDemoAffiliate(payload: AffiliateRegisterRequest): Promise<AffiliateProfile> {
    const url = buildApiUrl(API_ENDPOINTS.AFFILIATES.REGISTER_DEMO);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorMessage = await parseApiError(response, 'Registration failed');
      throw new Error(errorMessage);
    }

    return response.json();
  },

  /**
   * Get Current Affiliate Profile
   */
  async getAffiliateProfile(affiliateId?: string): Promise<AffiliateProfile> {
    const url = buildApiUrl(API_ENDPOINTS.AFFILIATES.ME);
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (affiliateId) {
      headers['X-Affiliate-Id'] = affiliateId;
    }

    const response = await fetch(url, { method: 'GET', headers });

    if (!response.ok) {
      const errorMessage = await parseApiError(response, 'Could not load affiliate profile');
      throw new Error(errorMessage);
    }

    return response.json();
  },

  /**
   * Update Affiliate Profile
   */
  async updateAffiliateProfile(updates: AffiliateUpdateRequest, affiliateId?: string): Promise<AffiliateProfile> {
    const url = buildApiUrl(API_ENDPOINTS.AFFILIATES.ME);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (affiliateId) {
      headers['X-Affiliate-Id'] = affiliateId;
    }

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorMessage = await parseApiError(response, 'Failed to update profile settings');
      throw new Error(errorMessage);
    }

    return response.json();
  },

  /**
   * Submit New Referral Lead
   */
  async createLead(payload: LeadCreatePayload): Promise<LeadItem> {
    const url = buildApiUrl(API_ENDPOINTS.LEADS.BASE);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorMessage = await parseApiError(response, 'Lead submission failed');
      throw new Error(errorMessage);
    }

    return response.json();
  },

  /**
   * List Customer Leads
   */
  async getLeads(params?: {
    status?: string;
    sector?: string;
    affiliate_code?: string;
    search?: string;
    skip?: number;
    limit?: number;
  }): Promise<LeadListResponse> {
    const searchParams = new URLSearchParams();
    if (params?.status && params.status !== 'All') searchParams.append('status', params.status);
    if (params?.sector && params.sector !== 'All') searchParams.append('sector', params.sector);
    if (params?.affiliate_code) searchParams.append('affiliate_code', params.affiliate_code);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.skip !== undefined) searchParams.append('skip', String(params.skip));
    if (params?.limit !== undefined) searchParams.append('limit', String(params.limit));

    const queryString = searchParams.toString();
    const endpoint = queryString ? `${API_ENDPOINTS.LEADS.BASE}?${queryString}` : API_ENDPOINTS.LEADS.BASE;
    const url = buildApiUrl(endpoint);

    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      const errorMessage = await parseApiError(response, 'Failed to retrieve leads');
      throw new Error(errorMessage);
    }

    return response.json();
  },

  /**
   * Get Single Lead By ID or Reference
   */
  async getLeadById(leadId: string): Promise<LeadItem> {
    const url = buildApiUrl(API_ENDPOINTS.LEADS.BY_ID(leadId));
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      const errorMessage = await parseApiError(response, `Lead '${leadId}' not found`);
      throw new Error(errorMessage);
    }

    return response.json();
  },

  /**
   * Retrieve Promotional Services Catalog
   */
  async getServices(): Promise<ServiceListResponse> {
    const url = buildApiUrl(API_ENDPOINTS.SERVICES.BASE);
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      const errorMessage = await parseApiError(response, 'Failed to fetch services catalog');
      throw new Error(errorMessage);
    }

    return response.json();
  },
};

// Backwards-compatible export for existing components
export const checkBackendHealth = apiClient.checkHealth;
