import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  Clock, 
  Users, 
  TrendingUp, 
  PlusCircle, 
  Copy, 
  Check, 
  ExternalLink,
  ArrowRight,
  Sparkles,
  Briefcase
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Table, Column } from '../../components/ui/Table';
import { LeadDrawer } from '../../components/features/LeadDrawer';
import { INITIAL_SAMPLE_LEADS, Lead } from '../../data/sampleLeads';
import { SAMPLE_SERVICES } from '../../data/sampleServices';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [leads, setLeads] = useState<Lead[]>(INITIAL_SAMPLE_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerMode, setDrawerMode] = useState<'view' | 'create'>('create');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(`${window.location.origin}/?ref=${user.referralCode}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleOpenCreateDrawer = () => {
    setSelectedLead(null);
    setDrawerMode('create');
    setIsDrawerOpen(true);
  };

  const handleOpenViewDrawer = (lead: Lead) => {
    setSelectedLead(lead);
    setDrawerMode('view');
    setIsDrawerOpen(true);
  };

  const handleAddNewLead = (newLeadData: Omit<Lead, 'id' | 'submittedDate' | 'isDemoSample'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: `LEAD-${Math.floor(9050 + Math.random() * 100)}`,
      submittedDate: 'Just now',
      isDemoSample: true,
    };
    setLeads([newLead, ...leads]);
  };

  const recentLeads = leads.slice(0, 4);

  const columns: Column<Lead>[] = [
    {
      header: 'Reference',
      render: (row) => <span className="font-mono font-bold text-sbloom-violet">{row.id}</span>,
    },
    {
      header: 'Client / Company',
      render: (row) => (
        <div>
          <span className="font-semibold block">{row.clientName}</span>
          <span className="text-[11px] text-sbloom-text-secondary">{row.companyName}</span>
        </div>
      ),
    },
    {
      header: 'Service Referred',
      accessor: 'serviceName',
    },
    {
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} size="sm" />,
    },
    {
      header: 'Est. Commission',
      render: (row) => <span className="font-bold font-fraunces text-xs">{row.commissionEst}</span>,
    },
    {
      header: 'Date',
      accessor: 'submittedDate',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner Card */}
      <div className="relative rounded-3xl bg-gradient-to-r from-sbloom-surface via-[#f7f2e9] to-white border border-sbloom-border p-6 sm:p-8 overflow-hidden shadow-sbloom">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-sbloom-border text-xs font-semibold text-sbloom-violet shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Partner Workspace Active</span>
            </div>
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-sbloom-text-main">
              {t('welcomeBack')}, {user?.name || 'Partner'}
            </h2>
            <p className="text-xs sm:text-sm text-sbloom-text-secondary leading-relaxed">
              Your affiliate referral link is live and tracking deals. Submit new customer leads or share your custom URL to earn up to 25% commissions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={handleCopyLink}
              leftIcon={copiedLink ? <Check className="w-4 h-4 text-sbloom-violet" /> : <Copy className="w-4 h-4" />}
            >
              {copiedLink ? t('linkCopied') : t('copyAffiliateLink')}
            </Button>
            
            <Button
              variant="primary"
              size="md"
              onClick={handleOpenCreateDrawer}
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              {t('submitLead')}
            </Button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card variant="canvas" padding="md">
          <div className="flex items-center justify-between text-sbloom-text-secondary mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t('totalEarnings')}</span>
            <div className="w-8 h-8 rounded-xl bg-sbloom-lime/30 text-sbloom-text-main flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-fraunces text-sbloom-text-main">
            ₹1,42,500
          </div>
          <p className="text-[11px] text-sbloom-text-secondary mt-1 flex items-center space-x-1">
            <span className="text-[#6fa014] font-bold">+18.4%</span>
            <span>vs previous month</span>
          </p>
        </Card>

        <Card variant="canvas" padding="md">
          <div className="flex items-center justify-between text-sbloom-text-secondary mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t('pendingCommission')}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-fraunces text-sbloom-text-main">
            ₹38,000
          </div>
          <p className="text-[11px] text-sbloom-text-secondary mt-1">
            2 deals in final audit stage
          </p>
        </Card>

        <Card variant="canvas" padding="md">
          <div className="flex items-center justify-between text-sbloom-text-secondary mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t('convertedLeads')}</span>
            <div className="w-8 h-8 rounded-xl bg-sbloom-violet/15 text-sbloom-violet flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-fraunces text-sbloom-text-main">
            12 Deals
          </div>
          <p className="text-[11px] text-sbloom-text-secondary mt-1">
            Lifetime closed clients
          </p>
        </Card>

        <Card variant="canvas" padding="md">
          <div className="flex items-center justify-between text-sbloom-text-secondary mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t('conversionRate')}</span>
            <div className="w-8 h-8 rounded-xl bg-sbloom-magenta/15 text-sbloom-magenta flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-fraunces text-sbloom-text-main">
            28.5%
          </div>
          <p className="text-[11px] text-sbloom-text-secondary mt-1">
            Above ecosystem average (21%)
          </p>
        </Card>

      </div>

      {/* Recent Leads Table & Action Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-fraunces text-xl font-bold text-sbloom-text-main">
              Recent Lead Activity
            </h3>
            <p className="text-xs text-sbloom-text-secondary">
              Click any lead row to audit attribution and commission timeline.
            </p>
          </div>
          <Link to="/app/leads">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              View All Leads ({leads.length})
            </Button>
          </Link>
        </div>

        <Table
          columns={columns}
          data={recentLeads}
          keyExtractor={(item) => item.id}
          onRowClick={(row) => handleOpenViewDrawer(row)}
        />
      </div>

      {/* Featured Services Mini Showcase */}
      <div className="rounded-3xl bg-white border border-sbloom-border p-6 shadow-sbloom space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-sbloom-violet/10 flex items-center justify-center text-sbloom-violet">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-fraunces text-base font-bold text-sbloom-text-main">
                Top Services Ready for Promotion
              </h4>
              <p className="text-[11px] text-sbloom-text-secondary">
                Generate custom referral links and access client pitches.
              </p>
            </div>
          </div>
          <Link to="/app/services">
            <span className="text-xs font-semibold text-sbloom-violet hover:underline flex items-center space-x-1">
              <span>View Catalog</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_SERVICES.slice(0, 2).map((srv) => (
            <div
              key={srv.id}
              className="p-4 rounded-2xl bg-sbloom-surface border border-sbloom-border flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-sbloom-text-main">{srv.name}</span>
                  <span className="text-xs font-bold text-sbloom-violet px-2 py-0.5 rounded-md bg-white border border-sbloom-border">
                    {srv.commissionRate} Rate
                  </span>
                </div>
                <p className="text-xs text-sbloom-text-secondary leading-snug">
                  {srv.tagline}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-sbloom-border/70 flex items-center justify-between text-xs">
                <span className="font-semibold text-sbloom-text-main">Avg: {srv.avgCommission}</span>
                <Link to="/app/leads">
                  <Button variant="primary" size="sm">
                    Refer Client
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drawer */}
      <LeadDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedLead={selectedLead}
        mode={drawerMode}
        onSubmitLead={handleAddNewLead}
      />

    </div>
  );
};
