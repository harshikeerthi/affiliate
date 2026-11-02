import { buildApiUrl, API_ENDPOINTS } from '../config/api';
import type { HealthResponse, HealthCheckResult } from '../types/api';

/**
 * Pings the FastAPI backend health endpoint and measures round-trip latency.
 *
 * @param customBaseUrl Optional custom base URL if testing an alternative server
 * @returns HealthCheckResult containing status, latency, payload, and error details
 */
export async function checkBackendHealth(customBaseUrl?: string): Promise<HealthCheckResult> {
  const targetUrl = buildApiUrl(API_ENDPOINTS.HEALTH, customBaseUrl);
  const startTime = performance.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const latencyMs = Math.round(performance.now() - startTime);

    if (!response.ok) {
      return {
        status: 'error',
        data: null,
        latencyMs,
        checkedAt: new Date().toLocaleTimeString(),
        errorMessage: `Backend returned HTTP ${response.status}: ${response.statusText}`,
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
      if (error.name === 'AbortError') {
        errorMsg = 'Connection timed out after 6 seconds';
      } else {
        errorMsg = error.message;
      }
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
}
