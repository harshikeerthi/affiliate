import React, { useState } from 'react';
import { Layers, Terminal, Copy, Check, FolderTree, ArrowRight, ShieldCheck } from 'lucide-react';

export const ArchitectureGuide: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1800);
  };

  return (
    <div className="rounded-3xl bg-white border border-sbloom-border p-6 sm:p-8 shadow-sbloom space-y-6">
      
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-2xl bg-sbloom-admin flex items-center justify-center text-sbloom-lime">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-fraunces text-xl font-bold text-sbloom-text-main">
            Foundation Architecture & Independent Run Commands
          </h3>
          <p className="text-xs text-sbloom-text-secondary">
            Simple reference guide for beginner developers. Run both layers independently.
          </p>
        </div>
      </div>

      {/* Two Independent Terminal Execution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Backend Runner Card */}
        <div className="rounded-2xl bg-sbloom-surface border border-sbloom-border p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold font-fraunces text-sbloom-violet uppercase tracking-wider flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>Backend (FastAPI + Uvicorn)</span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white border border-sbloom-border font-mono text-sbloom-text-secondary">
                Port 8000
              </span>
            </div>

            <p className="text-xs text-sbloom-text-secondary leading-relaxed mb-4">
              Runs independently using Python 3.13 and Uvicorn. Serves health checks, CORS middleware, and API v1 endpoints.
            </p>

            <div className="p-3.5 rounded-xl bg-sbloom-admin text-white font-mono text-xs space-y-2 relative group">
              <button
                onClick={() => handleCopyCommand('cd backend\npython run.py')}
                className="absolute top-2.5 right-2.5 p-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
                title="Copy Command"
              >
                {copiedCmd === 'cd backend\npython run.py' ? (
                  <Check className="w-3.5 h-3.5 text-sbloom-lime" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
              <div className="text-gray-400"># Terminal 1: Start Backend</div>
              <div className="text-sbloom-lime">cd backend</div>
              <div className="text-sbloom-lime">python run.py</div>
              <div className="text-gray-500 pt-1 text-[11px]"># Or: uvicorn app.main:app --reload</div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sbloom-border/70 flex items-center justify-between text-xs text-sbloom-text-secondary">
            <span>Health Endpoint: <code className="font-bold text-sbloom-text-main">/api/v1/health</code></span>
          </div>
        </div>

        {/* Frontend Runner Card */}
        <div className="rounded-2xl bg-sbloom-surface border border-sbloom-border p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold font-fraunces text-sbloom-magenta uppercase tracking-wider flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>Frontend (React + Vite)</span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white border border-sbloom-border font-mono text-sbloom-text-secondary">
                Port 5173
              </span>
            </div>

            <p className="text-xs text-sbloom-text-secondary leading-relaxed mb-4">
              Runs independently using Vite dev server. Connects to the backend via <code className="font-mono text-xs">VITE_API_BASE_URL</code>.
            </p>

            <div className="p-3.5 rounded-xl bg-sbloom-admin text-white font-mono text-xs space-y-2 relative group">
              <button
                onClick={() => handleCopyCommand('cd frontend\nnpm run dev')}
                className="absolute top-2.5 right-2.5 p-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
                title="Copy Command"
              >
                {copiedCmd === 'cd frontend\nnpm run dev' ? (
                  <Check className="w-3.5 h-3.5 text-sbloom-lime" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
              <div className="text-gray-400"># Terminal 2: Start Frontend</div>
              <div className="text-sbloom-magenta">cd frontend</div>
              <div className="text-sbloom-magenta">npm run dev</div>
              <div className="text-gray-500 pt-1 text-[11px]"># Production build: npm run build</div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sbloom-border/70 flex items-center justify-between text-xs text-sbloom-text-secondary">
            <span>Dev Server: <code className="font-bold text-sbloom-text-main">http://localhost:5173</code></span>
          </div>
        </div>

      </div>

      {/* Directory Blueprint */}
      <div className="p-5 rounded-2xl bg-sbloom-canvas border border-sbloom-border">
        <div className="flex items-center space-x-2 text-xs font-semibold text-sbloom-text-secondary uppercase tracking-wider mb-3">
          <FolderTree className="w-4 h-4 text-sbloom-violet" />
          <span>Clean Project Layout</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white border border-sbloom-border">
            <span className="font-mono font-bold text-sbloom-violet">frontend/</span>
            <p className="text-sbloom-text-secondary text-[11px] mt-1">
              React 19, TypeScript, Vite, Tailwind CSS, sBLOOM tokens, health polling.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white border border-sbloom-border">
            <span className="font-mono font-bold text-sbloom-magenta">backend/</span>
            <p className="text-sbloom-text-secondary text-[11px] mt-1">
              FastAPI app, v1 health endpoints, CORS middleware, Pydantic settings.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white border border-sbloom-border">
            <span className="font-mono font-bold text-sbloom-text-main">README.md</span>
            <p className="text-sbloom-text-secondary text-[11px] mt-1">
              Comprehensive beginner setup instructions, API schema, roadmap.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white border border-sbloom-border">
            <span className="font-mono font-bold text-[#6fa014]">.env.example</span>
            <p className="text-sbloom-text-secondary text-[11px] mt-1">
              Templates in root, frontend, and backend for configuration.
            </p>
          </div>
        </div>
      </div>

      {/* Roadmap to Phase 2 */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-sbloom-violet/10 via-sbloom-magenta/10 to-sbloom-lime/10 border border-sbloom-border">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-5 h-5 text-sbloom-violet" />
          <div>
            <span className="text-xs font-bold text-sbloom-text-main">Phase 1 Complete</span>
            <p className="text-[11px] text-sbloom-text-secondary">
              Foundation verified. Ready for Phase 2: Supabase database, affiliate authentication, and commission tracking.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center space-x-1 text-xs font-bold text-sbloom-violet">
          <span>Next: Phase 2</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>

    </div>
  );
};
