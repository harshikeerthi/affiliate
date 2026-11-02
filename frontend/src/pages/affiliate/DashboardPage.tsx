import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  Clock, 
  Users, 
  TrendingUp, 
  PlusCircle, 
  Copy, 
  Check, 
  ArrowRight,
  Sparkles,
  Briefcase,
  RefreshCw,
  AlertTriangle 
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Table } from '../../components/ui/Table';
import type { Column } from '../../components/ui/Table';
import { LeadDrawer } from '../../components/features/LeadDrawer';

import { DemoDataNotice } from '../../components/ui/DemoDataNotice';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { apiClient } from '../../services/api';
import type { LeadItem, ServiceCatalogItem } from '../../types/api';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [services, setServices] = useState<ServiceCatalogItem[]>([]);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [drawerMode, setDrawerMode] = useState<'view' | 'create'>('create');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [leadsRes, servicesRes] = await Promise.all([
        apiClient.getLeads({ limit: 10 }),
        apiClient.getServices(),
      ]);
      setLeads(leadsRes.leads || []);
      setServices(servicesRes.services || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to connect to backend.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchDashboardData();
  }, []);

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

  const handleOpenViewDrawer = (lead: LeadItem) => {
    setSelectedLead(lead);
    setDrawerMode('view');
    setIsDrawerOpen(true);
  };

  const handleLeadCreated = (newLead: LeadItem) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const recentLeads = leads.slice(0, 4);

  // Dynamic calculations for demo metrics
  const convertedCount = leads.filter((l) => l.status === 'Converted').length;
  const pendingCount = leads.filter((l) => l.status === 'Pending' || l.status === 'Contacted').length;

  const columns: Column<LeadItem>[] = [
    {
      header: 'Reference',
      render: (row) => (
        <span className="font-mono font-bold text-sbloom-violet text-xs">
          {row.reference_number || row.id}
        </span>
      ),
    },
    {
      header: 'Client / Business',
      render: (row) => (
        <div>
          <span className="font-semibold block text-sbloom-text-main">{row.contact_name}</span>
          <span className="text-[11px] text-sbloom-text-secondary">{row.business_name}</span>
        </div>
      ),
    },
    {
      header: 'Service Referred',
      render: (row) => (
        <span className="text-xs text-sbloom-text-secondary">
          {row.services_of_interest?.length ? row.services_of_interest.join(', ') : 'Enterprise Pipeline'}
        </span>
      ),
    },
    {
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} size="sm" />,
    },
    {
      header: 'Est. Commission (Demo)',
      render: (row) => (
        <span className="font-bold font-fraunces text-xs text-sbloom-text-main">
          {row.estimated_commission}
        </span>
      ),
    },
    {
      header: 'Submitted',
      render: (row) => (
        <span className="text-xs text-sbloom-text-secondary">
          {row.created_at ? new Date(row.created_at).toLocaleDateString() : 'Just now'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Demo Notice */}
      <DemoDataNotice />

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

      {/* Backend Alert if disconnected */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start justify-between text-xs">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Backend Communication Warning: </span>
              <span>{error}</span>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={fetchDashboardData}>
            Retry
          </Button>
        </div>
      )}

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
          <p className="text-[10px] text-amber-700 font-medium mt-1">
            Simulated demonstration metric
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
            {pendingCount} Active
          </div>
          <p className="text-[11px] text-sbloom-text-secondary mt-1">
            In review / qualification
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
            {convertedCount} Closed
          </div>
          <p className="text-[11px] text-sbloom-text-secondary mt-1">
            {leads.length} total referrals recorded
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
            {leads.length > 0 ? `${((convertedCount / leads.length) * 100).toFixed(1)}%` : '0%'}
          </div>
          <p className="text-[11px] text-sbloom-text-secondary mt-1">
            Based on recorded leads
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
              Real-time records from FastAPI backend <code className="font-mono text-sbloom-violet">GET /api/v1/leads</code>
            </p>
          </div>
          <Link to="/app/leads">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              View All Leads ({leads.length})
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="p-8 text-center rounded-2xl bg-white border border-sbloom-border space-y-2">
            <RefreshCw className="w-5 h-5 animate-spin text-sbloom-violet mx-auto" />
            <p className="text-xs text-sbloom-text-secondary">Syncing with FastAPI backend...</p>
          </div>
        ) : (
          <Table
            columns={columns}
            data={recentLeads}
            keyExtractor={(item) => item.id}
            emptyMessage="No customer leads recorded yet. Click 'Submit Lead' to get started."
            onRowClick={(row) => handleOpenViewDrawer(row)}
          />
        )}
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
                From FastAPI catalog: <code className="font-mono text-sbloom-violet">GET /api/v1/services</code>
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
          {services.slice(0, 2).map((srv) => (
            <div
              key={srv.id}
              className="p-4 rounded-2xl bg-sbloom-surface border border-sbloom-border flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-sbloom-text-main">{srv.name}</span>
                  <span className="text-xs font-bold text-sbloom-violet px-2 py-0.5 rounded-md bg-white border border-sbloom-border">
                    {srv.commission_rate} Rate
                  </span>
                </div>
                <p className="text-xs text-sbloom-text-secondary leading-snug">
                  {srv.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-sbloom-border/70 flex items-center justify-between text-xs">
                <span className="font-semibold text-sbloom-text-main">Avg: {srv.avg_commission}</span>
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
        servicesList={services}
        onLeadCreated={handleLeadCreated}
      />

    </div>
  );
};

