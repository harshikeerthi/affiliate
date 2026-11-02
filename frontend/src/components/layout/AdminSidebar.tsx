import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  BarChart3, 
  Users2, 
  ShieldAlert, 
  ArrowLeftCircle,
  DatabaseZap
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCloseMobile }) => {
  const { t } = useLanguage();

  const navItems = [
    { name: t('adminOverview'), path: '/admin', icon: BarChart3 },
    { name: t('adminLeads'), path: '/admin/leads', icon: Users2 },
  ];

  return (
    <aside className="w-[248px] h-screen bg-sbloom-admin border-r border-white/10 flex flex-col justify-between flex-shrink-0 select-none text-white">
      
      {/* Brand Header */}
      <div>
        <div className="h-16 px-5 border-b border-white/10 flex items-center space-x-3 bg-black/20">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-sbloom-violet text-white font-fraunces font-bold text-lg shadow-sm">
            sB
          </div>
          <div>
            <span className="font-fraunces font-bold text-lg tracking-tight text-white">
              sBLOOM
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-wider text-sbloom-lime">
              Admin Console
            </span>
          </div>
        </div>

        {/* Admin Navigation */}
        <div className="p-3">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            System Administration
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-sbloom-violet text-white shadow-violet-glow'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
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
      </div>

      {/* Bottom Switcher: Return to Affiliate Portal */}
      <div className="p-3 m-3 rounded-2xl bg-white/5 border border-white/10 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-300">
          <ShieldAlert className="w-4 h-4 text-sbloom-lime" />
          <span>Admin Operator</span>
        </div>
        <p className="text-[11px] text-gray-400 leading-snug">
          You are viewing system-wide lead pipelines and partner settlement queues.
        </p>

        <Link
          to="/app"
          onClick={onCloseMobile}
          className="flex items-center justify-center space-x-2 w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
        >
          <ArrowLeftCircle className="w-4 h-4 text-sbloom-lime" />
          <span>Exit to Affiliate View</span>
        </Link>
      </div>

    </aside>
  );
};
