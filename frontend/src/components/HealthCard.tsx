import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Server, 
  Clock, 
  Cpu, 
  Terminal, 
  Database, 
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from 'lucide-react';
import type { HealthCheckResult } from '../types/api';

interface HealthCardProps {
  health: HealthCheckResult;
  onRefresh: (customUrl?: string) => void;
  isLoading: boolean;
  defaultApiUrl: string;
}

export const HealthCard: React.FC<HealthCardProps> = ({
  health,
  onRefresh,
  isLoading,
  defaultApiUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);
  const [customUrl, setCustomUrl] = useState(defaultApiUrl);
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  const isConnected = health.status === 'connected';

  const handleCopyJson = () => {
    if (health.data) {
      navigator.clipboard.writeText(JSON.stringify(health.data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCustomPing = (e: React.FormEvent) => {
    e.preventDefault();
    onRefresh(customUrl);
  };

  return (
    <div className="w-full rounded-3xl bg-white border border-sbloom-border shadow-sbloom overflow-hidden transition-all duration-300">
      
      {/* Top Banner Status Bar */}
      <div className={`px-6 py-4 flex flex-wrap items-center justify-between border-b transition-colors ${
        isConnected 
          ? 'bg-gradient-to-r from-sbloom-surface to-[#f4f7e6] border-sbloom-border' 
          : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-2xl ${
            isConnected 
              ? 'bg-sbloom-lime text-sbloom-text-main shadow-lime-glow' 
              : 'bg-red-500 text-white'
          }`}>
            {isConnected ? (
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            ) : (
              <XCircle className="w-6 h-6 stroke-[2.5]" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-fraunces text-xl font-bold text-sbloom-text-main">
                {isConnected ? 'FastAPI Backend Connected' : 'FastAPI Backend Offline'}
              </h2>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                isConnected
                  ? 'bg-sbloom-admin text-sbloom-lime'
                  : 'bg-red-100 text-red-800'
              }`}>
                {isConnected ? 'Operational' : 'Disconnected'}
              </span>
            </div>
            <p className="text-xs text-sbloom-text-secondary mt-0.5">
              {isConnected
                ? `Last responsive response checked at ${health.checkedAt} with ${health.latencyMs}ms roundtrip latency.`
                : `Attempted to reach backend at ${health.checkedAt}. No active listener detected.`}
            </p>
          </div>
        </div>

        {/* Action Button: Ping */}
        <div className="mt-3 sm:mt-0 flex items-center space-x-2">
          <button
            onClick={() => onRefresh(customUrl)}
            disabled={isLoading}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-sbloom-violet text-white font-medium text-sm hover:bg-sbloom-violet-dark transition-all duration-200 shadow-md hover:shadow-violet-glow active:scale-95 disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Checking...' : 'Check Connection'}</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Endpoint Configuration Bar */}
        <div className="p-4 rounded-2xl bg-sbloom-canvas border border-sbloom-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <Server className="w-4 h-4 text-sbloom-violet flex-shrink-0" />
            <span className="text-xs font-semibold text-sbloom-text-secondary uppercase tracking-wider">
              Target API Base:
            </span>
            {isEditingUrl ? (
              <form onSubmit={handleCustomPing} className="flex items-center space-x-2 flex-grow">
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="px-2.5 py-1 text-xs rounded-lg border border-sbloom-border bg-white text-sbloom-text-main font-mono focus:outline-none focus:ring-2 focus:ring-sbloom-violet"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 text-xs rounded-lg bg-sbloom-admin text-white font-medium"
                >
                  Save & Ping
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingUrl(false)}
                  className="text-xs text-sbloom-text-secondary hover:underline"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <code className="text-xs font-mono font-semibold text-sbloom-text-main bg-white px-2.5 py-1 rounded-lg border border-sbloom-border truncate">
                {customUrl}
              </code>
            )}
          </div>

          <div className="flex items-center space-x-3 text-xs flex-shrink-0">
            {!isEditingUrl && (
              <button
                onClick={() => setIsEditingUrl(true)}
                className="text-sbloom-violet font-semibold hover:underline"
              >
                Change Base URL
              </button>
            )}
            <a
              href={`${customUrl}/docs`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-sbloom-text-secondary hover:text-sbloom-violet font-medium transition-colors"
            >
              <span>Swagger Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Diagnostic Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-sbloom-surface border border-sbloom-border">
            <div className="flex items-center justify-between text-sbloom-text-secondary mb-1.5">
              <span className="text-xs font-medium">Telemetry Latency</span>
              <Clock className="w-4 h-4 text-sbloom-violet" />
            </div>
            <div className="text-2xl font-bold font-fraunces text-sbloom-text-main">
              {isConnected ? `${health.latencyMs} ms` : '—'}
            </div>
            <p className="text-[11px] text-sbloom-text-secondary mt-1">
              HTTP Roundtrip ping duration
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sbloom-surface border border-sbloom-border">
            <div className="flex items-center justify-between text-sbloom-text-secondary mb-1.5">
              <span className="text-xs font-medium">Service Uptime</span>
              <Cpu className="w-4 h-4 text-sbloom-magenta" />
            </div>
            <div className="text-2xl font-bold font-fraunces text-sbloom-text-main">
              {health.data ? `${health.data.uptime_seconds}s` : '—'}
            </div>
            <p className="text-[11px] text-sbloom-text-secondary mt-1">
              Uvicorn process lifetime
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sbloom-surface border border-sbloom-border">
            <div className="flex items-center justify-between text-sbloom-text-secondary mb-1.5">
              <span className="text-xs font-medium">API Version</span>
              <Terminal className="w-4 h-4 text-sbloom-violet" />
            </div>
            <div className="text-2xl font-bold font-fraunces text-sbloom-text-main">
              {health.data ? `v${health.data.version}` : 'v1.0.0 (Offline)'}
            </div>
            <p className="text-[11px] text-sbloom-text-secondary mt-1">
              FastAPI v1 Architecture
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sbloom-surface border border-sbloom-border">
            <div className="flex items-center justify-between text-sbloom-text-secondary mb-1.5">
              <span className="text-xs font-medium">Database (Supabase)</span>
              <Database className="w-4 h-4 text-[#B8DB3D]" />
            </div>
            <div className="text-lg font-bold font-fraunces text-sbloom-text-main flex items-center space-x-1.5 mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
              <span>Phase 2</span>
            </div>
            <p className="text-[11px] text-sbloom-text-secondary mt-1">
              Deferred as per roadmap
            </p>
          </div>

        </div>

        {/* Database Phase 2 Notice Banner */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start space-x-3 text-amber-900">
          <Database className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold">Phase 1 Database Notice: </span>
            <span>
              Database connection to Supabase is intentionally deferred in this phase. The backend operates with mock-ready foundation endpoints. You can run the entire frontend and backend independently without setting up external database credentials.
            </span>
          </div>
        </div>

        {/* Offline Diagnostic Guide if Disconnected */}
        {!isConnected && (
          <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200 text-red-950 space-y-3">
            <div className="flex items-center space-x-2 font-bold text-sm text-red-900">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>How to start the FastAPI Backend:</span>
            </div>
            <p className="text-xs text-red-800">
              {health.errorMessage || 'The frontend could not connect to http://localhost:8000.'}
            </p>
            <div className="p-3 rounded-xl bg-sbloom-admin text-white text-xs font-mono">
              <div className="text-gray-400 mb-1"># In a separate terminal, navigate to backend and run:</div>
              <div className="text-sbloom-lime font-semibold">cd backend</div>
              <div className="text-sbloom-lime font-semibold">python run.py</div>
              <div className="text-gray-400 mt-2"># Or directly using uvicorn:</div>
              <div className="text-white">uvicorn app.main:app --reload --port 8000</div>
            </div>
          </div>
        )}

        {/* Active Modules & Foundation Checklist */}
        {isConnected && health.data && (
          <div className="space-y-3">
            <h3 className="font-fraunces text-base font-semibold text-sbloom-text-main flex items-center space-x-2">
              <span>Initialized Core Modules</span>
              <span className="text-xs font-sans font-normal px-2 py-0.5 rounded-full bg-sbloom-lime/30 text-sbloom-text-main">
                {health.data.modules_ready.length} Active
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {health.data.modules_ready.map((mod, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2.5 p-3 rounded-xl bg-sbloom-canvas border border-sbloom-border/70 text-xs font-medium text-sbloom-text-main"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-sbloom-violet" />
                  <span>{mod}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Raw Telemetry JSON Toggle */}
        <div className="pt-2 border-t border-sbloom-border/70">
          <button
            onClick={() => setShowRawJson(!showRawJson)}
            className="flex items-center space-x-1.5 text-xs font-semibold text-sbloom-text-secondary hover:text-sbloom-text-main transition-colors"
          >
            {showRawJson ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{showRawJson ? 'Hide Raw API Response' : 'Inspect Raw Health JSON Telemetry'}</span>
          </button>

          {showRawJson && (
            <div className="mt-3 relative rounded-2xl bg-sbloom-admin text-gray-200 p-4 font-mono text-xs overflow-x-auto">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-800 text-[11px] text-gray-400">
                <span>GET {health.targetUrl}</span>
                <button
                  onClick={handleCopyJson}
                  className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-sbloom-lime" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>
              <pre className="text-sbloom-lime/90 leading-relaxed">
                {health.data
                  ? JSON.stringify(health.data, null, 2)
                  : JSON.stringify({ error: health.errorMessage, status: health.status }, null, 2)}
              </pre>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
