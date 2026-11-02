import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Wallet, 
  FileText, 
  UserCircle, 
  HelpCircle,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface AffiliateSidebarProps {
  onCloseMobile?: () => void;
}

export const AffiliateSidebar: React.FC<AffiliateSidebarProps> = ({ onCloseMobile }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const navItems = [
    { name: t('dashboard'), path: '/app', icon: LayoutDashboard },
    { name: t('services'), path: '/app/services', icon: Briefcase },
    { name: t('learn'), path: '/app/learn', icon: GraduationCap },
    { name: t('myLeads'), path: '/app/leads', icon: Users },
    { name: t('earnings'), path: '/app/earnings', icon: Wallet },
    { name: t('invoices'), path: '/app/invoices', icon: FileText },
    { name: t('profile'), path: '/app/profile', icon: UserCircle },
    { name: t('support'), path: '/app/support', icon: HelpCircle },
  ];

  const handleCopyCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <aside className="w-[248px] h-screen bg-white border-r border-sbloom-border flex flex-col justify-between flex-shrink-0 select-none">
      
      {/* Brand Header */}
      <div>
        <div className="h-16 px-5 border-b border-sbloom-border flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-sbloom-admin overflow-hidden shadow-sm">
            <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-sbloom-violet opacity-80 blur-[1px]" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-sbloom-magenta opacity-80 blur-[1px]" />
            <span className="relative z-10 font-fraunces font-bold text-lg text-sbloom-lime">
              sB
            </span>
          </div>
          <div>
            <span className="font-fraunces font-bold text-lg tracking-tight text-sbloom-text-main">
              sBLOOM
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-wider text-sbloom-violet">
              Affiliate Portal
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/app'}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-sbloom-violet text-white shadow-xs'
                      : 'text-sbloom-text-secondary hover:text-sbloom-text-main hover:bg-sbloom-surface'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Card: Affiliate Referral ID */}
      <div className="p-3 m-3 rounded-2xl bg-sbloom-surface border border-sbloom-border space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sbloom-text-secondary flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-sbloom-violet" />
            <span>My Partner ID</span>
          </span>
          <span className="text-[10px] font-semibold text-sbloom-violet">Active</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-sbloom-border/70 text-xs">
          <code className="font-mono font-bold text-[11px] text-sbloom-text-main truncate">
            {user?.referralCode || 'SBLOOM-HARSHI-78'}
          </code>
          <button
            onClick={handleCopyCode}
            className="p-1 rounded-md text-sbloom-text-secondary hover:text-sbloom-violet hover:bg-sbloom-surface transition-colors ml-1"
            title="Copy Code"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-sbloom-violet" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        <p className="text-[10px] text-sbloom-text-secondary leading-tight">
          Attach to customer referrals to auto-credit your 20% commission.
        </p>
      </div>

    </aside>
  );
};
