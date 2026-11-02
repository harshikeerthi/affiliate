import React, { useState, useEffect, useCallback } from 'react';
import { Table } from '../../components/ui/Table';
import type { Column } from '../../components/ui/Table';


import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { LeadDrawer } from '../../components/features/LeadDrawer';
import { DemoDataNotice } from '../../components/ui/DemoDataNotice';
import { PlusCircle, Search, Sparkles, Building, Eye, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { apiClient } from '../../services/api';
import type { LeadItem, ServiceCatalogItem } from '../../types/api';

export const LeadsPage: React.FC = () => {
  const { t } = useLanguage();
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [services, setServices] = useState<ServiceCatalogItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'view'>('create');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  const statuses = ['All', 'Pending', 'Contacted', 'Qualified', 'Converted', 'Rejected'] as const;

  // Load leads from FastAPI backend: GET /api/v1/leads
  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setServerError(null);
    try {
      const response = await apiClient.getLeads({
        status: statusFilter !== 'All' ? statusFilter : undefined,
        search: searchTerm.trim() || undefined,
      });
      setLeads(response.leads || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch leads from backend.';
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, searchTerm]);

  // Load services for LeadDrawer dropdown
  const fetchServices = async () => {
    try {
      const data = await apiClient.getServices();
      setServices(data.services || []);
    } catch {
      // Services will fallback to static defaults in LeadDrawer if API unavailable
    }
  };


  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    fetchServices();
  }, []);

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
    // Add new lead at the top of the list immediately
    setLeads((prev) => [newLead, ...prev]);
  };

  const columns: Column<LeadItem>[] = [
    {
      header: 'Reference ID',
      render: (row) => (
        <span className="font-mono font-bold text-sbloom-violet text-xs">
          {row.reference_number || row.id}
        </span>
      ),
    },
    {
      header: 'Client & Business',
      render: (row) => (
        <div>
          <span className="font-semibold text-sbloom-text-main block">{row.contact_name}</span>
          <span className="text-[11px] text-sbloom-text-secondary flex items-center space-x-1 mt-0.5">
            <Building className="w-3 h-3 text-sbloom-text-secondary" />
            <span>{row.business_name}</span>
          </span>
        </div>
      ),
    },
    {
      header: 'Referred Service',
      render: (row) => (
        <span className="text-xs text-sbloom-text-secondary">
          {row.services_of_interest?.length ? row.services_of_interest.join(', ') : 'Enterprise Pipeline'}
        </span>
      ),
    },
    {
      header: 'Pipeline Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Est. Deal Value',
      render: (row) => (
        <span className="text-xs font-semibold text-sbloom-text-main">
          {row.estimated_value}
        </span>
      ),
    },
    {
      header: 'Est. Commission (Demo)',
      render: (row) => (
        <div>
          <span className="font-bold font-fraunces text-xs text-sbloom-text-main block">
            {row.estimated_commission}
          </span>
          <span className="text-[9px] text-amber-700 font-medium">Temporary estimate</span>
        </div>
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
    {
      header: 'Action',
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpenViewDrawer(row);
          }}
          className="p-1.5 rounded-lg text-sbloom-text-secondary hover:text-sbloom-violet hover:bg-sbloom-surface transition-colors"
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Demo Notice */}
      <DemoDataNotice />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-sbloom-text-main">
            {t('myLeads')}
          </h2>
          <p className="text-xs sm:text-sm text-sbloom-text-secondary mt-1">
            Connected to FastAPI backend: <code className="text-xs font-mono bg-sbloom-surface px-1.5 py-0.5 rounded text-sbloom-violet">GET /api/v1/leads</code>. Track customer referrals in real-time.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="md"
            onClick={fetchLeads}
            disabled={isLoading}
            leftIcon={<RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}
          >
            Refresh
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

      {/* Server Error Alert */}
      {serverError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start justify-between text-xs">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Failed to load leads from backend: </span>
              <span>{serverError}</span>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={fetchLeads}>
            Try Again
          </Button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-sbloom-border shadow-sbloom">
        <div className="w-full sm:w-80">
          <Input
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-sbloom-violet text-white shadow-2xs'
                  : 'bg-sbloom-surface text-sbloom-text-secondary hover:text-sbloom-text-main hover:bg-[#ebd9c7]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table / Loading Skeleton */}
      {isLoading ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-sbloom-border space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin text-sbloom-violet mx-auto" />
          <p className="text-xs text-sbloom-text-secondary">Loading leads from FastAPI backend...</p>
        </div>
      ) : (
        <Table
          columns={columns}
          data={leads}
          keyExtractor={(item) => item.id}
          emptyMessage="No customer leads found. Click 'Submit Lead' above to register your first client referral."
          onRowClick={(row) => handleOpenViewDrawer(row)}
        />
      )}

      {/* Lead Drawer (Connected to FastAPI POST /api/v1/leads) */}
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

