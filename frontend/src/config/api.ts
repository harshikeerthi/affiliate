/**
 * Central API Configuration Module
 * 
 * Defines the base URL and endpoint routes for FastAPI backend services.
 * In development and production, Vite reads from import.meta.env.VITE_API_BASE_URL.
 * If not specified, it falls back to http://localhost:8000.
 */

export const API_BASE_URL: string = 
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  HEALTH: '/api/v1/health',
  HEALTH_TOP: '/health',
  ROOT: '/',
  AFFILIATES: {
    REGISTER_DEMO: '/api/v1/affiliates/register-demo',
    ME: '/api/v1/affiliates/me',
  },
  LEADS: {
    BASE: '/api/v1/leads',
    BY_ID: (id: string) => `/api/v1/leads/${encodeURIComponent(id)}`,
  },
  SERVICES: {
    BASE: '/api/v1/services',
    CLIENTS: '/api/v1/services/clients',
  },
} as const;

/**
 * Builds a complete endpoint URL with the current base URL.
 * Strips duplicate trailing/leading slashes.
 */
export function buildApiUrl(endpoint: string, customBaseUrl?: string): string {
  const base = (customBaseUrl || API_BASE_URL).replace(/\/+$/, '');
  const path = endpoint.replace(/^\/+/, '');
  return `${base}/${path}`;
}
