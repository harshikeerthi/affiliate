import React, { ReactNode } from 'react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

interface ComingSoonStateProps {
  moduleName: string;
  expectedPhase?: string;
  description?: string;
  icon?: ReactNode;
}

export const ComingSoonState: React.FC<ComingSoonStateProps> = ({
  moduleName,
  expectedPhase = 'Phase 2 (Database & Supabase Live Sync)',
  description = 'This feature module is actively queued for the upcoming implementation phase.',
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-white border border-sbloom-border shadow-sbloom max-w-2xl mx-auto my-8 space-y-5">
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-sbloom-violet/20 via-sbloom-magenta/20 to-sbloom-lime/30 flex items-center justify-center text-sbloom-violet shadow-sm">
        {icon || <Sparkles className="w-8 h-8" />}
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sbloom-surface border border-sbloom-border text-xs font-semibold text-sbloom-violet">
          <Calendar className="w-3.5 h-3.5" />
          <span>Scheduled for {expectedPhase}</span>
        </div>
        <h3 className="font-fraunces text-2xl font-bold text-sbloom-text-main">
          {moduleName} Coming Soon
        </h3>
        <p className="text-xs sm:text-sm text-sbloom-text-secondary max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-2 flex items-center space-x-3">
        <Link to="/app">
          <Button variant="outline" size="sm">
            Back to Dashboard
          </Button>
        </Link>
        <Link to="/app/leads">
          <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            Explore My Leads
          </Button>
        </Link>
      </div>
    </div>
  );
};
