import React, { useState } from 'react';
import { 
  Globe, 
  Menu, 
  User, 
  LogOut, 
  Shield, 
  Copy, 
  Check, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface TopBarProps {
  onToggleMobileMenu?: () => void;
  isAdmin?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleMobileMenu, isAdmin = false }) => {
  const { language, setLanguage, t, isTeluguDraft } = useLanguage();
  const { user, logout, toggleRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [copiedLink, setCopiedLink] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleCopyLink = () => {
    if (user?.referralCode) {
      const link = `${window.location.origin}/?ref=${user.referralCode}`;
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/app/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full h-16 border-b border-sbloom-border bg-white/95 backdrop-blur-md flex items-center justify-between px-4 sm:px-6">
      
      {/* Left: Mobile hamburger & route indicator */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-sbloom-text-secondary hover:text-sbloom-text-main hover:bg-sbloom-surface transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center space-x-2 text-xs text-sbloom-text-secondary">
          <span className="font-semibold text-sbloom-text-main">
            {isAdmin ? 'Admin Console' : t('portalTitle')}
          </span>
          <span className="text-sbloom-border">/</span>
          <span className="capitalize">
            {location.pathname.split('/').filter(Boolean).pop() || 'dashboard'}
          </span>
        </div>
      </div>

      {/* Right: Actions, Language Switcher, User Menu */}
      <div className="flex items-center space-x-3">
        
        {/* Quick Link Copy Button (Affiliate View) */}
        {!isAdmin && user && (
          <button
            onClick={handleCopyLink}
            className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-sbloom-surface hover:bg-[#ebdfce] border border-sbloom-border text-xs font-semibold text-sbloom-text-main transition-colors shadow-2xs"
            title="Click to copy your personalized referral link"
          >
            {copiedLink ? (
              <Check className="w-3.5 h-3.5 text-sbloom-violet" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-sbloom-violet" />
            )}
            <span>{copiedLink ? t('linkCopied') : t('copyAffiliateLink')}</span>
          </button>
        )}

        {/* Role Switcher Pill (Demonstration Switcher) */}
        <button
          onClick={() => {
            toggleRole();
            if (isAdmin) {
              navigate('/app');
            } else {
              navigate('/admin');
            }
          }}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            isAdmin
              ? 'bg-sbloom-violet text-white border-sbloom-violet hover:bg-sbloom-violet-dark shadow-xs'
              : 'bg-sbloom-admin text-sbloom-lime border-sbloom-admin hover:bg-black shadow-xs'
          }`}
          title="Switch between Affiliate Portal and Admin Console views"
        >
          <Shield className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {isAdmin ? t('switchToAffiliate') : t('switchToAdmin')}
          </span>
          <span className="sm:hidden">{isAdmin ? 'Affiliate' : 'Admin'}</span>
        </button>

        {/* Language Switcher (EN / Telugu) with Draft Notice */}
        <div className="relative flex items-center">
          <div className="flex items-center p-1 rounded-xl bg-sbloom-surface border border-sbloom-border">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                language === 'en'
                  ? 'bg-white text-sbloom-text-main shadow-2xs'
                  : 'text-sbloom-text-secondary hover:text-sbloom-text-main'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-telugu transition-all ${
                language === 'te'
                  ? 'bg-sbloom-violet text-white shadow-2xs'
                  : 'text-sbloom-text-secondary hover:text-sbloom-text-main'
              }`}
            >
              తెలుగు
            </button>
          </div>

          {/* Telugu Draft Status Tooltip/Pill */}
          {isTeluguDraft && (
            <span
              className="hidden lg:inline-flex items-center space-x-1 ml-2 text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200"
              title="Telugu translation draft pending review by native Telugu speakers."
            >
              <span>Draft</span>
            </span>
          )}
        </div>

        {/* User Avatar & Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-sbloom-surface transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-sbloom-violet text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {user ? user.name.charAt(0) : 'U'}
            </div>
            <div className="hidden xl:block text-left text-xs">
              <div className="font-semibold text-sbloom-text-main leading-tight">
                {user?.name || 'Harshitha Rao'}
              </div>
              <div className="text-[10px] text-sbloom-text-secondary capitalize">
                {isAdmin ? 'Admin' : 'Partner Affiliate'}
              </div>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-sbloom-border shadow-xl p-2 text-xs space-y-1 z-50">
              <div className="px-3 py-2 border-b border-sbloom-border/60">
                <p className="font-bold text-sbloom-text-main">{user?.name}</p>
                <p className="text-[11px] text-sbloom-text-secondary truncate">{user?.email}</p>
                <div className="mt-1 font-mono text-[10px] text-sbloom-violet font-semibold">
                  ID: {user?.referralCode}
                </div>
              </div>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/app/profile');
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-sbloom-text-main hover:bg-sbloom-surface transition-colors"
              >
                <User className="w-3.5 h-3.5 text-sbloom-text-secondary" />
                <span>Manage Profile</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t('signOut')}</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
