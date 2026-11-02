import React from 'react';

export type BadgeStatus =
  | 'Pending'
  | 'Contacted'
  | 'Qualified'
  | 'Converted'
  | 'Rejected'
  | 'Paid'
  | 'Processing'
  | 'Draft'
  | 'Active';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const normalized = status.toLowerCase();

  let colorClasses = 'bg-gray-100 text-gray-800 border-gray-200';
  let dotColor = 'bg-gray-400';

  if (normalized === 'pending') {
    colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
    dotColor = 'bg-amber-500';
  } else if (normalized === 'contacted') {
    colorClasses = 'bg-purple-50 text-purple-800 border-purple-200';
    dotColor = 'bg-sbloom-violet';
  } else if (normalized === 'qualified') {
    colorClasses = 'bg-lime-50 text-lime-900 border-lime-300';
    dotColor = 'bg-[#6fa014]';
  } else if (normalized === 'converted' || normalized === 'paid' || normalized === 'active') {
    colorClasses = 'bg-emerald-50 text-emerald-900 border-emerald-200';
    dotColor = 'bg-emerald-500';
  } else if (normalized === 'rejected') {
    colorClasses = 'bg-red-50 text-red-700 border-red-200';
    dotColor = 'bg-red-500';
  } else if (normalized === 'processing') {
    colorClasses = 'bg-indigo-50 text-indigo-800 border-indigo-200';
    dotColor = 'bg-indigo-500';
  } else if (normalized === 'draft') {
    colorClasses = 'bg-orange-50 text-orange-800 border-orange-200';
    dotColor = 'bg-orange-500';
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center space-x-1.5 rounded-full font-medium border ${colorClasses} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span className="capitalize">{status}</span>
    </span>
  );
};
