import React, { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'No records found matching your filters.',
  onRowClick,
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-sbloom-border text-center">
        <div className="w-12 h-12 rounded-2xl bg-sbloom-surface flex items-center justify-center text-sbloom-text-secondary mb-3">
          <Inbox className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-semibold text-sbloom-text-main">No Records Available</h4>
        <p className="text-xs text-sbloom-text-secondary mt-1 max-w-sm">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-sbloom-border bg-white shadow-sbloom">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-sbloom-border bg-sbloom-surface/60 text-sbloom-text-secondary uppercase tracking-wider font-semibold text-[11px]">
            {columns.map((col, index) => (
              <th key={index} className={`px-4 py-3.5 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-sbloom-border/60">
          {data.map((row) => (
            <tr
              key={keyExtractor(row)}
              onClick={() => onRowClick && onRowClick(row)}
              className={`transition-colors duration-150 ${
                onRowClick ? 'cursor-pointer hover:bg-sbloom-surface/40' : 'hover:bg-sbloom-canvas/50'
              }`}
            >
              {columns.map((col, colIdx) => (
                <td key={colIdx} className={`px-4 py-3.5 text-sbloom-text-main ${col.className || ''}`}>
                  {col.render
                    ? col.render(row)
                    : col.accessor
                    ? String(row[col.accessor] ?? '')
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
