import React from 'react';
import { Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DemoDataNotice: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { t } = useLanguage();

  if (compact) {
    return (
      <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 font-medium">
        <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
        <span>Demonstration Data (Simulated Sample)</span>
      </div>
    );
  }

  return (
    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start space-x-3 text-amber-950">
      <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
      <div className="text-xs space-y-0.5">
        <span className="font-bold">Simulated Demonstration Environment: </span>
        <span className="text-amber-900 leading-relaxed">
          {t('demoNotice')}
        </span>
      </div>
    </div>
  );
};
