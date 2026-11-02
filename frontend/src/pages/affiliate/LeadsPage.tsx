import React, { useState } from 'react';
import { INITIAL_SAMPLE_LEADS, Lead, LeadStatus } from '../../data/sampleLeads';
import { Table, Column } from '../../components/ui/Table';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { LeadDrawer } from '../../components/features/LeadDrawer';
import { DemoDataNotice } from '../../components/ui/DemoDataNotice';
import { PlusCircle, Search, Filter, Sparkles, Building, Eye } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LeadsPage: React.FC = () => {
  const { t } = useLanguage();
  const [leads, setLeads] = useState<Lead[]>(INITIAL_SAMPLE_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'view'>('create');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const statuses: ('All' | LeadStatus)[] = ['All', 'Pending', 'Contacted', 'Qualified', 'Converted', 'Rejected'];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const columns: Column<Lead>[] = [
    {
      header: 'Lead ID',
      render: (row) => <span className="font-mono font-bold text-sbloom-violet">{row.id}</span>,
    },
    {
      header: 'Client & Company',
      render: (row) => (
        <div>
          <span className="font-semibold text-sbloom-text-main block">{row.clientName}</span>
          <span className="text-[11px] text-sbloom-text-secondary flex items-center space-x-1 mt-0.5">
            <Building className="w-3 h-3 text-sbloom-text-secondary" />
            <span>{row.companyName}</span>
          </span>
        </div>
      ),
    },
    {
      header: 'Referred Service',
      accessor: 'serviceName',
    },
    {
      header: 'Pipeline Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Est. Deal Value',
      accessor: 'estimatedValue',
    },
    {
      header: 'Est. Commission',
      render: (row) => (
        <span className="font-bold font-fraunces text-xs text-sbloom-text-main">
          {row.commissionEst}
        </span>
      ),
    },
    {
      header: 'Submitted',
      accessor: 'submittedDate',
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
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-sbloom-text-main">
            {t('myLeads')}
          </h2>
          <p className="text-xs sm:text-sm text-sbloom-text-secondary mt-1">
            Track client referrals from initial pitch to deal conversion and commission clearance.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleOpenCreateDrawer}
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          {t('submitLead')}
        </Button>
      </div>

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

      {/* Leads Table */}
      <Table
        columns={columns}
        data={filteredLeads}
        keyExtractor={(item) => item.id}
        emptyMessage="No customer leads match the selected filter or search term."
        onRowClick={(row) => handleOpenViewDrawer(row)}
      />

      {/* Lead Drawer */}
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
