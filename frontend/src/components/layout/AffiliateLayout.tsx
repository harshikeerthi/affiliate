import React, { useState, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { AffiliateSidebar } from './AffiliateSidebar';
import { TopBar } from './TopBar';
import { Drawer } from '../ui/Drawer';
import { DemoDataNotice } from '../ui/DemoDataNotice';
import { useLanguage } from '../../context/LanguageContext';

export const AffiliateLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isTeluguDraft } = useLanguage();

  return (
    <div className="flex h-screen bg-sbloom-canvas text-sbloom-text-main overflow-hidden font-sans">
      
      {/* Desktop Sidebar (approx 248px) */}
      <div className="hidden lg:block flex-shrink-0">
        <AffiliateSidebar />
      </div>

      {/* Mobile Drawer Navigation */}
      <Drawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="sBLOOM Navigation"
        position="left"
        width="md"
      >
        <div className="-m-6">
          <AffiliateSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
        </div>
      </Drawer>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onToggleMobileMenu={() => setMobileMenuOpen(true)} isAdmin={false} />

        {/* Global Demo Banner */}
        <div className="px-4 sm:px-8 pt-4 pb-0">
          <DemoDataNotice />
        </div>

        {/* Telugu Translation Draft Notice Banner if Telugu is active */}
        {isTeluguDraft && (
          <div className="mx-4 sm:mx-8 mt-3 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <span className="font-telugu">
              గమనిక: తెలుగు అనువాదం ప్రస్తుతం డ్రాఫ్ట్ దశలో ఉంది (సమీక్ష పెండింగ్).
            </span>
            <span className="text-[11px] font-sans text-amber-700 font-semibold">
              Draft Telugu UI
            </span>
          </div>
        )}

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
          {children || <Outlet />}
        </main>
      </div>

    </div>
  );
};
