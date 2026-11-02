import React, { useState } from 'react';
import { INITIAL_SAMPLE_LEADS } from '../../data/sampleLeads';
import type { Lead, LeadStatus } from '../../data/sampleLeads';

import { Table } from '../../components/ui/Table';
import type { Column } from '../../components/ui/Table';
import { StatusBadge } from '../../components/ui/StatusBadge';

import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ConfirmationDialog } from '../../components/ui/Modal';
import { Search, Filter, CheckCircle2, ShieldCheck, Edit3 } from 'lucide-react';

export const AdminLeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_SAMPLE_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Status Change Dialog State
  const [selectedLeadForUpdate, setSelectedLeadForUpdate] = useState<Lead | null>(null);
  const [newStatus, setNewStatus] = useState<LeadStatus>('Qualified');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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

  const handleOpenStatusModal = (lead: Lead, targetStatus: LeadStatus) => {
    setSelectedLeadForUpdate(lead);
    setNewStatus(targetStatus);
    setShowStatusModal(true);
  };

  const handleConfirmStatusChange = () => {
    if (!selectedLeadForUpdate) return;

    setIsUpdating(true);
    setTimeout(() => {
      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLeadForUpdate.id ? { ...l, status: newStatus } : l))
      );
      setIsUpdating(false);
      setShowStatusModal(false);
      setSuccessMsg(`Status for ${selectedLeadForUpdate.id} updated to ${newStatus}`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 400);
  };

  const columns: Column<Lead>[] = [
    {
      header: 'Reference',
      render: (row) => <span className="font-mono font-bold text-sbloom-violet">{row.id}</span>,
    },
    {
      header: 'Client / Organization',
      render: (row) => (
        <div>
          <span className="font-semibold block">{row.clientName}</span>
          <span className="text-[11px] text-sbloom-text-secondary">{row.companyName}</span>
        </div>
      ),
    },
    {
      header: 'Contact Info',
      render: (row) => (
        <div className="text-[11px]">
          <span>{row.email}</span>
          <span className="block text-sbloom-text-secondary">{row.phone}</span>
        </div>
      ),
    },
    {
      header: 'Service Referred',
      accessor: 'serviceName',
    },
    {
      header: 'Current Status',
      render: (row) => <StatusBadge status={row.status} size="sm" />,
    },
    {
      header: 'Commission',
      render: (row) => (
        <span className="font-bold font-fraunces text-xs text-sbloom-text-main">
          {row.commissionEst}
        </span>
      ),
    },
    {
      header: 'Admin Status Action',
      render: (row) => (
        <div className="flex items-center space-x-1">
          {row.status !== 'Converted' && (
            <button
              onClick={() => handleOpenStatusModal(row, 'Converted')}
              className="px-2 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              Convert Deal
            </button>
          )}
          {row.status === 'Pending' && (
            <button
              onClick={() => handleOpenStatusModal(row, 'Qualified')}
              className="px-2 py-1 rounded-md text-[11px] font-semibold bg-lime-50 text-lime-900 hover:bg-lime-100 transition-colors"
            >
              Qualify
            </button>
          )}
          {row.status !== 'Rejected' && (
            <button
              onClick={() => handleOpenStatusModal(row, 'Rejected')}
              className="px-2 py-1 rounded-md text-[11px] font-semibold bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
            >
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-sbloom-text-main">
            Central Lead Management & Auditing
          </h2>
          <p className="text-xs sm:text-sm text-sbloom-text-secondary mt-1">
            Review partner-submitted client deals, verify attribution integrity, and transition pipeline statuses.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center space-x-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">{successMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-sbloom-border shadow-sbloom">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search by client, company or lead ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-sbloom-admin text-sbloom-lime shadow-2xs'
                  : 'bg-sbloom-surface text-sbloom-text-secondary hover:text-sbloom-text-main hover:bg-[#ebd9c7]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredLeads}
        keyExtractor={(item) => item.id}
        emptyMessage="No leads found matching your criteria in the admin audit log."
      />

      {/* Status Update Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onConfirm={handleConfirmStatusChange}
        title={`Change Lead Status to ${newStatus}`}
        description={`Are you sure you want to change the status of ${selectedLeadForUpdate?.clientName} (${selectedLeadForUpdate?.id}) to "${newStatus}"? This will trigger automated commission calculations for the attributed partner.`}
        confirmLabel={`Set to ${newStatus}`}
        variant={newStatus === 'Rejected' ? 'danger' : 'primary'}
        isLoading={isUpdating}
      />

    </div>
  );
};
