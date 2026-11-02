import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Table, Column } from '../../components/ui/Table';
import { INITIAL_SAMPLE_LEADS, Lead } from '../../data/sampleLeads';
import { 
  Users2, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  DollarSign, 
  Building 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AdminDashboardPage: React.FC = () => {
  const { t } = useLanguage();

  const adminStats = [
    { label: 'Active Affiliates', value: '28 Partners', change: '+4 this month', icon: Users2, color: 'text-sbloom-violet' },
    { label: 'Total Pipeline Leads', value: '94 Submissions', change: '84% verified', icon: TrendingUp, color: 'text-[#6fa014]' },
    { label: 'Pending Payout Approval', value: '₹1,85,000', change: '6 settlements queued', icon: Clock, color: 'text-amber-500' },
    { label: 'Total Ecosystem Volume', value: '₹34,80,000', change: 'FY 2026-27', icon: DollarSign, color: 'text-sbloom-magenta' },
  ];

  const columns: Column<Lead>[] = [
    {
      header: 'Reference',
      render: (row) => <span className="font-mono font-bold text-sbloom-violet">{row.id}</span>,
    },
    {
      header: 'Referred Client',
      render: (row) => (
        <div>
          <span className="font-semibold block">{row.clientName}</span>
          <span className="text-[11px] text-sbloom-text-secondary">{row.companyName}</span>
        </div>
      ),
    },
    {
      header: 'Partner Attribution',
      render: () => <span className="font-medium text-xs">Harshitha Rao (SBLOOM-HARSHI-78)</span>,
    },
    {
      header: 'Service Tier',
      accessor: 'serviceName',
    },
    {
      header: 'Current Status',
      render: (row) => <StatusBadge status={row.status} size="sm" />,
    },
    {
      header: 'Est. Commission',
      render: (row) => (
        <span className="font-bold font-fraunces text-xs text-sbloom-text-main">
          {row.commissionEst}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Admin Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sbloom-admin text-sbloom-lime text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Oversight Console</span>
          </div>
          <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-sbloom-text-main">
            Ecosystem Overview & Control
          </h2>
          <p className="text-xs sm:text-sm text-sbloom-text-secondary mt-1">
            Monitor partner acquisition pipelines, audit referral attribution, and authorize payouts.
          </p>
        </div>

        <Link to="/admin/leads">
          <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Manage Pipeline Leads
          </Button>
        </Link>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} variant="canvas" padding="md">
              <div className="flex items-center justify-between text-sbloom-text-secondary mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
                <div className="w-8 h-8 rounded-xl bg-sbloom-surface flex items-center justify-center">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold font-fraunces text-sbloom-text-main">
                {stat.value}
              </div>
              <p className="text-[11px] text-sbloom-text-secondary mt-1">
                {stat.change}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Cross-Affiliate Pipeline Submissions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-fraunces text-xl font-bold text-sbloom-text-main">
              Recent Partner Lead Submissions
            </h3>
            <p className="text-xs text-sbloom-text-secondary">
              Latest client opportunities registered by affiliates awaiting qualification.
            </p>
          </div>
          <Link to="/admin/leads">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Open Lead Manager
            </Button>
          </Link>
        </div>

        <Table
          columns={columns}
          data={INITIAL_SAMPLE_LEADS}
          keyExtractor={(item) => item.id}
        />
      </div>

    </div>
  );
};
