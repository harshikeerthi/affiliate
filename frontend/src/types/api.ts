export interface DatabaseInfo {
  connected: boolean;
  provider: string;
  status_note: string;
}

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  environment: string;
  timestamp: string;
  uptime_seconds: number;
  database: DatabaseInfo;
  modules_ready: string[];
  message: string;
}

export type ConnectionStatus = 'checking' | 'connected' | 'disconnected' | 'error';

export interface HealthCheckResult {
  status: ConnectionStatus;
  data: HealthResponse | null;
  latencyMs: number;
  checkedAt: string;
  errorMessage?: string;
  targetUrl: string;
}
