import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Table } from '../../components/ui/Table';
import type { Column } from '../../components/ui/Table';
import { EARNINGS_METRICS } from '../../data/sampleEarnings';

import { 
  Wallet, 
  Clock, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle2, 
  Download, 
  CreditCard,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

interface CommissionRecord {
  id: string;
  leadId: string;
  client: string;
  service: string;
  amount: string;
  clearedDate: string;
  status: 'Paid' | 'Processing';
}

export const EarningsPage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const commissionHistory: CommissionRecord[] = [
    {
      id: 'COMM-8812',
      leadId: 'LEAD-9041',
      client: 'Apex Cloud Solutions',
      service: 'Enterprise Agentic AI Pipeline',
      amount: '₹45,000',
      clearedDate: '24 Oct 2026',
      status: 'Paid',
    },
    {
      id: 'COMM-8813',
      leadId: 'LEAD-9038',
      client: 'Vanguard Media Group',
      service: 'Omnichannel Creator Funnel Suite',
      amount: '₹17,500',
      clearedDate: '18 Oct 2026',
      status: 'Paid',
    },
    {
      id: 'COMM-8814',
      leadId: 'LEAD-9042',
      client: 'Nava Digital Agency',
      service: 'Autonomous Workflow Automation',
      amount: '₹18,500',
      clearedDate: 'Expected 10 Nov 2026',
      status: 'Processing',
    },
    {
      id: 'COMM-8815',
      leadId: 'LEAD-9044',
      client: 'Kaizen FinTech Labs',
      service: 'Creator Data Intelligence Engine',
      amount: '₹19,500',
      clearedDate: 'Expected 10 Nov 2026',
      status: 'Processing',
    },
  ];

  const columns: Column<CommissionRecord>[] = [
    {
      header: 'Commission ID',
      render: (row) => <span className="font-mono font-bold text-sbloom-violet">{row.id}</span>,
    },
    {
      header: 'Client / Reference',
      render: (row) => (
        <div>
          <span className="font-semibold block">{row.client}</span>
          <span className="text-[11px] text-sbloom-text-secondary font-mono">{row.leadId}</span>
        </div>
      ),
    },
    {
      header: 'Promoted Service',
      accessor: 'service',
    },
    {
      header: 'Payout Amount',
      render: (row) => (
        <span className="font-bold font-fraunces text-xs text-sbloom-text-main">
          {row.amount}
        </span>
      ),
    },
    {
      header: 'Settlement Date',
      accessor: 'clearedDate',
    },
    {
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} size="sm" />,
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-sbloom-text-main">
            {t('earnings')} & Payout Settlements
          </h2>
          <p className="text-xs sm:text-sm text-sbloom-text-secondary mt-1">
            Track earned referral commissions, upcoming disbursements, and settlement cycles.
          </p>
        </div>

        <Link to="/app/invoices">
          <Button variant="outline" size="md" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
            View Monthly Invoices
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        <Card variant="canvas" padding="lg">
          <div className="flex items-center justify-between text-sbloom-text-secondary mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Cleared Earnings</span>
            <div className="w-9 h-9 rounded-xl bg-sbloom-lime/30 text-sbloom-text-main flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold font-fraunces text-sbloom-text-main">
            {EARNINGS_METRICS.totalCleared}
          </div>
          <p className="text-xs text-sbloom-text-secondary mt-1">
            Settled to your verified bank account
          </p>
        </Card>

        <Card variant="canvas" padding="lg">
          <div className="flex items-center justify-between text-sbloom-text-secondary mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Clearance</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold font-fraunces text-sbloom-text-main">
            {EARNINGS_METRICS.pendingPayout}
          </div>
          <p className="text-xs text-sbloom-text-secondary mt-1">
            Disbursing on {EARNINGS_METRICS.nextPayoutDate}
          </p>
        </Card>

        <Card variant="canvas" padding="lg">
          <div className="flex items-center justify-between text-sbloom-text-secondary mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Payout Account</span>
            <div className="w-9 h-9 rounded-xl bg-sbloom-violet/15 text-sbloom-violet flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="text-lg font-bold font-fraunces text-sbloom-text-main truncate mt-1">
            {user?.payoutUpi || 'harshitha@oksbi'}
          </div>
          <p className="text-xs text-sbloom-text-secondary mt-1 flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#6fa014]" />
            <span>Direct UPI / NEFT Verified</span>
          </p>
        </Card>

      </div>

      {/* Commission Ledger Table */}
      <div className="space-y-4">
        <h3 className="font-fraunces text-xl font-bold text-sbloom-text-main">
          Commission Ledger & Activity
        </h3>

        <Table
          columns={columns}
          data={commissionHistory}
          keyExtractor={(item) => item.id}
        />
      </div>

    </div>
  );
};
