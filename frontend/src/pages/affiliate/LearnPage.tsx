import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  GraduationCap, 
  BookOpen, 
  Video, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Languages
} from 'lucide-react';

export const LearnPage: React.FC = () => {
  const guides = [
    {
      title: 'Partner Onboarding: How sBLOOM Commissions Work',
      duration: '4 min read',
      category: 'Foundation',
      level: 'Beginner',
      summary: 'Understand lead verification stages, cookie lifetimes, direct payment settlements, and ethics guidelines.',
    },
    {
      title: 'Pitching Enterprise Agentic AI to CTOs & Founders',
      duration: '8 min read',
      category: 'Sales Strategy',
      level: 'Intermediate',
      summary: 'Key talk tracks, objection handling, and ROI frameworks for positioning high-ticket automation deals.',
    },
    {
      title: 'Regional Creator Outreach: Telugu & Multilingual Markets',
      duration: '6 min read',
      category: 'Regional Markets',
      level: 'All Partners',
      summary: 'Connecting with MSME business owners in Hyderabad, Vijayawada, and South Indian regional tech hubs.',
    },
    {
      title: 'Attribution Tracking, UTM Links & Deep Funnels',
      duration: '5 min read',
      category: 'Tech Guides',
      level: 'Technical',
      summary: 'How sBLOOM tags your referral code across multi-channel client visits, newsletters, and social channels.',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-white border border-sbloom-border p-6 sm:p-8 shadow-sbloom space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sbloom-surface border border-sbloom-border text-xs font-semibold text-sbloom-violet">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Affiliate Enablement Academy</span>
        </div>
        <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-sbloom-text-main">
          Learn, Pitch & Maximize Your Commission
        </h2>
        <p className="text-xs sm:text-sm text-sbloom-text-secondary max-w-2xl leading-relaxed">
          Short, practical guides and pitch kits tailored for creators, consultants, and agencies introducing sBLOOM solutions to clients.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide, idx) => (
          <Card key={idx} variant="canvas" padding="lg" hoverable className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-sbloom-violet uppercase tracking-wider text-[11px]">
                  {guide.category}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-sbloom-surface text-sbloom-text-secondary text-[11px] font-medium">
                  {guide.duration}
                </span>
              </div>

              <h3 className="font-fraunces text-lg font-bold text-sbloom-text-main">
                {guide.title}
              </h3>

              <p className="text-xs text-sbloom-text-secondary leading-relaxed">
                {guide.summary}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-sbloom-border/70 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-sbloom-text-secondary">
                Level: <span className="text-sbloom-text-main">{guide.level}</span>
              </span>
              <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3 h-3" />}>
                Read Guide
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pitch Deck Asset Download Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-sbloom-surface via-[#f5edd5] to-white border border-sbloom-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-sbloom-admin text-sbloom-lime flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-fraunces text-base font-bold text-sbloom-text-main">
              Official sBLOOM Partner Pitch Deck (PDF)
            </h4>
            <p className="text-xs text-sbloom-text-secondary">
              Includes service breakdowns, customer case studies, and enterprise pricing calculators.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={() => alert('Demo Mode: Pitch deck template downloaded successfully.')}
        >
          Download Pitch Kit
        </Button>
      </div>

    </div>
  );
};
