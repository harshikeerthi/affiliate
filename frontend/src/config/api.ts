/**
 * API Configuration Module
 * 
 * Defines the base URL for FastAPI backend services.
 * In development, Vite reads from import.meta.env.VITE_API_BASE_URL.
 * If not specified, it falls back to http://localhost:8000.
 */

export const API_BASE_URL: string = 
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  HEALTH: '/api/v1/health',
  HEALTH_ALIAS: '/health',
  ROOT: '/',
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
