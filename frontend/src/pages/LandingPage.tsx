import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Coins,
  CheckCircle2,
  Menu,
  X,
  MessageSquare,
  ChevronDown,
  Building2,
  Stethoscope,
  GraduationCap,
  Briefcase,
  Clock,
  Mail,
  ExternalLink,
  Layers,
  PhoneCall,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { landingContentEn, landingContentTe, LandingContent } from '../data/landingContent';

export const LandingPage: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  const content: LandingContent = language === 'te' ? landingContentTe : landingContentEn;
  const isTelugu = language === 'te';

  // Navigation mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active sector tab in Conversation Carousel
  const [activeSectorTab, setActiveSectorTab] = useState<'healthcare' | 'education' | 'proServices'>('healthcare');

  // FAQ Accordion open states (first item open by default)
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Interactive Earnings Calculator State
  const [dealCount, setDealCount] = useState<number>(3);
  const [avgDealValue, setAvgDealValue] = useState<number>(150000);

  // Commission is 20% average
  const quarterlyCommission = Math.round(dealCount * avgDealValue * 0.2);
  const monthlyRunRate = Math.round(quarterlyCommission / 3);

  // Authentication-aware navigation routes
  const affiliateCtaDestination = isAuthenticated ? '/app' : '/app/signup';
  const loginCtaDestination = isAuthenticated ? '/app' : '/app/login';

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-sbloom-canvas text-sbloom-text-main flex flex-col font-sans selection:bg-sbloom-lime selection:text-sbloom-text-main relative overflow-x-hidden">
      
      {/* =========================================================================
          SECTION 1: FLOATING NAVIGATION WITH sBLOOM BRAND
          ========================================================================= */}
      <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-3 pb-2 transition-all">
        <div className="max-w-7xl mx-auto">
          <nav className="glass-panel rounded-2xl sm:rounded-3xl shadow-sbloom px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between border border-sbloom-border bg-white/90 backdrop-blur-md">
            
            {/* Brand Logo & Logomark */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-sbloom-darkStage shadow-md overflow-hidden group-hover:scale-105 transition-transform">
                <div className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-sbloom-violet opacity-85 blur-[1px]" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-sbloom-magenta opacity-85 blur-[1px]" />
                <span className="relative z-10 font-fraunces font-bold text-xl text-sbloom-lime">
                  sB
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className={`text-2xl font-bold tracking-tight text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
                    sBLOOM
                  </span>
                  <span className="hidden sm:inline-block font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-sbloom-surface border border-sbloom-border text-sbloom-violet">
                    {content.nav.brandSubtitle}
                  </span>
                </div>
                <span className="text-[11px] text-sbloom-text-secondary hidden md:block">
                  {isTelugu ? 'విశ్వసనీయ మానవ సంబంధాల నెట్‌వర్క్' : 'Human Referral Ecosystem'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center space-x-1 lg:space-x-2 text-xs font-semibold text-sbloom-text-secondary">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="px-3 py-1.5 rounded-xl hover:text-sbloom-violet hover:bg-sbloom-surface transition-colors"
              >
                {content.nav.howItWorks}
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="px-3 py-1.5 rounded-xl hover:text-sbloom-violet hover:bg-sbloom-surface transition-colors"
              >
                {content.nav.services}
              </button>
              <button
                onClick={() => scrollToSection('promises')}
                className="px-3 py-1.5 rounded-xl hover:text-sbloom-violet hover:bg-sbloom-surface transition-colors"
              >
                {content.nav.promises}
              </button>
              <button
                onClick={() => scrollToSection('tools')}
                className="px-3 py-1.5 rounded-xl hover:text-sbloom-violet hover:bg-sbloom-surface transition-colors"
              >
                {content.nav.tools}
              </button>
              <button
                onClick={() => scrollToSection('earnings')}
                className="px-3 py-1.5 rounded-xl hover:text-sbloom-violet hover:bg-sbloom-surface transition-colors"
              >
                {content.nav.earnings}
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="px-3 py-1.5 rounded-xl hover:text-sbloom-violet hover:bg-sbloom-surface transition-colors"
              >
                {content.nav.faq}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-3 py-1.5 rounded-xl hover:text-sbloom-violet hover:bg-sbloom-surface transition-colors"
              >
                {content.nav.contact}
              </button>
            </div>

            {/* Right Controls: Language, Login & Primary CTA */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Bilingual Switcher (EN / తెలుగు) */}
              <div className="flex items-center p-1 rounded-xl bg-sbloom-surface border border-sbloom-border text-xs">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    language === 'en'
                      ? 'bg-white text-sbloom-text-main shadow-2xs'
                      : 'text-sbloom-text-secondary hover:text-sbloom-text-main'
                  }`}
                  title="Switch to English interface"
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('te')}
                  className={`px-2.5 py-1 rounded-lg font-bold font-telugu transition-all ${
                    language === 'te'
                      ? 'bg-sbloom-violet text-white shadow-2xs'
                      : 'text-sbloom-text-secondary hover:text-sbloom-text-main'
                  }`}
                  title="తెలుగు ఇంటర్‌ఫేస్‌కు మారండి"
                >
                  తెలుగు
                </button>
              </div>

              {/* Sign In / Portal Login Button */}
              <Link to={loginCtaDestination} className="hidden sm:inline-block">
                <Button variant="ghost" size="sm" className="font-semibold text-xs text-sbloom-text-main hover:text-sbloom-violet">
                  {isAuthenticated ? content.nav.dashboard : content.nav.signIn}
                </Button>
              </Link>

              {/* PRIMARY PROMINENT CTA: "Become an Affiliate" */}
              {/* Visible & usable on desktop, tablet, and mobile! */}
              <Link to={affiliateCtaDestination}>
                <button
                  className="inline-flex items-center space-x-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-sbloom-violet hover:bg-sbloom-violet-hover text-white text-xs sm:text-sm font-bold shadow-sbloom hover:shadow-sbloom-hover transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-sbloom-violet focus:ring-offset-2"
                >
                  <span>{content.nav.becomeAffiliate}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sbloom-lime" />
                </button>
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-sbloom-text-secondary hover:text-sbloom-text-main hover:bg-sbloom-surface transition-colors"
                aria-label="Toggle navigation drawer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </nav>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden max-w-7xl mx-auto mt-2 p-5 rounded-3xl glass-panel shadow-sbloom border border-sbloom-border bg-white/95 backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-sbloom-border">
                <span className="font-mono text-xs font-bold text-sbloom-violet uppercase">
                  sBLOOM Navigation
                </span>
                <span className="text-xs text-sbloom-text-secondary">
                  {isAuthenticated ? `Logged in: ${user?.name}` : 'Public Visitor'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-sbloom-text-main">
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-left px-3 py-2 rounded-xl bg-sbloom-surface hover:bg-[#ebdfce]"
                >
                  {content.nav.howItWorks}
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-left px-3 py-2 rounded-xl bg-sbloom-surface hover:bg-[#ebdfce]"
                >
                  {content.nav.services}
                </button>
                <button
                  onClick={() => scrollToSection('promises')}
                  className="text-left px-3 py-2 rounded-xl bg-sbloom-surface hover:bg-[#ebdfce]"
                >
                  {content.nav.promises}
                </button>
                <button
                  onClick={() => scrollToSection('tools')}
                  className="text-left px-3 py-2 rounded-xl bg-sbloom-surface hover:bg-[#ebdfce]"
                >
                  {content.nav.tools}
                </button>
                <button
                  onClick={() => scrollToSection('earnings')}
                  className="text-left px-3 py-2 rounded-xl bg-sbloom-surface hover:bg-[#ebdfce]"
                >
                  {content.nav.earnings}
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-left px-3 py-2 rounded-xl bg-sbloom-surface hover:bg-[#ebdfce]"
                >
                  {content.nav.faq}
                </button>
              </div>

              <div className="pt-2 flex flex-col space-y-2 border-t border-sbloom-border">
                <Link
                  to={loginCtaDestination}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-sbloom-border bg-white text-xs font-bold text-sbloom-text-main hover:bg-sbloom-surface"
                >
                  {isAuthenticated ? content.nav.dashboard : content.nav.signIn}
                </Link>
                <Link
                  to={affiliateCtaDestination}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl bg-sbloom-violet text-white text-xs font-bold shadow-sm"
                >
                  {content.nav.becomeAffiliate}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          SECTION 2: HERO SECTION WITH "THE THREAD" CONCEPT
          ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20 max-w-7xl mx-auto w-full">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-tr from-sbloom-violet/10 via-sbloom-lime/15 to-sbloom-magenta/10 blur-3xl pointer-events-none rounded-full -z-10" />

        {/* Continuous SVG "The Thread" visual line weaving through the hero */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-visible opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 100 120 C 350 50, 600 240, 900 160 S 1200 320, 1400 200"
            fill="none"
            stroke="url(#threadGradientHero)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
          <defs>
            <linearGradient id="threadGradientHero" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6B3CFF" />
              <stop offset="50%" stopColor="#D6F36B" />
              <stop offset="100%" stopColor="#FF4FA3" />
            </linearGradient>
          </defs>
        </svg>

        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          
          {/* Eyebrow Label Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-sbloom-surface border border-sbloom-border shadow-2xs">
            <Sparkles className="w-4 h-4 text-sbloom-violet animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sbloom-text-secondary">
              {content.hero.badge}
            </span>
          </div>

          {/* Fraunces / Telugu Heading */}
          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold text-sbloom-text-main tracking-tight leading-[1.12] sm:leading-[1.1] ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
            {content.hero.headlinePart1}{' '}
            <span className="text-sbloom-violet italic font-normal block sm:inline">
              {content.hero.headlineHighlight}
            </span>
          </h1>

          {/* Lead Body Paragraph */}
          <p className={`text-base sm:text-xl text-sbloom-text-secondary max-w-2xl mx-auto leading-relaxed ${isTelugu ? 'font-telugu' : 'font-sans'}`}>
            {content.hero.description}
          </p>

          {/* Action CTAs: Primary & Secondary */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link to={affiliateCtaDestination}>
              <Button
                variant="primary"
                size="lg"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-bold shadow-sbloom hover:shadow-sbloom-hover transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
                rightIcon={<ArrowRight className="w-5 h-5 text-sbloom-lime" />}
              >
                {content.hero.primaryCta}
              </Button>
            </Link>

            <button
              onClick={() => scrollToSection('how-it-works')}
              className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-sbloom-surface border border-sbloom-border text-sbloom-text-main text-sm sm:text-base font-semibold shadow-2xs transition-colors"
            >
              <span>{content.hero.secondaryCta}</span>
              <ChevronDown className="w-4 h-4 text-sbloom-violet" />
            </button>
          </div>

          {/* Trust Indicators Row */}
          <div className="pt-8 sm:pt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {content.hero.trustIndicators.map((stat, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/80 border border-sbloom-border shadow-2xs backdrop-blur-xs flex flex-col items-center justify-center text-center"
              >
                <span className="font-mono text-lg sm:text-2xl font-bold text-sbloom-text-main">
                  {stat.label}
                </span>
                <span className="text-xs text-sbloom-text-secondary font-medium mt-0.5">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 3: "SOUND FAMILIAR?" CONVERSATIONAL SECTION
          ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-sbloom-surface/60 border-y border-sbloom-border">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sbloom-violet">
              {content.soundFamiliar.eyebrow}
            </span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
              {content.soundFamiliar.headline}
            </h2>
            <p className="text-sm sm:text-base text-sbloom-text-secondary leading-relaxed">
              {content.soundFamiliar.description}
            </p>
          </div>

          {/* Everyday Dialogue Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.soundFamiliar.quotes.map((q) => {
              const sectorColor =
                q.sector === 'healthcare'
                  ? 'border-t-4 border-t-sbloom-healthcare'
                  : q.sector === 'education'
                  ? 'border-t-4 border-t-sbloom-education'
                  : 'border-t-4 border-t-sbloom-proServices';

              const icon =
                q.sector === 'healthcare' ? (
                  <Stethoscope className="w-5 h-5 text-sbloom-healthcare" />
                ) : q.sector === 'education' ? (
                  <GraduationCap className="w-5 h-5 text-sbloom-education" />
                ) : (
                  <Briefcase className="w-5 h-5 text-sbloom-proServices" />
                );

              return (
                <div
                  key={q.id}
                  className={`p-6 sm:p-7 rounded-3xl bg-white border border-sbloom-border shadow-sbloom flex flex-col justify-between space-y-6 transition-all hover:-translate-y-1 ${sectorColor}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-sbloom-surface flex items-center justify-center">
                        {icon}
                      </div>
                      <span className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-full bg-sbloom-surface text-sbloom-text-secondary">
                        {q.location}
                      </span>
                    </div>

                    {/* Dialogue quote bubble */}
                    <blockquote className="relative text-sm sm:text-base text-sbloom-text-main font-serif italic leading-relaxed pl-3 border-l-2 border-sbloom-border">
                      {q.dialogue}
                    </blockquote>
                  </div>

                  <div className="pt-4 border-t border-sbloom-border/70 space-y-2">
                    <div>
                      <p className="font-bold text-sm text-sbloom-text-main">{q.speaker}</p>
                      <p className="text-xs text-sbloom-text-secondary">{q.role}</p>
                    </div>

                    <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-sbloom-lime/25 border border-sbloom-lime/50 text-[11px] font-bold text-sbloom-text-main">
                      <Zap className="w-3 h-3 text-sbloom-text-main" />
                      <span>{q.opportunityTag}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Conversational Bridge Note */}
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-sbloom-border shadow-sbloom text-center space-y-3">
            <h3 className={`text-xl sm:text-2xl font-bold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
              {content.soundFamiliar.bridgeTitle}
            </h3>
            <p className="text-xs sm:text-sm text-sbloom-text-secondary leading-relaxed max-w-2xl mx-auto">
              {content.soundFamiliar.bridgeDesc}
            </p>
            <div className="pt-2">
              <Link to={affiliateCtaDestination}>
                <button className="inline-flex items-center space-x-2 text-xs font-bold text-sbloom-violet hover:underline">
                  <span>{content.nav.becomeAffiliate}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: HEALTHCARE, EDUCATION & PRO SERVICES CAROUSEL / DEEP DIVE
          ========================================================================= */}
      <section id="services" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl mx-auto w-full">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sbloom-magenta">
              {content.conversationCarousel.eyebrow}
            </span>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
              {content.conversationCarousel.headline}
            </h2>
            <p className="text-sm sm:text-base text-sbloom-text-secondary leading-relaxed">
              {content.conversationCarousel.description}
            </p>
          </div>

          {/* Sector Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {content.conversationCarousel.tabs.map((tab) => {
              const isActive = activeSectorTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSectorTab(tab.id)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 border ${
                    isActive
                      ? 'bg-sbloom-text-main text-white border-sbloom-text-main shadow-md'
                      : 'bg-white text-sbloom-text-secondary border-sbloom-border hover:bg-sbloom-surface'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: tab.color }}
                  />
                  <span>{tab.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Sector Deep-Dive Card */}
          {(() => {
            const currentTab = content.conversationCarousel.tabs.find(
              (t) => t.id === activeSectorTab
            )!;

            return (
              <div className="p-6 sm:p-10 rounded-3xl bg-white border border-sbloom-border shadow-sbloom space-y-8 animate-in fade-in duration-300">
                
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-sbloom-border">
                  <div>
                    <span
                      className="font-mono text-xs font-bold uppercase tracking-wider"
                      style={{ color: currentTab.color }}
                    >
                      {currentTab.tabLabel}
                    </span>
                    <h3 className={`text-2xl sm:text-3xl font-bold text-sbloom-text-main mt-1 ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
                      {currentTab.sectorTitle}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-2xl bg-sbloom-surface border border-sbloom-border">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bold text-sm text-sbloom-text-main shadow-2xs">
                      {currentTab.clientPersona.name.charAt(0)}
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-sbloom-text-main">{currentTab.clientPersona.name}</p>
                      <p className="text-sbloom-text-secondary">
                        {currentTab.clientPersona.title} • {currentTab.clientPersona.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3-Column Scenario Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                  
                  {/* Column 1: The Conversation & Pain */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-sbloom-canvas border border-sbloom-border space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-bold uppercase text-sbloom-text-secondary font-mono">
                      <MessageSquare className="w-4 h-4 text-sbloom-violet" />
                      <span>The Conversation You Overhear</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-sbloom-text-main">
                      {currentTab.conversationSnippet.problem}
                    </p>
                    <blockquote className="p-3.5 rounded-xl bg-white border border-sbloom-border text-xs italic text-sbloom-text-secondary">
                      {currentTab.conversationSnippet.frustration}
                    </blockquote>
                    <p className="text-xs text-sbloom-text-main font-bold">
                      The Ask: <span className="font-normal italic">{currentTab.conversationSnippet.theAsk}</span>
                    </p>
                  </div>

                  {/* Column 2: What sBLOOM Delivers */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white border border-sbloom-border space-y-4 shadow-2xs">
                    <div className="flex items-center space-x-2 text-xs font-bold uppercase text-sbloom-text-secondary font-mono">
                      <Layers className="w-4 h-4 text-sbloom-magenta" />
                      <span>What sBLOOM Deploys</span>
                    </div>
                    <h4 className="text-sm font-bold text-sbloom-text-main">
                      {currentTab.sbloomApproach.title}
                    </h4>
                    <ul className="space-y-2 text-xs text-sbloom-text-secondary">
                      {currentTab.sbloomApproach.strategyPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 text-[11px] font-mono text-sbloom-text-muted">
                      {currentTab.sbloomApproach.deliverables}
                    </div>
                  </div>

                  {/* Column 3: The Affiliate Financial Outcome */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-sbloom-surface border border-sbloom-border space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-xs font-bold uppercase text-sbloom-text-secondary font-mono">
                        <Coins className="w-4 h-4 text-sbloom-lime" />
                        <span>Your Affiliate Payout</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-semibold text-sbloom-text-secondary">
                          Project Value:
                        </span>
                        <p className="font-mono text-xs font-bold text-sbloom-text-main">
                          {currentTab.affiliateOutcome.projectValue}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-sbloom-border space-y-1">
                        <span className="text-[11px] font-semibold text-sbloom-text-secondary">
                          Estimated Commission:
                        </span>
                        <p className="font-mono text-lg font-bold text-sbloom-violet">
                          {currentTab.affiliateOutcome.estimatedPayout}
                        </p>
                        <p className="text-[11px] text-sbloom-text-muted">
                          {currentTab.affiliateOutcome.commissionRate}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-sbloom-border text-[11px] text-sbloom-text-secondary flex items-center justify-between">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-sbloom-violet" />
                        <span>{currentTab.affiliateOutcome.payoutTimeline}</span>
                      </span>
                    </div>

                  </div>

                </div>

                {/* Bottom Callout */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-sbloom-text-secondary">
                    {isTelugu
                      ? 'మీకు ఇలాంటి క్లయింట్లు తెలుసా? వెంటనే మీ పోర్టల్‌లో రిఫర్ చేయండి.'
                      : 'Know someone facing this exact challenge? You can introduce them in under 60 seconds.'}
                  </span>
                  <Link to={affiliateCtaDestination}>
                    <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      {content.nav.becomeAffiliate}
                    </Button>
                  </Link>
                </div>

              </div>
            );
          })()}

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FOUR-STEP "HOW IT WORKS" SECTION
          ========================================================================= */}
      <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-white border-y border-sbloom-border">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sbloom-violet">
              {content.howItWorks.eyebrow}
            </span>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
              {content.howItWorks.headline}
            </h2>
            <p className="text-sm sm:text-base text-sbloom-text-secondary leading-relaxed">
              {content.howItWorks.description}
            </p>
          </div>

          {/* Stepper Cards with Thread line */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {content.howItWorks.steps.map((st) => (
              <div
                key={st.num}
                className="p-6 rounded-3xl bg-sbloom-canvas border border-sbloom-border shadow-2xs space-y-4 flex flex-col justify-between hover:shadow-sbloom transition-all relative group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-xl bg-sbloom-darkStage text-sbloom-lime font-mono font-bold text-sm flex items-center justify-center">
                      {st.num}
                    </span>
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-full bg-sbloom-surface border border-sbloom-border text-sbloom-violet">
                      {st.action}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
                    {st.title}
                  </h3>

                  <p className="text-xs text-sbloom-text-secondary leading-relaxed">
                    {st.detail}
                  </p>
                </div>

                <div className="pt-3 border-t border-sbloom-border/70 text-[11px] font-semibold text-sbloom-violet">
                  ✦ {st.highlight}
                </div>
              </div>
            ))}
          </div>

          {/* Stepper Action Bar */}
          <div className="p-6 rounded-2xl bg-sbloom-surface border border-sbloom-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-sbloom-violet text-white flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm text-sbloom-text-main font-medium">
                {isTelugu
                  ? 'మీ అకౌంట్ తక్షణమే యాక్టివేట్ అవుతుంది. ఎలాంటి డాక్యుమెంట్ వెరిఫికేషన్ లేదా వెయిటింగ్ లిస్ట్ లేదు.'
                  : 'Instant account setup: Register in 30 seconds and receive your live partner referral link immediately.'}
              </p>
            </div>
            <Link to={affiliateCtaDestination}>
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {content.nav.becomeAffiliate}
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: THE THREE PROMISES
          ========================================================================= */}
      <section id="promises" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl mx-auto w-full">
        <div className="space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sbloom-magenta">
              {content.promises.eyebrow}
            </span>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
              {content.promises.headline}
            </h2>
            <p className="text-sm sm:text-base text-sbloom-text-secondary leading-relaxed">
              {content.promises.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {content.promises.cards.map((c) => (
              <div
                key={c.num}
                className="p-8 rounded-3xl bg-white border border-sbloom-border shadow-sbloom space-y-5 flex flex-col justify-between hover:-translate-y-1 transition-transform"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-sbloom-violet">
                      {c.num}
                    </span>
                    <ShieldCheck className="w-6 h-6 text-sbloom-violet" />
                  </div>

                  <h3 className={`text-xl font-bold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
                    {c.title}
                  </h3>

                  <p className="text-xs font-bold text-sbloom-violet uppercase font-mono">
                    {c.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-sbloom-text-secondary leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-sbloom-border text-[11px] font-mono text-sbloom-text-muted">
                  🔒 {c.proof}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: THREE SERVICE SECTORS
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-sbloom-surface/60 border-y border-sbloom-border">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sbloom-violet">
              {content.sectors.eyebrow}
            </span>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
              {content.sectors.headline}
            </h2>
            <p className="text-sm sm:text-base text-sbloom-text-secondary leading-relaxed">
              {content.sectors.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {content.sectors.items.map((sec) => (
              <div
                key={sec.id}
                className="p-7 rounded-3xl bg-white border border-sbloom-border shadow-sbloom space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: sec.color }}
                    />
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-sbloom-surface border border-sbloom-border text-sbloom-text-secondary">
                      {sec.attributionPeriod}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
                    {sec.name}
                  </h3>

                  <p className="text-xs text-sbloom-text-secondary leading-relaxed">
                    {sec.tagline}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-sbloom-border/70">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sbloom-text-muted font-mono">
                      Target Clients
                    </span>
                    <ul className="text-xs text-sbloom-text-main space-y-1">
                      {sec.targetClients.map((tc, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sbloom-border" />
                          <span>{tc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-sbloom-border/70">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sbloom-text-muted font-mono">
                      Core Growth Framework
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sec.coreServices.map((cs, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-sbloom-surface border border-sbloom-border text-sbloom-text-secondary"
                        >
                          {cs}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-sbloom-border space-y-2 bg-sbloom-surface/50 -mx-7 -mb-7 p-6 rounded-b-3xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-sbloom-text-secondary">Typical Deal Size:</span>
                    <span className="font-mono font-bold text-sbloom-text-main">{sec.typicalDealSize}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-sbloom-violet">Affiliate Payout:</span>
                    <span className="font-mono font-bold text-sbloom-violet">{sec.affiliateEarning}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: KNOWLEDGE PLATFORM AND TOOLS
          ========================================================================= */}
      <section id="tools" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl mx-auto w-full">
        <div className="space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sbloom-violet">
              {content.knowledgePlatform.eyebrow}
            </span>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
              {content.knowledgePlatform.headline}
            </h2>
            <p className="text-sm sm:text-base text-sbloom-text-secondary leading-relaxed">
              {content.knowledgePlatform.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.knowledgePlatform.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-sbloom-border shadow-sbloom space-y-3 hover:shadow-sbloom-hover transition-all"
              >
                <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-sbloom-surface border border-sbloom-border text-sbloom-violet">
                  {feat.tag}
                </span>
                <h3 className={`text-lg font-bold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-sbloom-text-secondary leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9: WHO CAN JOIN
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-white border-y border-sbloom-border">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sbloom-magenta">
              {content.whoCanJoin.eyebrow}
            </span>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
              {content.whoCanJoin.headline}
            </h2>
            <p className="text-sm sm:text-base text-sbloom-text-secondary leading-relaxed">
              {content.whoCanJoin.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.whoCanJoin.profiles.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-sbloom-canvas border border-sbloom-border shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-sbloom-surface flex items-center justify-center font-mono font-bold text-sbloom-violet">
                    0{idx + 1}
                  </div>
                  <h3 className={`text-lg font-bold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
                    {p.category}
                  </h3>
                  <p className="text-xs text-sbloom-text-secondary leading-relaxed">
                    {p.whyFit}
                  </p>
                  <div className="pt-2 border-t border-sbloom-border text-[11px] text-sbloom-text-main">
                    <span className="font-bold text-sbloom-text-secondary">Network: </span>
                    {p.typicalNetwork}
                  </div>
                </div>

                <div className="pt-3 border-t border-sbloom-border text-xs font-mono font-bold text-sbloom-violet">
                  {p.expectedIncome}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-sbloom-surface border border-sbloom-border text-center max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm font-semibold text-sbloom-text-main">
              ✦ {content.whoCanJoin.reassurance}
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 10: EARNINGS AND COMPENSATION TRANSPARENCY & CALCULATOR
          ========================================================================= */}
      <section id="earnings" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl mx-auto w-full">
        <div className="space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sbloom-violet">
              {content.earningsTransparency.eyebrow}
            </span>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
              {content.earningsTransparency.headline}
            </h2>
            <p className="text-sm sm:text-base text-sbloom-text-secondary leading-relaxed">
              {content.earningsTransparency.description}
            </p>
          </div>

          {/* Transparent Tier Table Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.earningsTransparency.tiers.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-sbloom-border shadow-sbloom space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-sbloom-surface border border-sbloom-border text-sbloom-text-secondary">
                    Tier 0{idx + 1}
                  </span>
                  <span className="font-mono text-xl font-bold text-sbloom-violet">
                    {t.rate}
                  </span>
                </div>
                <h3 className={`text-lg font-bold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
                  {t.tierName}
                </h3>
                <p className="text-xs text-sbloom-text-secondary leading-relaxed">
                  {t.qualification}
                </p>
                <div className="pt-3 border-t border-sbloom-border text-xs font-mono font-bold text-sbloom-text-main">
                  Avg Earning: {t.avgPerDeal}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Calculator Slider Component */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-sbloom-border shadow-sbloom max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-1 pb-4 border-b border-sbloom-border">
              <h3 className={`text-2xl font-bold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
                {content.earningsTransparency.simulator.title}
              </h3>
              <p className="text-xs sm:text-sm text-sbloom-text-secondary">
                {content.earningsTransparency.simulator.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Sliders */}
              <div className="space-y-6">
                
                {/* Slider 1: Deals per quarter */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-sbloom-text-main">
                      {content.earningsTransparency.simulator.dealCountLabel}
                    </span>
                    <span className="font-mono font-bold text-sm text-sbloom-violet px-2.5 py-0.5 rounded-lg bg-sbloom-surface">
                      {dealCount} Deals
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={dealCount}
                    onChange={(e) => setDealCount(Number(e.target.value))}
                    className="w-full h-2 bg-sbloom-surface rounded-lg appearance-none cursor-pointer accent-sbloom-violet"
                  />
                  <div className="flex justify-between text-[10px] text-sbloom-text-muted font-mono">
                    <span>1 deal</span>
                    <span>5 deals</span>
                    <span>10 deals</span>
                  </div>
                </div>

                {/* Slider 2: Average Deal Size */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-sbloom-text-main">
                      {content.earningsTransparency.simulator.avgDealLabel}
                    </span>
                    <span className="font-mono font-bold text-sm text-sbloom-violet px-2.5 py-0.5 rounded-lg bg-sbloom-surface">
                      ₹{avgDealValue.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="300000"
                    step="25000"
                    value={avgDealValue}
                    onChange={(e) => setAvgDealValue(Number(e.target.value))}
                    className="w-full h-2 bg-sbloom-surface rounded-lg appearance-none cursor-pointer accent-sbloom-violet"
                  />
                  <div className="flex justify-between text-[10px] text-sbloom-text-muted font-mono">
                    <span>₹50,000</span>
                    <span>₹1,50,000</span>
                    <span>₹3,00,000</span>
                  </div>
                </div>

              </div>

              {/* Dynamic Projection Outcome Card */}
              <div className="p-6 rounded-2xl bg-sbloom-darkStage text-white space-y-4 flex flex-col justify-center">
                <div className="space-y-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-sbloom-lime font-bold">
                    {content.earningsTransparency.simulator.projectedQuarterly}
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                    ₹{quarterlyCommission.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-800 space-y-1">
                  <span className="text-xs text-gray-400">
                    {content.earningsTransparency.simulator.projectedMonthly}
                  </span>
                  <p className="text-xl font-bold font-mono text-sbloom-lime">
                    ₹{monthlyRunRate.toLocaleString('en-IN')} / month
                  </p>
                </div>

                <p className="text-[11px] text-gray-400 leading-relaxed pt-1">
                  {content.earningsTransparency.simulator.disclaimer}
                </p>
              </div>

            </div>

            {/* Core Financial Policies */}
            <div className="pt-6 border-t border-sbloom-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {content.earningsTransparency.policies.map((pol, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="font-bold text-sbloom-text-main">✓ {pol.title}</p>
                  <p className="text-sbloom-text-secondary leading-relaxed">{pol.description}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 11: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
          ========================================================================= */}
      <section id="faq" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-white border-y border-sbloom-border">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sbloom-magenta">
              {content.faq.eyebrow}
            </span>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
              {content.faq.headline}
            </h2>
            <p className="text-sm sm:text-base text-sbloom-text-secondary leading-relaxed">
              {content.faq.description}
            </p>
          </div>

          <div className="space-y-4">
            {content.faq.items.map((item, idx) => {
              const isOpen = openFaqIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-sbloom-border bg-sbloom-canvas overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 sm:py-5 text-left flex items-center justify-between space-x-4 hover:bg-sbloom-surface/60 transition-colors"
                  >
                    <span className={`text-sm sm:text-base font-bold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-sbloom-violet flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-sbloom-text-secondary leading-relaxed border-t border-sbloom-border/60 animate-in fade-in duration-150">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 12: FINAL CTA WITH THE DARK-STAGE VISUAL (#0E0B1E / #161226)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl sm:rounded-[36px] bg-sbloom-darkStage text-white p-8 sm:p-16 lg:p-20 overflow-hidden shadow-2xl border border-gray-800">
          
          {/* Ambient stage glows */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sbloom-violet/25 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-sbloom-lime/20 blur-3xl pointer-events-none" />

          {/* Glowing Culmination of "The Thread" */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 50 150 C 300 280, 700 40, 1100 180"
              fill="none"
              stroke="#D6F36B"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sbloom-darkCard border border-gray-700 shadow-sm">
              <Sparkles className="w-4 h-4 text-sbloom-lime animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-sbloom-lime">
                {content.finalCta.eyebrow}
              </span>
            </div>

            <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
              {content.finalCta.headline}
            </h2>

            <p className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {content.finalCta.description}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link to={affiliateCtaDestination}>
                <button className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl bg-sbloom-violet hover:bg-sbloom-violet-hover text-white text-base font-bold shadow-violet-glow transform hover:-translate-y-0.5 active:translate-y-0 transition-all">
                  <span>{content.finalCta.primaryCta}</span>
                  <ArrowRight className="w-5 h-5 text-sbloom-lime" />
                </button>
              </Link>

              <Link to="/app">
                <button className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold transition-colors">
                  {content.finalCta.secondaryCta}
                </button>
              </Link>
            </div>

            <p className="text-xs text-gray-400 font-mono pt-2">
              🔒 {content.finalCta.securityNote}
            </p>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 13: CONTACT AND ENQUIRIES
          ========================================================================= */}
      <section id="contact" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-sbloom-surface/50 border-t border-sbloom-border">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sbloom-violet">
              {content.contact.eyebrow}
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
              {content.contact.headline}
            </h2>
            <p className="text-xs sm:text-sm text-sbloom-text-secondary leading-relaxed">
              {content.contact.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {content.contact.channels.map((ch, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-sbloom-border shadow-sbloom space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-sbloom-surface border border-sbloom-border text-sbloom-text-secondary">
                      {ch.badge}
                    </span>
                    {idx === 0 ? (
                      <Mail className="w-4 h-4 text-sbloom-violet" />
                    ) : idx === 1 ? (
                      <PhoneCall className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Building2 className="w-4 h-4 text-sbloom-magenta" />
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-sbloom-text-main">
                    {ch.title}
                  </h3>
                  <p className="text-xs text-sbloom-text-secondary font-mono">
                    {ch.value}
                  </p>
                </div>

                <div className="pt-3 border-t border-sbloom-border">
                  <a
                    href={ch.href}
                    target={ch.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-sbloom-violet hover:underline"
                  >
                    <span>{ch.actionText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 14: FOOTER WITH LANGUAGE AND POLICY CONTROLS
          ========================================================================= */}
      <footer className="w-full border-t border-sbloom-border bg-white text-xs text-sbloom-text-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            
            {/* Brand column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-2xl bg-sbloom-darkStage flex items-center justify-center font-fraunces font-bold text-base text-sbloom-lime shadow-sm">
                  sB
                </div>
                <span className={`text-xl font-bold text-sbloom-text-main ${isTelugu ? 'font-teluguHeading' : 'font-fraunces'}`}>
                  sBLOOM
                </span>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-sbloom-surface border border-sbloom-border text-sbloom-text-secondary">
                  AFFILIATE
                </span>
              </div>
              <p className="text-xs text-sbloom-text-secondary leading-relaxed max-w-sm">
                {content.footer.aboutText}
              </p>

              {/* Footer Language Switcher */}
              <div className="flex items-center space-x-2 pt-2">
                <span className="text-xs font-semibold text-sbloom-text-main">Language:</span>
                <div className="inline-flex items-center p-1 rounded-xl bg-sbloom-surface border border-sbloom-border text-xs">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      language === 'en' ? 'bg-white text-sbloom-text-main shadow-2xs' : 'text-sbloom-text-secondary'
                    }`}
                  >
                    English
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
              </div>
            </div>

            {/* Navigation Columns */}
            {content.footer.columns.map((col, idx) => (
              <div key={idx} className="space-y-3">
                <p className="font-mono text-xs font-bold text-sbloom-text-main uppercase tracking-wider">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      {link.href.startsWith('/') ? (
                        <Link
                          to={link.href}
                          className="hover:text-sbloom-violet transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="hover:text-sbloom-violet transition-colors"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>

          {/* Bottom Copyright & Compliance Bar */}
          <div className="pt-8 border-t border-sbloom-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sbloom-text-muted">
            <p>{content.footer.copyright}</p>
            <p className="text-center sm:text-right">{content.footer.legalNote}</p>
          </div>

        </div>
      </footer>

    </div>
  );
};
