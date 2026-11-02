import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import type { ConnectionStatus } from '../types/api';

interface HeaderProps {
  connectionStatus: ConnectionStatus;
  latencyMs: number;
}

export const Header: React.FC<HeaderProps> = ({ connectionStatus, latencyMs }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-sbloom-border bg-sbloom-canvas/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-sbloom-admin shadow-md overflow-hidden group cursor-pointer">
            {/* Visual sBLOOM petal accents */}
            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-sbloom-violet opacity-80 blur-[2px] group-hover:scale-125 transition-transform" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-sbloom-magenta opacity-80 blur-[2px] group-hover:scale-125 transition-transform" />
            <div className="relative z-10 font-fraunces font-bold text-2xl text-sbloom-lime">
              sB
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-fraunces text-2xl font-bold tracking-tight text-sbloom-text-main">
                sBLOOM
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sbloom-surface border border-sbloom-border text-sbloom-text-secondary">
                AFFILIATE
              </span>
            </div>
            <p className="text-xs text-sbloom-text-secondary hidden sm:block">
              Creator & Partner Ecosystem Portal
            </p>
          </div>
        </div>

        {/* Center Pill: Telugu Tagline */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-sbloom-surface border border-sbloom-border/80 text-xs text-sbloom-text-secondary">
          <Sparkles className="w-3.5 h-3.5 text-sbloom-magenta" />
          <span className="font-telugu font-medium text-sbloom-text-main">స్వాగతం</span>
          <span className="text-sbloom-border">|</span>
          <span>Foundation Phase Ready</span>
        </div>

        {/* Right Status Badge */}
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
            connectionStatus === 'connected'
              ? 'bg-sbloom-lime/15 border-sbloom-lime/40 text-sbloom-text-main'
              : connectionStatus === 'checking'
              ? 'bg-sbloom-violet/10 border-sbloom-violet/30 text-sbloom-violet'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <span className="relative flex h-2.5 w-2.5">
              {connectionStatus === 'connected' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sbloom-lime opacity-75" />
              )}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                connectionStatus === 'connected'
                  ? 'bg-[#6fa014]'
                  : connectionStatus === 'checking'
                  ? 'bg-sbloom-violet animate-pulse'
                  : 'bg-red-500'
              }`} />
            </span>
            <span className="capitalize font-semibold">
              {connectionStatus === 'connected'
                ? `API Online (${latencyMs}ms)`
                : connectionStatus === 'checking'
                ? 'Connecting...'
                : 'API Disconnected'}
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-sbloom-admin text-white text-xs font-medium shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-sbloom-lime" />
            <span>FastAPI Core</span>
          </div>
        </div>

      </div>
    </header>
  );
};
