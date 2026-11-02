import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  BarChart2, 
  Coins, 
  CheckCircle2, 
  Languages 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

export const LandingPage: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-sbloom-canvas text-sbloom-text-main flex flex-col font-sans selection:bg-sbloom-lime selection:text-sbloom-text-main">
      
      {/* Top Welcome Header */}
      <nav className="w-full border-b border-sbloom-border bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-sbloom-admin shadow-md overflow-hidden">
              <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-sbloom-violet opacity-80 blur-[1px]" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-sbloom-magenta opacity-80 blur-[1px]" />
              <span className="relative z-10 font-fraunces font-bold text-xl text-sbloom-lime">
                sB
              </span>
            </div>
            <div>
              <span className="font-fraunces text-2xl font-bold tracking-tight text-sbloom-text-main">
                sBLOOM
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 ml-2 rounded-full bg-sbloom-surface border border-sbloom-border text-sbloom-text-secondary">
                AFFILIATE PORTAL
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Switch */}
            <div className="flex items-center p-1 rounded-xl bg-sbloom-surface border border-sbloom-border text-xs">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  language === 'en' ? 'bg-white text-sbloom-text-main shadow-2xs' : 'text-sbloom-text-secondary'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`px-2.5 py-1 rounded-lg font-bold font-telugu transition-all ${
                  language === 'te' ? 'bg-sbloom-violet text-white shadow-2xs' : 'text-sbloom-text-secondary'
                }`}
              >
                తెలుగు
              </button>
            </div>

            <Link to="/app/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>

            <Link to="/app/signup">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Join Directly
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 max-w-7xl mx-auto flex-grow flex flex-col justify-center">
        
        {/* Glow backdrop decorations */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-sbloom-violet/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 rounded-full bg-sbloom-lime/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sbloom-surface border border-sbloom-border shadow-2xs">
            <Sparkles className="w-4 h-4 text-sbloom-violet" />
            <span className="text-xs font-bold uppercase tracking-wider text-sbloom-text-secondary font-telugu">
              స్వాగతం • Instant Partner Access
            </span>
          </div>

          <h1 className="font-fraunces text-4xl sm:text-6xl font-extrabold text-sbloom-text-main tracking-tight leading-[1.12]">
            Turn Your Audience Into <br />
            <span className="text-sbloom-violet italic font-normal">Sustained Revenue</span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-sbloom-text-secondary max-w-2xl mx-auto leading-relaxed">
            The sBLOOM Affiliate Portal empowers creators, agency founders, and consultants to earn up to 25% recurring commissions with transparent real-time attribution and zero approval wait time.
          </p>

          {/* Business rule highlight: Direct Join */}
          <div className="p-4 rounded-2xl bg-white border border-sbloom-border shadow-sbloom max-w-xl mx-auto text-left flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-xl bg-sbloom-lime text-sbloom-text-main flex items-center justify-center flex-shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-sbloom-text-main">Direct Partner Onboarding: </span>
              <span className="text-sbloom-text-secondary leading-relaxed">
                No manual approval queues or waiting screens. Sign up now and your tracking dashboard and affiliate code are active immediately.
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link to="/app/signup">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start Earning (Join Directly)
              </Button>
            </Link>
            <Link to="/app">
              <Button variant="secondary" size="lg">
                Explore Demo Dashboard
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" size="lg">
                View Admin Console
              </Button>
            </Link>
          </div>

        </div>

        {/* Feature Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          <div className="p-6 rounded-3xl bg-white border border-sbloom-border shadow-sbloom space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-sbloom-violet/15 text-sbloom-violet flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="font-fraunces text-lg font-bold text-sbloom-text-main">
              High-Ticket Commissions
            </h3>
            <p className="text-xs text-sbloom-text-secondary leading-relaxed">
              Earn between 15% and 25% on closed client contracts, with average payouts starting from ₹12,000 up to ₹45,000 per closed deal.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-sbloom-border shadow-sbloom space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-sbloom-magenta/15 text-sbloom-magenta flex items-center justify-center">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="font-fraunces text-lg font-bold text-sbloom-text-main">
              Real-Time Lead Tracking
            </h3>
            <p className="text-xs text-sbloom-text-secondary leading-relaxed">
              Audit every lead through each stage—Pending, Contacted, Qualified, and Converted—with transparent live updates.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-sbloom-border shadow-sbloom space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-sbloom-lime/30 text-sbloom-text-main flex items-center justify-center">
              <Languages className="w-5 h-5" />
            </div>
            <h3 className="font-fraunces text-lg font-bold text-sbloom-text-main">
              Bilingual & Multilingual
            </h3>
            <p className="text-xs text-sbloom-text-secondary leading-relaxed">
              Native support for English and Telugu typography, making creator onboarding accessible for regional partners across South India.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="w-full border-t border-sbloom-border py-6 bg-sbloom-surface/60 text-xs text-sbloom-text-secondary">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 sBLOOM Creator Ecosystem</span>
          <div className="flex items-center space-x-4">
            <Link to="/app" className="hover:text-sbloom-violet">Demo Dashboard</Link>
            <Link to="/admin" className="hover:text-sbloom-violet">Admin Console</Link>
            <Link to="/app/signup" className="hover:text-sbloom-violet">Join as Partner</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};
