export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  commissionRate: string;
  avgCommission: string;
  cookieDuration: string;
  description: string;
  features: string[];
}

export const SAMPLE_SERVICES: ServiceItem[] = [
  {
    id: 'srv-agentic-pipeline',
    name: 'Enterprise Agentic AI Pipeline',
    category: 'Enterprise Automation',
    tagline: 'End-to-end intelligent agent workflows for growing tech companies',
    commissionRate: '25%',
    avgCommission: '₹45,000 / closed deal',
    cookieDuration: '60 days',
    description: 'High-ticket custom agentic solution for automating client support, engineering workflows, and data pipelines.',
    features: ['Custom LLM fine-tuning', 'SOC2 Compliance', 'Dedicated Account Manager'],
  },
  {
    id: 'srv-workflow-automation',
    name: 'Autonomous Workflow Automation',
    category: 'Operations',
    tagline: 'Multi-tool synchronization and AI task execution for mid-market teams',
    commissionRate: '20%',
    avgCommission: '₹18,500 / closed deal',
    cookieDuration: '45 days',
    description: 'Connects CRM, invoicing, customer ticketing, and internal databases into zero-touch automated loops.',
    features: ['Instant API integrations', '99.9% uptime SLA', 'Automated reconciliation'],
  },
  {
    id: 'srv-creator-funnel',
    name: 'Omnichannel Creator Funnel Suite',
    category: 'Marketing Tech',
    tagline: 'High-conversion landing page and monetization infrastructure for creators',
    commissionRate: '15%',
    avgCommission: '₹12,000 / closed deal',
    cookieDuration: '30 days',
    description: 'Built specifically for influencers, newsletter publishers, and boutique agencies scaling affiliate monetization.',
    features: ['High-speed CDN hosting', 'Built-in payment links', 'Telegram/WhatsApp bot integration'],
  },
  {
    id: 'srv-data-intelligence',
    name: 'Creator Data Intelligence Engine',
    category: 'Analytics',
    tagline: 'Unified attribution, UTM tracking, and real-time revenue analytics',
    commissionRate: '20%',
    avgCommission: '₹22,000 / closed deal',
    cookieDuration: '60 days',
    description: 'Gives marketing executives full visibility on multichannel spend, creator ROI, and attribution cookies.',
    features: ['Multi-touch attribution', 'Custom dashboards', 'Automated tax reporting'],
  },
];
