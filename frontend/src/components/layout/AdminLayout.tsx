import React, { useState, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { TopBar } from './TopBar';
import { Drawer } from '../ui/Drawer';
import { DemoDataNotice } from '../ui/DemoDataNotice';
import { ShieldCheck } from 'lucide-react';

export const AdminLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-sbloom-canvas text-sbloom-text-main overflow-hidden font-sans">
      
      {/* Desktop Dark Sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer Navigation */}
      <Drawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Admin Navigation"
        position="left"
        width="md"
      >
        <div className="-m-6">
          <AdminSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
        </div>
      </Drawer>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onToggleMobileMenu={() => setMobileMenuOpen(true)} isAdmin={true} />

        {/* Admin Environment Notice */}
        <div className="px-4 sm:px-8 pt-4 pb-0 space-y-2">
          <div className="px-4 py-2.5 rounded-xl bg-sbloom-admin text-white text-xs flex items-center justify-between border border-gray-800">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-sbloom-lime" />
              <span className="font-semibold">sBLOOM Administration Console</span>
              <span className="text-gray-400 hidden sm:inline">• Central partner and lead auditing</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-sbloom-lime">
              Simulated Admin Role
            </span>
          </div>

          <DemoDataNotice />
        </div>

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
          {children || <Outlet />}
        </main>
      </div>

    </div>
  );
};
