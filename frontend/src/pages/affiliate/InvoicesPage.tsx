import React, { useState } from 'react';
import { SAMPLE_INVOICES } from '../../data/sampleEarnings';
import type { InvoiceItem } from '../../data/sampleEarnings';

import { Table } from '../../components/ui/Table';
import type { Column } from '../../components/ui/Table';
import { StatusBadge } from '../../components/ui/StatusBadge';

import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { FileText, Download, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const InvoicesPage: React.FC = () => {
  const { t } = useLanguage();
  const [invoices] = useState<InvoiceItem[]>(SAMPLE_INVOICES);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownloadInvoice = (invNumber: string) => {
    setDownloadSuccess(invNumber);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const columns: Column<InvoiceItem>[] = [
    {
      header: 'Invoice Reference',
      render: (row) => (
        <span className="font-mono font-bold text-sbloom-violet">{row.invoiceNumber}</span>
      ),
    },
    {
      header: 'Payout Period',
      accessor: 'payoutPeriod',
    },
    {
      header: 'Generated Date',
      accessor: 'generatedDate',
    },
    {
      header: 'Total Disbursed',
      render: (row) => (
        <span className="font-bold font-fraunces text-xs text-sbloom-text-main">
          {row.amount}
        </span>
      ),
    },
    {
      header: 'Disbursement Method',
      accessor: 'payoutMethod',
    },
    {
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Document',
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDownloadInvoice(row.invoiceNumber)}
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          Download PDF
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-sbloom-text-main">
            {t('invoices')} & Payment Vouchers
          </h2>
          <p className="text-xs sm:text-sm text-sbloom-text-secondary mt-1">
            Download verified tax-compliant disbursement vouchers and monthly commission summaries.
          </p>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center space-x-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            Demonstration invoice voucher <span className="font-mono font-bold">{downloadSuccess}</span> generated and downloaded.
          </span>
        </div>
      )}

      {/* Invoices Table */}
      <Table
        columns={columns}
        data={invoices}
        keyExtractor={(item) => item.id}
      />

      {/* Tax & Payout Compliance Notice */}
      <Card variant="canvas" padding="md">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-sbloom-surface flex items-center justify-center text-sbloom-violet flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-fraunces font-bold text-sm text-sbloom-text-main">
              Tax Deducted at Source (TDS) & Compliance
            </h4>
            <p className="text-sbloom-text-secondary leading-relaxed">
              In accordance with Indian tax regulations, TDS (Section 194H) is deducted at applicable rates on commission disbursements exceeding statutory thresholds. Annual Form 16A certificates are uploaded to your profile at the end of each financial quarter.
            </p>
          </div>
        </div>
      </Card>

    </div>
  );
};
