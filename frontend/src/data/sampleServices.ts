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
    id: 'srv-whatsapp-automation',
    name: 'WhatsApp Automation',
    category: 'Healthcare',
    tagline: 'Automated patient, student, and client communication workflows via WhatsApp',
    commissionRate: 'To be confirmed',
    avgCommission: 'Variable per client scope',
    cookieDuration: '60 days',
    description: 'Zero-touch automated appointment booking, lead follow-ups, and customer notifications tailored for healthcare clinics, educational institutes, and professional firms.',
    features: [
      'Official WhatsApp Business API integration',
      'Automated reminders & confirmation sequences',
      '24/7 vernacular chatbot assistance',
    ],
  },
  {
    id: 'srv-website-building',
    name: 'Website Building',
    category: 'Professional Services',
    tagline: 'High-performance conversion-optimized websites and landing pages',
    commissionRate: 'To be confirmed',
    avgCommission: 'Variable per client scope',
    cookieDuration: '60 days',
    description: 'Custom-designed responsive websites engineered for clinics, educational academies, and professional service providers with built-in lead capture.',
    features: [
      'Mobile-first responsive architecture',
      'Built-in SEO & Core Web Vitals optimization',
      'Integrated appointment & inquiry forms',
    ],
  },
  {
    id: 'srv-seo',
    name: 'Search Engine Optimization (SEO)',
    category: 'Healthcare',
    tagline: 'Dominant local and regional organic search visibility for service providers',
    commissionRate: 'To be confirmed',
    avgCommission: 'Variable per client scope',
    cookieDuration: '60 days',
    description: 'Targeted on-page, technical, and local Google Maps optimization to attract high-intent local patients, students, and corporate clients.',
    features: [
      'Local Google Business Profile optimization',
      'High-intent local & regional keyword ranking',
      'Monthly transparent ranking & traffic audits',
    ],
  },
  {
    id: 'srv-google-ads',
    name: 'Google Ads',
    category: 'Education',
    tagline: 'High-intent search and display campaigns driving qualified inbound inquiries',
    commissionRate: 'To be confirmed',
    avgCommission: 'Variable per client scope',
    cookieDuration: '45 days',
    description: 'Precision PPC campaign setup and management designed to capture immediate demand for healthcare procedures, course enrollments, and professional consultations.',
    features: [
      'High-intent search keyword targeting',
      'Negative keyword pruning & budget optimization',
      'Conversion tracking with call attribution',
    ],
  },
  {
    id: 'srv-meta-ads',
    name: 'Meta Ads',
    category: 'Professional Services',
    tagline: 'Targeted social acquisition funnels across Instagram, Facebook, and Messenger',
    commissionRate: 'To be confirmed',
    avgCommission: 'Variable per client scope',
    cookieDuration: '45 days',
    description: 'Creative hyper-targeted lead generation campaigns designed to scale patient footfall, student admissions, and professional client acquisition.',
    features: [
      'Audience persona & demographic targeting',
      'High-converting ad creatives & copy testing',
      'Direct WhatsApp & Lead form integrations',
    ],
  },
];
