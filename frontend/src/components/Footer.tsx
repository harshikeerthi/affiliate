import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-sbloom-border bg-sbloom-surface/60 mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sbloom-text-secondary">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-sbloom-admin flex items-center justify-center font-fraunces font-bold text-xs text-sbloom-lime">
            sB
          </div>
          <span className="font-semibold text-sbloom-text-main">sBLOOM Affiliate Portal</span>
          <span>• Foundation Architecture Phase 1</span>
        </div>

        <div className="flex items-center space-x-6">
          <span className="font-telugu">సస్టెయినబుల్ అఫిలియేట్ సిస్టమ్</span>
          <span>FastAPI + Vite React + Tailwind CSS</span>
          <span>© 2026 sBLOOM</span>
        </div>
      </div>
    </footer>
  );
};
