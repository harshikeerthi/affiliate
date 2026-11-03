export interface LandingContent {
  nav: {
    brandSubtitle: string;
    howItWorks: string;
    services: string;
    promises: string;
    tools: string;
    earnings: string;
    faq: string;
    contact: string;
    signIn: string;
    dashboard: string;
    becomeAffiliate: string;
  };
  hero: {
    badge: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    trustIndicators: {
      label: string;
      sub: string;
    }[];
  };
  soundFamiliar: {
    eyebrow: string;
    headline: string;
    description: string;
    quotes: {
      id: string;
      sector: 'healthcare' | 'education' | 'proServices';
      speaker: string;
      role: string;
      location: string;
      dialogue: string;
      opportunityTag: string;
    }[];
    bridgeTitle: string;
    bridgeDesc: string;
  };
  conversationCarousel: {
    eyebrow: string;
    headline: string;
    description: string;
    tabs: {
      id: 'healthcare' | 'education' | 'proServices';
      tabLabel: string;
      sectorTitle: string;
      color: string;
      clientPersona: {
        name: string;
        title: string;
        organization: string;
        location: string;
      };
      conversationSnippet: {
        problem: string;
        frustration: string;
        theAsk: string;
      };
      sbloomApproach: {
        title: string;
        strategyPoints: string[];
        deliverables: string;
      };
      affiliateOutcome: {
        projectValue: string;
        commissionRate: string;
        estimatedPayout: string;
        payoutTimeline: string;
      };
    }[];
  };
  howItWorks: {
    eyebrow: string;
    headline: string;
    description: string;
    steps: {
      num: string;
      title: string;
      action: string;
      detail: string;
      highlight: string;
    }[];
  };
  promises: {
    eyebrow: string;
    headline: string;
    description: string;
    cards: {
      num: string;
      title: string;
      subtitle: string;
      description: string;
      proof: string;
    }[];
  };
  sectors: {
    eyebrow: string;
    headline: string;
    description: string;
    items: {
      id: string;
      name: string;
      tagline: string;
      color: string;
      targetClients: string[];
      coreServices: string[];
      typicalDealSize: string;
      affiliateEarning: string;
      attributionPeriod: string;
    }[];
  };
  knowledgePlatform: {
    eyebrow: string;
    headline: string;
    description: string;
    features: {
      title: string;
      description: string;
      tag: string;
    }[];
  };
  whoCanJoin: {
    eyebrow: string;
    headline: string;
    description: string;
    profiles: {
      category: string;
      whyFit: string;
      typicalNetwork: string;
      expectedIncome: string;
    }[];
    reassurance: string;
  };
  earningsTransparency: {
    eyebrow: string;
    headline: string;
    description: string;
    tiers: {
      tierName: string;
      rate: string;
      qualification: string;
      avgPerDeal: string;
    }[];
    simulator: {
      title: string;
      subtitle: string;
      dealCountLabel: string;
      avgDealLabel: string;
      projectedQuarterly: string;
      projectedMonthly: string;
      disclaimer: string;
    };
    policies: {
      title: string;
      description: string;
    }[];
  };
  faq: {
    eyebrow: string;
    headline: string;
    description: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  finalCta: {
    eyebrow: string;
    headline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    securityNote: string;
  };
  contact: {
    eyebrow: string;
    headline: string;
    description: string;
    channels: {
      title: string;
      value: string;
      actionText: string;
      href: string;
      badge: string;
    }[];
  };
  footer: {
    aboutText: string;
    columns: {
      title: string;
      links: { label: string; href: string }[];
    }[];
    copyright: string;
    legalNote: string;
  };
}

export const landingContentEn: LandingContent = {
  nav: {
    brandSubtitle: 'AFFILIATE ECOSYSTEM',
    howItWorks: 'How It Works',
    services: 'Sectors',
    promises: 'Promises',
    tools: 'Platform',
    earnings: 'Earnings',
    faq: 'FAQ',
    contact: 'Contact',
    signIn: 'Portal Login',
    dashboard: 'Affiliate Portal',
    becomeAffiliate: 'Become an Affiliate',
  },
  hero: {
    badge: 'THE THREAD • HUMAN REFERRAL INTELLIGENCE',
    headlinePart1: 'Your Trusted Connections Are Already Asking for Growth.',
    headlineHighlight: 'Turn Them Into Sustained Revenue.',
    headlinePart2: '',
    description:
      'Every week, clinic directors, school principals, and consulting founders discuss marketing frustrations over coffee and WhatsApp. When you connect them to sBLOOM, you earn up to 25% recurring commissions while helping peers flourish.',
    primaryCta: "Express Your Interest — it's free",
    secondaryCta: 'See how it works',
    trustIndicators: [
      { label: 'Up to 25%', sub: 'Commission Rate' },
      { label: '60 Days', sub: 'Attribution Window' },
      { label: '10th Monthly', sub: 'Guaranteed Payout' },
      { label: '100% Free', sub: 'Zero Joining Cost' },
    ],
  },
  soundFamiliar: {
    eyebrow: 'SOUND FAMILIAR?',
    headline: 'You hear these exact words almost every single week.',
    description:
      'Trusted business opportunities do not start with cold emails. They start with everyday human conversations from leaders frustrated by fragmented marketing.',
    quotes: [
      {
        id: 'quote-1',
        sector: 'healthcare',
        speaker: 'Dr. Sudhakar Rao',
        role: 'Chief Fertility Specialist & Clinic Owner',
        location: 'Visakhapatnam & Hyderabad',
        dialogue:
          '"We installed the latest embryology lab in the state, yet prospective couples in the city keep visiting older clinics with aggressive digital ads. Our agency sends zero genuine consultations."',
        opportunityTag: 'Healthcare Growth Mandate: ₹2.4L Contract Value',
      },
      {
        id: 'quote-2',
        sector: 'education',
        speaker: 'V. Lakshmi Narayana',
        role: 'Chairman, Group of Institutions',
        location: 'Vijayawada',
        dialogue:
          '"Admissions season starts in 60 days. Our admissions desk has no structured digital inquiry funnel, and parent inquiries dropped 22% compared to last year. We urgently need a serious partner."',
        opportunityTag: 'Education Enrollment Suite: ₹3.2L Contract Value',
      },
      {
        id: 'quote-3',
        sector: 'proServices',
        speaker: 'R. K. Sundaram, FCA',
        role: 'Senior Partner, Tax & Corporate Advisory',
        location: 'Hyderabad (Financial District)',
        dialogue:
          '"Our firm has handled high-profile corporate compliance for 18 years, yet our web presence looks completely outdated. New VC-backed startups in Hitec City do not even know we exist."',
        opportunityTag: 'Executive Authority Retainer: ₹1.8L Contract Value',
      },
    ],
    bridgeTitle: 'You already hold the golden thread.',
    bridgeDesc:
      'You do not need to sell, deliver, or handle client management. When you recognize these conversations, simply introduce sBLOOM — our specialized teams take care of the pitch, strategy, and execution.',
  },
  conversationCarousel: {
    eyebrow: 'THE THREAD IN ACTION',
    headline: 'How a casual dialogue becomes a verified commission.',
    description:
      'Explore real scenarios across our three core sectors. Notice how genuine client need matches our specialized delivery capabilities.',
    tabs: [
      {
        id: 'healthcare',
        tabLabel: '01. Healthcare',
        sectorTitle: 'Specialty Hospitals, IVF & Diagnostic Chains',
        color: '#FF6B6B',
        clientPersona: {
          name: 'Dr. Ananya Murthy',
          title: 'Managing Director & Lead Obstetrician',
          organization: 'Apex Fertility & Women Care',
          location: 'Hyderabad, Telangana',
        },
        conversationSnippet: {
          problem: 'Patient footfall plateaued despite ₹2.0L monthly spend on a generic marketing agency.',
          frustration: '"They post festive greetings on Facebook, but no high-intent couples ever book specialized IVF consultations."',
          theAsk: '"Do you know a reputable team that understands medical compliance, doctor authority, and patient trust?"',
        },
        sbloomApproach: {
          title: 'sBLOOM Clinical Authority Funnel',
          strategyPoints: [
            'Doctor Thought Leadership Video Series & Patient Education FAQs',
            'Google Local Medical 3-Pack SEO & Hyper-Local Map Optimization',
            'HIPAA/NABH-compliant WhatsApp Consultation Intake System',
          ],
          deliverables: 'Complete Build, Create, and Promote medical pipeline',
        },
        affiliateOutcome: {
          projectValue: '₹3,00,000 upfront + ₹80,000/mo retainer',
          commissionRate: '25% on Setup + 15% on Retainer',
          estimatedPayout: '₹75,000 first month payout',
          payoutTimeline: 'Disbursed by 10th of following month via NEFT',
        },
      },
      {
        id: 'education',
        tabLabel: '02. Education',
        sectorTitle: 'K-12 International Schools, Colleges & EdTech',
        color: '#16A34A',
        clientPersona: {
          name: 'Prof. Ramesh Cherukuri',
          title: 'Secretary & Correspondent',
          organization: 'Siddhartha Academy of Higher Learning',
          location: 'Guntur & Vijayawada',
        },
        conversationSnippet: {
          problem: 'Admission targets shortfall for B.Tech and MBA streams 90 days before academic cutoff.',
          frustration: '"Traditional newspaper inserts and hoardings have zero measurable ROI. Millennial parents expect virtual campus tours and direct WhatsApp counseling."',
          theAsk: '"Can you recommend someone who can drive verified parent applications quickly?"',
        },
        sbloomApproach: {
          title: 'sBLOOM Campus Enrollment Engine',
          strategyPoints: [
            'High-definition Campus Life Reel production & Student Success Stories',
            'Geo-fenced Meta & YouTube campaigns targeting tier-1 & tier-2 parents',
            'Lead scoring and automated WhatsApp counseling sequence',
          ],
          deliverables: '90-Day High-Velocity Enrollment Blitz',
        },
        affiliateOutcome: {
          projectValue: '₹2,50,000 campaign contract',
          commissionRate: '20% Fixed Commission',
          estimatedPayout: '₹50,000 single deal payout',
          payoutTimeline: 'Credited instantly on contract signing',
        },
      },
      {
        id: 'proServices',
        tabLabel: '03. Professional Services',
        sectorTitle: 'Chartered Accountants, Legal Firms & Consultants',
        color: '#0D9488',
        clientPersona: {
          name: 'Vikramaditya Rao',
          title: 'Managing Partner',
          organization: 'Vanguard Legal & Corporate Compliance',
          location: 'Hyderabad (Jubilee Hills)',
        },
        conversationSnippet: {
          problem: 'Solely reliant on word-of-mouth; unable to attract high-paying tech startup clients.',
          frustration: '"We draft complex cross-border joint ventures, but our website looks like a static brochure from 2014. Startups hire boutique firms half our experience simply because their LinkedIn presence is polished."',
          theAsk: '"How do we position our senior partners as modern industry authorities?"',
        },
        sbloomApproach: {
          title: 'sBLOOM B2B Authority & Retainer Engine',
          strategyPoints: [
            'Partner Ghostwriting & Strategic LinkedIn Insight Articles',
            'Executive Whitepaper & Case Study Portal Architecture',
            'Account-Based Marketing (ABM) outreach to enterprise CFOs & Founders',
          ],
          deliverables: 'Quarterly Executive Growth Mandate',
        },
        affiliateOutcome: {
          projectValue: '₹1,80,000 quarterly mandate',
          commissionRate: '20% Recurring Commission',
          estimatedPayout: '₹36,000 per quarter',
          payoutTimeline: 'Recurring payouts every 90 days',
        },
      },
    ],
  },
  howItWorks: {
    eyebrow: 'FOUR SIMPLE STEPS',
    headline: 'From trusted conversation to verified bank payout.',
    description:
      'We designed the sBLOOM affiliate model to be completely friction-free. You initiate the introduction; our enterprise team handles closing, onboarding, and ongoing delivery.',
    steps: [
      {
        num: '01',
        title: 'Listen & Identify',
        action: 'Recognize the Need',
        detail:
          'When an entrepreneur, doctor, or academic leader mentions struggling with growth, marketing, or online admissions, you have identified the opportunity.',
        highlight: 'Casual everyday conversations become high-value threads.',
      },
      {
        num: '02',
        title: 'Introduce with Ease',
        action: 'Share Link or Submit Lead',
        detail:
          'Send your custom tracking link with 60-day cookie protection, or submit their details directly in your Affiliate Portal Lead Drawer in 60 seconds.',
        highlight: 'Zero awkward sales pitches required on your part.',
      },
      {
        num: '03',
        title: 'sBLOOM Closes & Delivers',
        action: 'Enterprise Closing',
        detail:
          'Our senior domain specialists reach out respectfully, conduct executive discovery, propose tailored solutions, and close the contract.',
        highlight: 'Follow each status live: Pending → Contacted → Qualified → Converted.',
      },
      {
        num: '04',
        title: 'Earn Recurring Commission',
        action: 'Guaranteed Payouts',
        detail:
          'Earn between 15% and 25% of the deal value. Payouts are automatically computed and transferred directly to your bank account or UPI by the 10th of every month.',
        highlight: 'Full TDS 194H compliance certificate issued for every transfer.',
      },
    ],
  },
  promises: {
    eyebrow: 'OUR THREE PILLARS',
    headline: 'Promises etched in code and verified in every payout.',
    description:
      'We know your reputation is your most valuable asset. We treat your relationships with the utmost professional dignity and complete transparency.',
    cards: [
      {
        num: '01',
        title: 'Absolute Attribution Transparency',
        subtitle: 'Never lose track of a referral',
        description:
          'Every lead you submit or link click you generate is logged with timestamped verification. You can audit every status change in real time on your dashboard.',
        proof: '60-day attribution cookie + immutable timestamped lead drawer records.',
      },
      {
        num: '02',
        title: 'Client-First Professional Dignity',
        subtitle: 'Zero aggressive spam, 100% reputation safe',
        description:
          'We do not bombard your contacts with automated spam. Every prospect is approached by senior industry strategists with curated, high-value consulting perspectives.',
        proof: 'We elevate your personal brand in the eyes of the people you introduce.',
      },
      {
        num: '03',
        title: 'Prompt & Predictable Payouts',
        subtitle: 'Every 10th of the month, without fail',
        description:
          'No minimum withdrawal thresholds and no payment delay games. Approved commissions are settled predictably into your bank account or UPI on schedule.',
        proof: 'Downloadable payout vouchers with verified bank UTR reference numbers.',
      },
    ],
  },
  sectors: {
    eyebrow: 'DEEP DOMAIN EXPERTISE',
    headline: 'Three specialized sectors with immense referral demand.',
    description:
      'sBLOOM does not do generic marketing. We build specialized, compliance-safe growth engines for high-ticket industries where trust is paramount.',
    items: [
      {
        id: 'healthcare',
        name: 'Healthcare & Life Sciences',
        tagline: 'Clinics, IVF Centers, Multi-specialty Hospitals & Specialist Doctors',
        color: '#FF6B6B',
        targetClients: ['Fertility (IVF) Clinics', 'Dental & Orthodontic Chains', 'Orthopedic Centers', 'Cosmetology & Dermatology'],
        coreServices: ['Doctor Thought Leadership', 'Local Map 3-Pack Dominance', 'Patient Trust Funnels', 'HIPAA/NABH Ad Compliance'],
        typicalDealSize: '₹1.5L – ₹4.5L',
        affiliateEarning: '₹30,000 – ₹90,000 per deal',
        attributionPeriod: '60 Days Lifetime Attribution',
      },
      {
        id: 'education',
        name: 'Education & Institutions',
        tagline: 'K-12 International Schools, Universities & Professional Academies',
        color: '#16A34A',
        targetClients: ['CBSE/ICSE International Schools', 'B.Tech / MBA Universities', 'NEET / JEE Coaching Institutes', 'EdTech Programs'],
        coreServices: ['Campus Enrollment Blitz', 'Parent WhatsApp Automation', 'Student Video Testimonials', 'Geo-Targeted Meta Inquiries'],
        typicalDealSize: '₹1.2L – ₹3.5L',
        affiliateEarning: '₹24,000 – ₹70,000 per deal',
        attributionPeriod: '60 Days Lifetime Attribution',
      },
      {
        id: 'proServices',
        name: 'Professional Services',
        tagline: 'Chartered Accountants, Legal Consultancies & Executive Advisors',
        color: '#0D9488',
        targetClients: ['Corporate Law Firms', 'Chartered Accounting Partnerships', 'Architecture & Design Studios', 'Management Consultancies'],
        coreServices: ['Partner Authority Ghostwriting', 'LinkedIn B2B Retainer Funnel', 'High-Converting Web Platform', 'Thought Leadership PDF Reports'],
        typicalDealSize: '₹1.0L – ₹3.0L',
        affiliateEarning: '₹20,000 – ₹60,000 per deal',
        attributionPeriod: '60 Days Lifetime Attribution',
      },
    ],
  },
  knowledgePlatform: {
    eyebrow: 'AFFILIATE KNOWLEDGE PLATFORM',
    headline: 'World-class tools to empower your introductions.',
    description:
      'From real-time tracking to bilingual pitch collateral, our portal gives you everything required to recommend with authority.',
    features: [
      {
        title: 'Live Telemetry Dashboard',
        description: 'Track clicks, submitted leads, conversion milestones, and cleared commission balances in a single clean viewport.',
        tag: 'REAL-TIME ANALYTICS',
      },
      {
        title: 'Slide-Over Lead Drawer',
        description: 'Submit client referrals in under 60 seconds with target sector, business scope, and private affiliate notes.',
        tag: 'DIRECT ATTRIBUTION',
      },
      {
        title: 'Smart UTM Link Builder',
        description: 'Generate customized referral links for WhatsApp, LinkedIn, or email with automated 60-day cookie persistence.',
        tag: 'CAMPAIGN TRACKING',
      },
      {
        title: 'Bilingual Pitch Academy',
        description: 'Access objection handling sheets, talk tracks, and service comparison decks in English and Telugu.',
        tag: 'SALES ENABLEMENT',
      },
      {
        title: 'Transparent Settlement Ledger',
        description: 'Inspect cleared versus pending payouts, scheduled disbursement dates, and official TDS Section 194H tax deductions.',
        tag: 'FINANCIAL INTEGRITY',
      },
      {
        title: 'Downloadable Invoices & Vouchers',
        description: 'Download monthly tax receipts with verified Indian banking UTR reference numbers for smooth accounting.',
        tag: 'TAX COMPLIANCE',
      },
    ],
  },
  whoCanJoin: {
    eyebrow: 'WHO CAN JOIN?',
    headline: 'Built for professionals with trusted networks.',
    description:
      'You do not need to be a full-time marketer. If you have built trust in your industry or community, sBLOOM is the most reputable way to monetize your relationships.',
    profiles: [
      {
        category: 'Tech & Digital Creators',
        whyFit: 'Monetize your followers without promoting cheap e-commerce gadgets or scam products.',
        typicalNetwork: 'Startup founders, agency leaders, modern business operators.',
        expectedIncome: '₹40,000 – ₹1,20,000 / month',
      },
      {
        category: 'Agencies & Freelance Designers',
        whyFit: 'Earn high-ticket revenue from client requests outside your core service capability.',
        typicalNetwork: 'Clients asking for enterprise SEO, video ads, or end-to-end growth.',
        expectedIncome: '₹30,000 – ₹90,000 / deal',
      },
      {
        category: 'Business Development Freelancers',
        whyFit: 'Connect high-ticket enterprise contracts with generous, transparent commission sharing.',
        typicalNetwork: 'Decision makers in healthcare, education, real estate, and finance.',
        expectedIncome: '₹50,000 – ₹2,00,000 / month',
      },
      {
        category: 'Regional Community Connectors',
        whyFit: 'Turn your influence in South Indian trade associations and WhatsApp networks into formal income.',
        typicalNetwork: 'Clinic owners, school correspondents, and local chamber of commerce members.',
        expectedIncome: '₹25,000 – ₹75,000 / referral',
      },
    ],
    reassurance: 'No prior sales pitch experience required. Your personal connection is the only qualification.',
  },
  earningsTransparency: {
    eyebrow: 'COMPENSATION TRANSPARENCY',
    headline: 'High-ticket commissions with zero ambiguity.',
    description:
      'We believe in absolute financial clarity. Here is exactly how commissions are calculated, verified, and disbursed.',
    tiers: [
      {
        tierName: 'Standard Referral',
        rate: '15% – 20%',
        qualification: '1 – 3 closed client deals per quarter',
        avgPerDeal: '₹18,000 – ₹35,000',
      },
      {
        tierName: 'Growth Partner',
        rate: '20% – 22%',
        qualification: '4 – 7 closed client deals per quarter',
        avgPerDeal: '₹35,000 – ₹55,000',
      },
      {
        tierName: 'Enterprise Circle',
        rate: '25% Flat',
        qualification: '8+ closed deals or enterprise retainers > ₹3L',
        avgPerDeal: '₹50,000 – ₹95,000',
      },
    ],
    simulator: {
      title: 'Interactive Earnings Calculator',
      subtitle: 'Simulate your potential earnings based on your referral frequency.',
      dealCountLabel: 'Closed Client Deals Per Quarter:',
      avgDealLabel: 'Average Contract Size:',
      projectedQuarterly: 'Projected Quarterly Commission',
      projectedMonthly: 'Equivalent Monthly Run-Rate',
      disclaimer: 'Calculated using a 20% average partner commission rate. Retainer renewals generate additional monthly recurring rewards.',
    },
    policies: [
      {
        title: '60-Day Cookie Lifetime',
        description: 'If a client visits your link today and converts within 60 days, you receive full credit.',
      },
      {
        title: 'Settlement on 10th Monthly',
        description: 'All commissions earned in the previous calendar month are disbursed by the 10th.',
      },
      {
        title: 'Zero Minimum Withdrawal',
        description: 'Whether your commission is ₹5,000 or ₹2,50,000, we disburse the full balance without holdbacks.',
      },
      {
        title: 'Section 194H TDS Compliance',
        description: 'TDS (5%) is deducted as per Indian Income Tax regulations with quarterly Form 16A certificates.',
      },
    ],
  },
  faq: {
    eyebrow: 'FREQUENTLY ASKED QUESTIONS',
    headline: 'Everything you need to know about partnering with sBLOOM.',
    description: 'Clear answers to common questions about attribution, payment rails, and client confidentiality.',
    items: [
      {
        question: 'Does it cost anything to join the sBLOOM Affiliate Program?',
        answer:
          'No, joining the sBLOOM Affiliate Program is 100% free. There are no registration fees, monthly subscription costs, or hidden maintenance charges. Your account is activated immediately upon signing up.',
      },
      {
        question: 'How do you track my referrals accurately?',
        answer:
          'We use dual attribution: you receive a unique referral link with 60-day cookie persistence, and you can also submit leads directly via your Affiliate Portal Lead Drawer with timestamped audit trails. Once submitted, your attribution is locked.',
      },
      {
        question: 'When and how do I receive my commission payouts?',
        answer:
          'Commissions are disbursed on the 10th of every month. Payments are sent directly to your Indian bank account via NEFT/IMPS or through your verified UPI ID, accompanied by official TDS Form 16A certificates.',
      },
      {
        question: 'Do I have to prepare proposals, pitch, or deliver services myself?',
        answer:
          'Never. Your only responsibility is making the trusted introduction. Once you introduce or submit the lead, sBLOOM senior industry consultants conduct the discovery call, build the strategy deck, close the contract, and oversee execution.',
      },
      {
        question: 'What if a prospective client takes 4 to 6 weeks to finalize their budget?',
        answer:
          'High-ticket enterprise and institutional decisions often require board or trustee sign-off. Our 60-day attribution window ensures you receive full commission credit even if negotiations take several weeks.',
      },
      {
        question: 'Can I participate if my network is based in Andhra Pradesh and Telangana?',
        answer:
          'Yes! South India is one of our most active growth markets. We provide full bilingual collateral in Telugu and English, and our leadership team conducts client discovery fluently in Telugu, English, and Hindi.',
      },
    ],
  },
  finalCta: {
    eyebrow: 'THE THREAD IS IN YOUR HANDS',
    headline: 'Your network is already asking for growth. Start getting rewarded for it.',
    description:
      'Join hundreds of creators, consultants, agency founders, and regional community leaders earning transparent high-ticket commissions with sBLOOM.',
    primaryCta: 'Create your affiliate account →',
    secondaryCta: 'Explore Demo Dashboard',
    securityNote: 'Instant partner registration • No waiting screen • 100% free to join',
  },
  contact: {
    eyebrow: 'SUPPORT & ENQUIRIES',
    headline: 'Have questions before joining? Speak with our partnership team.',
    description: 'We are here to help you get onboarded, configure your links, and answer any questions.',
    channels: [
      {
        title: 'Partner Support Email',
        value: 'affiliates@sbloom.io',
        actionText: 'Send an Email',
        href: 'mailto:affiliates@sbloom.io',
        badge: 'Responses in < 4 hours',
      },
      {
        title: 'WhatsApp Partnership Desk',
        value: '+91 98765 43210',
        actionText: 'Chat on WhatsApp',
        href: 'https://wa.me/919876543210?text=Hi%20sBLOOM,%20I%20have%20questions%20about%20the%20affiliate%20program',
        badge: 'Instant messaging',
      },
      {
        title: 'Hyderabad Technology Center',
        value: 'HITEC City, Hyderabad, Telangana',
        actionText: 'View Location',
        href: '#contact',
        badge: 'Corporate Office',
      },
    ],
  },
  footer: {
    aboutText:
      'sBLOOM is an industry-focused marketing and enterprise growth partner. The sBLOOM Affiliate Portal provides transparent monetization for creators, consultants, and agencies.',
    columns: [
      {
        title: 'Affiliate Portal',
        links: [
          { label: 'Partner Dashboard', href: '/app' },
          { label: 'Services Catalog', href: '/app/services' },
          { label: 'Submit Lead', href: '/app/leads' },
          { label: 'Earnings Ledger', href: '/app/earnings' },
        ],
      },
      {
        title: 'Sectors',
        links: [
          { label: 'Healthcare & IVF', href: '#services' },
          { label: 'Education & Schools', href: '#services' },
          { label: 'Professional Services', href: '#services' },
          { label: 'Pitch Academy', href: '/app/learn' },
        ],
      },
      {
        title: 'Trust & Governance',
        links: [
          { label: 'Affiliate Ethics Charter', href: '/app/support' },
          { label: 'TDS Section 194H Rules', href: '/app/earnings' },
          { label: 'Terms of Service', href: '/app/signup' },
          { label: 'Privacy Policy', href: '/app/signup' },
        ],
      },
    ],
    copyright: '© 2026 sBLOOM Creator & Growth Ecosystem. All rights reserved.',
    legalNote: 'Demonstration and production environment compliant with Indian digital commerce regulations.',
  },
};

export const landingContentTe: LandingContent = {
  nav: {
    brandSubtitle: 'అఫిలియేట్ ఎకోసిస్టమ్',
    howItWorks: 'ఇది ఎలా పనిచేస్తుంది',
    services: 'విభాగాలు',
    promises: 'మా వాగ్దానాలు',
    tools: 'సాంకేతిక వేదిక',
    earnings: 'ఆదాయాలు',
    faq: 'ప్రశ్నలు-జవాబులు',
    contact: 'సంప్రదించండి',
    signIn: 'పోర్టల్ లాగిన్',
    dashboard: 'అఫిలియేట్ పోర్టల్',
    becomeAffiliate: 'అఫిలియేట్‌గా చేరండి',
  },
  hero: {
    badge: 'ది థ్రెడ్ • మానవ సంబంధాల ఆధారిత అఫిలియేట్ నెట్‌వర్క్',
    headlinePart1: 'మీ నమ్మకమైన సంబంధాలు ఇప్పటికే ఎదుగుదల కోసం చూస్తున్నాయి.',
    headlineHighlight: 'వాటిని నిరంతర ఆదాయంగా మార్చుకోండి.',
    headlinePart2: '',
    description:
      'ప్రతి వారం క్లినిక్ యజమానులు, పాఠశాల కరస్పాండెంట్లు మరియు కన్సల్టింగ్ డైరెక్టర్లు తమ మార్కెటింగ్ సవాళ్ల గురించి చర్చిస్తుంటారు. వారిని sBLOOM కి పరిచయం చేయడం ద్వారా మీరు 25% వరకు రికరింగ్ కమీషన్ పొందవచ్చు.',
    primaryCta: 'మీ ఆసక్తిని తెలపండి — ఇది ఉచితం',
    secondaryCta: 'ఇది ఎలా పనిచేస్తుందో చూడండి',
    trustIndicators: [
      { label: '25% వరకు', sub: 'కమీషన్ రేటు' },
      { label: '60 రోజులు', sub: 'అట్రిబ్యూషన్ వ్యవధి' },
      { label: 'ప్రతి నెలా 10వ తేదీ', sub: 'ఖచ్చితమైన చెల్లింపు' },
      { label: '100% ఉచితం', sub: 'ఎలాంటి చేరిక రుసుము లేదు' },
    ],
  },
  soundFamiliar: {
    eyebrow: 'ఇవి మీకు పరిచితమైనవేనా?',
    headline: 'ప్రతి వారం మీరు ఇలాంటి మాటలే వింటుంటారు.',
    description:
      'అసలైన వ్యాపార అవకాశాలు స్పామ్ ఈమెయిళ్ళతో మొదలవ్వవు. మార్కెటింగ్ ఫలితాలు రాని బిజినెస్ లీడర్ల నిజమైన ఆవేదనలతో మొదలవుతాయి.',
    quotes: [
      {
        id: 'quote-1',
        sector: 'healthcare',
        speaker: 'డాక్టర్ సుధాకర్ రావు',
        role: 'చీఫ్ ఫెర్టిలిటీ స్పెషలిస్ట్ & క్లినిక్ యజమాని',
        location: 'విశాఖపట్నం & హైదరాబాద్',
        dialogue:
          '"మేము రాష్ట్రంలోనే అత్యంత ఆధునిక ల్యాబ్ ఏర్పాటు చేసాము, కానీ నగరంలోని జంటలు పాత క్లినిక్‌లకే వెళ్తున్నారు. మా డిజిటల్ ఏజెన్సీ కేవలం పండగ పోస్ట్‌లు తప్ప ఒక్క నిజమైన పేషెంట్‌ని కూడా తీసుకురాలేకపోతోంది."',
        opportunityTag: 'హెల్త్‌కేర్ గ్రోత్ అవకాశం: ₹2.4 లక్షల విలువైన కాంట్రాక్ట్',
      },
      {
        id: 'quote-2',
        sector: 'education',
        speaker: 'వి. లక్ష్మీ నారాయణ',
        role: 'ఛైర్మన్, విద్యా సంస్థల సమూహం',
        location: 'విజయవాడ',
        dialogue:
          '"అడ్మిషన్ల సమయం మరో 60 రోజుల్లో మొదలవుతుంది. తల్లిదండ్రుల విచారణలు గత ఏడాదితో పోలిస్తే 22% తగ్గాయి. మా కాలేజీ అడ్మిషన్లను పెంచే సరైన టీమ్ మాకు తక్షణమే కావాలి."',
        opportunityTag: 'ఎడ్యుకేషన్ ఎన్‌రోల్‌మెంట్ సూట్: ₹3.2 లక్షల కాంట్రాక్ట్',
      },
      {
        id: 'quote-3',
        sector: 'proServices',
        speaker: 'ఆర్. కె. సుందరం, FCA',
        role: 'సీనియర్ పార్ట్‌నర్, కార్పొరేట్ అడ్వైజరీ',
        location: 'హైదరాబాద్ (ఫైనాన్షియల్ డిస్ట్రిక్ట్)',
        dialogue:
          '"మేము 18 ఏళ్లుగా కార్పొరేట్ కంపెనీలకు సేవలందిస్తున్నాము, కానీ మా వెబ్‌సైట్ పాతకాలపు బ్రోచర్‌లా ఉంది. హైటెక్ సిటీలోని కొత్త స్టార్టప్‌లకు అసలు మా ఉనికి కూడా తెలియడం లేదు."',
        opportunityTag: 'ఎగ్జిక్యూటివ్ అథారిటీ రిటైనర్: ₹1.8 లక్షల కాంట్రాక్ట్',
      },
    ],
    bridgeTitle: 'ఈ సంభాషణల వెనుక ఉన్న అవకాశాన్ని మీరు చూస్తున్నారా?',
    bridgeDesc:
      'మీరు ఎలాంటి సేవలు స్వయంగా అందించాల్సిన అవసరం లేదు. కేవలం sBLOOM కి పరిచయం చేస్తే చాలు — మా నిపుణుల బృందం ప్రెజెంటేషన్, డెలివరీ బాధ్యతలను తీసుకుంటుంది.',
  },
  conversationCarousel: {
    eyebrow: 'ది థ్రెడ్ ఆచరణలో',
    headline: 'ఒక సాధారణ సంభాషణ ఎలా ఖచ్చితమైన కమీషన్‌గా మారుతుంది.',
    description:
      'మా మూడు ప్రధాన రంగాలలోని వాస్తవ పరిస్థితులను చూడండి. క్లయింట్ అవసరాలకు sBLOOM పరిష్కారం మరియు మీ కమీషన్ మొత్తం ఇక్కడ చూడండి.',
    tabs: [
      {
        id: 'healthcare',
        tabLabel: '01. హెల్త్‌కేర్',
        sectorTitle: 'స్పెషాలిటీ హాస్పిటల్స్, IVF & డయాగ్నస్టిక్ సెంటర్లు',
        color: '#FF6B6B',
        clientPersona: {
          name: 'డాక్టర్ అనన్య మూర్తి',
          title: 'మేనేజింగ్ డైరెక్టర్ & చీఫ్ గైనకాలజిస్ట్',
          organization: 'అపెక్స్ ఫెర్టిలిటీ & ఉమెన్ కేర్',
          location: 'హైదరాబాద్, తెలంగాణ',
        },
        conversationSnippet: {
          problem: 'నెలకు ₹2 లక్షలు ఖర్చు చేస్తున్నప్పటికీ పేషెంట్ల సంఖ్య పెరగకపోవడం.',
          frustration: '"వారు ఫేస్‌బుక్‌లో పండగ శుభాకాంక్షలు వేస్తున్నారు, కానీ చికిత్స కోసం వచ్చే జంటలు రావడం లేదు."',
          theAsk: '"వైద్య రంగంలో నమ్మకాన్ని పెంచే నిపుణులైన మార్కెటింగ్ టీమ్ ఎవరైనా మీకు తెలుసా?"',
        },
        sbloomApproach: {
          title: 'sBLOOM క్లినికల్ అథారిటీ ఫన్నెల్',
          strategyPoints: [
            'డాక్టర్ థాట్ లీడర్‌షిప్ వీడియోలు & పేషెంట్ అవగాహన సమాచారం',
            'గూగుల్ లోకల్ మ్యాప్స్ 3-ప్యాక్ ఆప్టిమైజేషన్',
            'మెడికల్ నిబంధనలకు అనుగుణమైన వాట్సాప్ కన్సల్టేషన్ వ్యవస్థ',
          ],
          deliverables: 'బిల్డ్, క్రియేట్, ప్రమోట్ సమగ్ర హెల్త్‌కేర్ గ్రోత్ సిస్టమ్',
        },
        affiliateOutcome: {
          projectValue: '₹3,00,000 సెటప్ + ₹80,000/నెలకు రిటైనర్',
          commissionRate: 'సెటప్‌పై 25% + రిటైనర్‌పై 15%',
          estimatedPayout: 'మొదటి నెలలోనే ₹75,000 కమీషన్',
          payoutTimeline: 'వచ్చే నెల 10వ తేదీన NEFT ద్వారా జమ',
        },
      },
      {
        id: 'education',
        tabLabel: '02. విద్యారంగం',
        sectorTitle: 'ఇంటర్నేషనల్ స్కూల్స్, కాలేజీలు & కోచింగ్ సెంటర్లు',
        color: '#16A34A',
        clientPersona: {
          name: 'ప్రొఫెసర్ రమేష్ చెరుకూరి',
          title: 'సెక్రటరీ & కరస్పాండెంట్',
          organization: 'సిద్ధార్థ విద్యా సంస్థలు',
          location: 'గుంటూరు & విజయవాడ',
        },
        conversationSnippet: {
          problem: 'అడ్మిషన్ల గడువు సమీపిస్తున్నప్పటికీ సరిపడా దరఖాస్తులు రాకపోవడం.',
          frustration: '"పాత పేపర్ ప్రకటనలకు సరైన స్పందన లేదు. నేటి తల్లిదండ్రులు ఆన్‌లైన్‌లో క్యాంపస్ వీడియోలు మరియు డిజిటల్ విచారణలను కోరుకుంటున్నారు."',
          theAsk: '"తల్లిదండ్రుల నుండి నేరుగా అడ్మిషన్ విచారణలను రప్పించే వారు ఎవరైనా ఉన్నారా?"',
        },
        sbloomApproach: {
          title: 'sBLOOM క్యాంపస్ ఎన్‌రోల్‌మెంట్ ఇంజిన్',
          strategyPoints: [
            'హై-డెఫినిషన్ క్యాంపస్ లైఫ్ రీల్స్ & విద్యార్థుల విజయగాథలు',
            'జియో-టార్గెటెడ్ మెటా మరియు యూట్యూబ్ ప్రచారాలు',
            'ఆటోమేటెడ్ వాట్సాప్ కౌన్సిలింగ్ సిస్టమ్',
          ],
          deliverables: '90 రోజుల హై-స్పీడ్ అడ్మిషన్ల ప్రచారం',
        },
        affiliateOutcome: {
          projectValue: '₹2,50,000 క్యాంపెయిన్ ఒప్పందం',
          commissionRate: '20% ఫిక్స్‌డ్ కమీషన్',
          estimatedPayout: 'ఒకే డీల్‌పై ₹50,000 చెల్లింపు',
          payoutTimeline: 'ఒప్పందం ఖరారైన వెంటనే ఖాతాలో క్రెడిట్',
        },
      },
      {
        id: 'proServices',
        tabLabel: '03. ప్రొఫెషనల్ సర్వీసెస్',
        sectorTitle: 'చార్టర్డ్ అకౌంటెంట్లు, లా ఫర్మ్స్ & కన్సల్టెన్సీలు',
        color: '#0D9488',
        clientPersona: {
          name: 'విక్రమాదిత్య రావు',
          title: 'మేనేజింగ్ పార్ట్‌నర్',
          organization: 'వాన్‌గార్డ్ లీగల్ & కార్పొరేట్ అడ్వైజరీ',
          location: 'హైదరాబాద్ (జూబ్లీ హిల్స్)',
        },
        conversationSnippet: {
          problem: 'కేవలం పాత పరిచయాలపైనే ఆధారపడటం; కొత్త స్టార్టప్‌లను ఆకర్షించలేకపోవడం.',
          frustration: '"మేము అత్యున్నత స్థాయి లీగల్ కంప్లయన్స్ అందిస్తాము, కానీ మా వెబ్‌సైట్ చూస్తే ఎవరికీ నమ్మకం కలగదు. లింక్డ్‌ఇన్‌లో యాక్టివ్‌గా ఉండే చిన్న సంస్థలే డీల్స్ గెలుచుకుంటున్నాయి."',
          theAsk: '"మా సీనియర్ పార్ట్‌నర్లను ఆధునిక ఇండస్ట్రీ లీడర్లుగా ఎలా నిలబెట్టాలి?"',
        },
        sbloomApproach: {
          title: 'sBLOOM B2B అథారిటీ & రిటైనర్ ఇంజిన్',
          strategyPoints: [
            'లింక్డ్‌ఇన్ థాట్ లీడర్‌షిప్ ఆర్టికల్స్ & గోస్ట్‌రైటింగ్',
            'కార్పొరేట్ కేస్ స్టడీలు మరియు మోడ్రన్ వెబ్‌సైట్',
            'ఎంటర్‌ప్రైజ్ CFOలు మరియు వ్యవస్థాపకులకు డైరెక్ట్ ఔట్‌రీచ్',
          ],
          deliverables: 'త్రైమాసిక ఎగ్జిక్యూటివ్ గ్రోత్ ప్లాన్',
        },
        affiliateOutcome: {
          projectValue: '₹1,80,000 త్రైమాసిక ఒప్పందం',
          commissionRate: '20% రికరింగ్ కమీషన్',
          estimatedPayout: 'ప్రతి 3 నెలలకు ₹36,000',
          payoutTimeline: 'రిటైనర్ కొనసాగినంత కాలం నిరంతర ఆదాయం',
        },
      },
    ],
  },
  howItWorks: {
    eyebrow: 'నాలుగు సులువైన దశలు',
    headline: 'సంభాషణ నుండి బ్యాంక్ ఖాతాలో కమీషన్ జమ అయ్యే వరకు.',
    description:
      'sBLOOM అఫిలియేట్ సిస్టమ్ చాలా సులభంగా ఉండేలా రూపొందించబడింది. మీరు కేవలం పరిచయం చేయండి; మా నిపుణులు ఒప్పందాన్ని మరియు అమలును చూసుకుంటారు.',
    steps: [
      {
        num: '01',
        title: 'వినండి & గుర్తించండి',
        action: 'అవసరాన్ని గమనించండి',
        detail:
          'మీ సర్కిల్‌లోని డాక్టర్లు, వ్యాపారవేత్తలు లేదా ప్రిన్సిపాళ్ళు మార్కెటింగ్ ఎదుగుదల లేదా అడ్మిషన్ల సమస్యలను ప్రస్తావించినప్పుడు గమనించండి.',
        highlight: 'రోజూ జరిగే సంభాషణలే మీకు విలువైన అవకాశాలు.',
      },
      {
        num: '02',
        title: 'సులభంగా పరిచయం చేయండి',
        action: 'లింక్ లేదా లీడ్ పంపండి',
        detail:
          'మీ ప్రత్యేక 60-రోజుల ట్రాకింగ్ లింక్ పంపండి లేదా మీ పోర్టల్ లీడ్ డ్రాయర్‌లో వారి వివరాలను 60 సెకన్లలో నమోదు చేయండి.',
        highlight: 'మీరు ఎలాంటి బలవంతపు అమ్మకాలు చేయాల్సిన అవసరం లేదు.',
      },
      {
        num: '03',
        title: 'sBLOOM డీల్ పూర్తి చేస్తుంది',
        action: 'ఎంటర్‌ప్రైజ్ ప్రెజెంటేషన్',
        detail:
          'మా సీనియర్ కన్సల్టెంట్లు వారితో గౌరవంగా మాట్లాడి, వ్యూహాత్మక ప్లాన్ వివరించి కాంట్రాక్ట్ పూర్తి చేస్తారు.',
        highlight: 'ప్రతి లీడ్ స్టేటస్‌ను లైవ్‌లో ట్రాక్ చేయండి: పెండింగ్ → క్వాలిఫైడ్ → కన్వర్టెడ్.',
      },
      {
        num: '04',
        title: 'నిరంతర ఆదాయాన్ని పొందండి',
        action: 'ఖచ్చితమైన చెల్లింపులు',
        detail:
          'డీల్ విలువపై 15% నుండి 25% వరకు కమీషన్ సంపాదించండి. ప్రతి నెలా 10వ తేదీన నేరుగా మీ బ్యాంక్ లేదా UPI లోకి జమ అవుతుంది.',
        highlight: 'ప్రతి చెల్లింపునకు అధికారిక TDS ఫారం 16A సర్టిఫికేట్ లభిస్తుంది.',
      },
    ],
  },
  promises: {
    eyebrow: 'మా మూడు ప్రధాన వాగ్దానాలు',
    headline: 'పారదర్శకత మరియు నమ్మకంతో నిర్మితమైన వ్యవస్థ.',
    description:
      'మీ వ్యక్తిగత పరపతి ఎంత విలువైందో మాకు తెలుసు. మీ పరిచయాలను అత్యున్నత గౌరవంతో మరియు వృత్తి నైపుణ్యంతో మేము చూసుకుంటాము.',
    cards: [
      {
        num: '01',
        title: 'సంపూర్ణ ట్రాకింగ్ పారదర్శకత',
        subtitle: 'ఏ ఒక్క రిఫరల్ కూడా మిస్ అవ్వదు',
        description:
          'మీరు నమోదు చేసిన ప్రతి లీడ్ సమయంతో సహా రికార్డ్ అవుతుంది. ప్రతి దశను మీ డ్యాష్‌బోర్డ్‌లో ఎప్పటికప్పుడు స్పష్టంగా పరిశీలించవచ్చు.',
        proof: '60 రోజుల కుకీ ట్రాకింగ్ + ఆడిట్ చేయగల లీడ్ రికార్డులు.',
      },
      {
        num: '02',
        title: 'క్లయింట్-ఫస్ట్ మర్యాద మరియు భద్రత',
        subtitle: 'సున్నా స్పామ్, మీ గౌరవానికి 100% రక్షణ',
        description:
          'మేము మీ పరిచయాలకు ఎటువంటి అర్థం లేని స్పామ్ మెసేజ్లు పంపము. సీనియర్ కన్సల్టెంట్లు మాత్రమే హుందాగా వారితో మాట్లాడతారు.',
        proof: 'మీ పరిచయాల దృష్టిలో మీ వ్యక్తిగత విలువ మరింత పెరుగుతుంది.',
      },
      {
        num: '03',
        title: 'క్రమం తప్పని నెలవారీ చెల్లింపులు',
        subtitle: 'ప్రతి నెలా 10వ తేదీన ఎలాంటి ఆలస్యం లేకుండా',
        description:
          'ఎలాంటి ఉపసంహరణ పరిమితులు లేదా నిబంధనల పేరిట ఆలస్యాలు ఉండవు. మీ కమీషన్ మొత్తం నిర్దేశిత సమయానికి నేరుగా బ్యాంకు ఖాతాలో పడుతుంది.',
        proof: 'బ్యాంక్ UTR నంబర్‌తో కూడిన అధికారిక చెల్లింపు రసీదులు.',
      },
    ],
  },
  sectors: {
    eyebrow: 'నిపుణత కలిగిన మూడు రంగాలు',
    headline: 'భారీ డిమాండ్ ఉన్న మూడు ప్రత్యేక రంగాలు.',
    description:
      'sBLOOM సాధారణ మార్కెటింగ్ చేయదు. నమ్మకం అత్యంత కీలకమైన రంగాలలో ప్రత్యేక ఎదుగుదల వ్యవస్థలను మేము నిర్మిస్తాము.',
    items: [
      {
        id: 'healthcare',
        name: 'హెల్త్‌కేర్ & లైఫ్ సైన్సెస్',
        tagline: 'క్లినిక్‌లు, IVF కేంద్రాలు, హాస్పిటల్స్ & స్పెషలిస్ట్ డాక్టర్లు',
        color: '#FF6B6B',
        targetClients: ['ఫెర్టిలిటీ (IVF) సెంటర్లు', 'డెంటల్ హాస్పిటల్స్', 'ఆర్థోపెడిక్ క్లినిక్‌లు', 'డెర్మటాలజీ & కాస్మోటాలజీ'],
        coreServices: ['డాక్టర్ పర్సనల్ బ్రాండింగ్', 'గూగుల్ లోకల్ మ్యాప్స్ ఆప్టిమైజేషన్', 'పేషెంట్ ట్రస్ట్ ఫన్నెల్స్', 'మెడికల్ రెగ్యులేటరీ కంప్లయన్స్'],
        typicalDealSize: '₹1.5 లక్షలు – ₹4.5 లక్షలు',
        affiliateEarning: 'ప్రతి డీల్‌పై ₹30,000 – ₹90,000',
        attributionPeriod: '60 రోజుల జీవితకాల ట్రాకింగ్',
      },
      {
        id: 'education',
        name: 'విద్యా సంస్థలు',
        tagline: 'ఇంటర్నేషనల్ స్కూల్స్, యూనివర్సిటీలు & ప్రొఫెషనల్ అకాడమీలు',
        color: '#16A34A',
        targetClients: ['ఇంటర్నేషనల్ స్కూల్స్ (CBSE/ICSE)', 'ఇంజనీరింగ్ / MBA కాలేజీలు', 'NEET / JEE కోచింగ్ అకాడమీలు', 'ఎడ్‌టెక్ సంస్థలు'],
        coreServices: ['క్యాంపస్ అడ్మిషన్ల ప్రచారం', 'పేరెంట్ వాట్సాప్ ఆటోమేషన్', 'స్టూడెంట్ వీడియో టెస్టిమోనియల్స్', 'టార్గెటెడ్ డిజిటల్ లీడ్స్'],
        typicalDealSize: '₹1.2 లక్షలు – ₹3.5 లక్షలు',
        affiliateEarning: 'ప్రతి డీల్‌పై ₹24,000 – ₹70,000',
        attributionPeriod: '60 రోజుల జీవితకాల ట్రాకింగ్',
      },
      {
        id: 'proServices',
        name: 'ప్రొఫెషనల్ సర్వీసెస్',
        tagline: 'చార్టర్డ్ అకౌంటెంట్లు, లీగల్ సంస్థలు & కన్సల్టెన్సీలు',
        color: '#0D9488',
        targetClients: ['కార్పొరేట్ లా ఫర్మ్స్', 'CA & టాక్స్ కన్సల్టెన్సీలు', 'ఆర్కిటెక్చర్ స్టూడియోలు', 'మేనేజ్‌మెంట్ అడ్వైజరీలు'],
        coreServices: ['ఎగ్జిక్యూటివ్ గోస్ట్‌రైటింగ్', 'లింక్డ్‌ఇన్ B2B రిటైనర్ ఫన్నెల్', 'హై-ఎండ్ వెబ్‌సైట్ ప్లాట్‌ఫారమ్', 'థాట్ లీడర్‌షిప్ రిపోర్ట్స్'],
        typicalDealSize: '₹1.0 లక్ష – ₹3.0 లక్షలు',
        affiliateEarning: 'ప్రతి డీల్‌పై ₹20,000 – ₹60,000',
        attributionPeriod: '60 రోజుల జీవితకాల ట్రాకింగ్',
      },
    ],
  },
  knowledgePlatform: {
    eyebrow: 'అఫిలియేట్ నాలెడ్జ్ ప్లాట్‌ఫారమ్',
    headline: 'మీ సిఫార్సులను సమర్థవంతంగా మార్చే ఆధునిక టూల్స్.',
    description:
      'రియల్-టైమ్ అనలిటిక్స్ నుండి తెలుగు పిచ్ డెక్స్ వరకు, మా పోర్టల్ మీకు అవసరమైన ప్రతి సదుపాయాన్ని అందిస్తుంది.',
    features: [
      {
        title: 'లైవ్ కమాండ్ డ్యాష్‌బోర్డ్',
        description: 'క్లిక్‌లు, నమోదైన లీడ్స్, కన్వర్షన్ రేట్లు మరియు మీ కమీషన్ బ్యాలెన్స్‌లను ఒకే చోట స్పష్టంగా వీక్షించండి.',
        tag: 'రియల్-టైమ్ అనలిటిక్స్',
      },
      {
        title: 'స్లైడ్-ఓవర్ లీడ్ డ్రాయర్',
        description: 'క్లయింట్ వివరాలు, విభాగం మరియు మీ వ్యక్తిగత నోట్స్‌తో 60 సెకన్లలో నేరుగా లీడ్ సమర్పించండి.',
        tag: 'డైరెక్ట్ లీడ్ ఎంట్రీ',
      },
      {
        title: 'స్మార్ట్ UTM లింక్ బిల్డర్',
        description: 'వాట్సాప్, లింక్డ్‌ఇన్ లేదా ఈమెయిల్ కోసం 60-రోజుల కుకీ ట్రాకింగ్‌తో కూడిన ప్రత్యేక లింక్‌లను రూపొందించుకోండి.',
        tag: 'క్యాంపెయిన్ ట్రాకింగ్',
      },
      {
        title: 'ద్విభాషా పిచ్ అకాడమీ',
        description: 'ఇంగ్లీష్ మరియు తెలుగు భాషలలో క్లయింట్ సంభాషణా సూచనలు, ప్రెజెంటేషన్ డెక్స్ మరియు సేవా గైడ్‌లు పొందండి.',
        tag: 'సేల్స్ ఎనేబుల్‌మెంట్',
      },
      {
        title: 'పారదర్శక సెటిల్‌మెంట్ లెడ్జర్',
        description: 'ఆమోదించబడిన మరియు పెండింగ్ కమీషన్లు, చెల్లింపు తేదీలు మరియు TDS వివరాలను క్షుణ్ణంగా తనిఖీ చేయండి.',
        tag: 'ఆర్థిక పారదర్శకత',
      },
      {
        title: 'డౌన్‌లోడ్ చేయగల ఇన్‌వాయిస్‌లు',
        description: 'బ్యాంక్ UTR నంబర్లతో కూడిన అధికారిక నెలవారీ పన్ను రసీదులను మీ అకౌంటింగ్ కొరకు డౌన్‌లోడ్ చేసుకోండి.',
        tag: 'పన్ను సమ్మతి',
      },
    ],
  },
  whoCanJoin: {
    eyebrow: 'ఎవరు చేరవచ్చు?',
    headline: 'విశ్వసనీయమైన నెట్‌వర్క్ ఉన్న నిపుణుల కొరకు.',
    description:
      'మీరు మార్కెటింగ్ నిపుణులు కానవసరం లేదు. మీ రంగంలో లేదా సమాజంలో మీకు మంచి పరిచయాలు ఉంటే, sBLOOM వాటిని గౌరవప్రదమైన ఆదాయంగా మార్చుకునే మార్గాన్ని అందిస్తుంది.',
    profiles: [
      {
        category: 'టెక్ & డిజిటల్ క్రియేటర్లు',
        whyFit: 'చౌకబారు ఉత్పత్తులు ప్రచారం చేయకుండా మీ ఆడియన్స్‌తో విలువైన కార్పొరేట్ సంబంధాలను నిర్మించుకోండి.',
        typicalNetwork: 'స్టార్టప్ వ్యవస్థాపకులు, ఏజెన్సీ లీడర్లు, ఆధునిక వ్యాపారవేత్తలు.',
        expectedIncome: 'నెలకు ₹40,000 – ₹1,20,000',
      },
      {
        category: 'ఏజెన్సీలు & ఫ్రీలాన్స్ డిజైనర్లు',
        whyFit: 'మీ ప్రస్తుత సేవల పరిధిలోకి రాని క్లయింట్ అవసరాలను sBLOOM కి రిఫర్ చేసి అధిక ఆదాయం పొందండి.',
        typicalNetwork: 'ఎంటర్‌ప్రైజ్ వీడియోలు, SEO లేదా ఫుల్-ఫన్నెల్ మార్కెటింగ్ కోరే క్లయింట్లు.',
        expectedIncome: 'ఒక్కో డీల్‌పై ₹30,000 – ₹90,000',
      },
      {
        category: 'బిజినెస్ డెవలప్‌మెంట్ నిపుణులు',
        whyFit: 'హై-టికెట్ ఎంటర్‌ప్రైజ్ కాంట్రాక్టులను పరిచయం చేసి స్థిరమైన మరియు పారదర్శక కమీషన్లను పొందండి.',
        typicalNetwork: 'హెల్త్‌కేర్, విద్య, రియల్ ఎస్టేట్ మరియు కార్పొరేట్ రంగాల నిర్ణయాధికారులు.',
        expectedIncome: 'నెలకు ₹50,000 – ₹2,00,000',
      },
      {
        category: 'ప్రాంతీయ కమ్యూనిటీ లీడర్లు',
        whyFit: 'దక్షిణ భారతదేశంలోని ట్రేడ్ అసోసియేషన్లు మరియు వాట్సాప్ గ్రూపులలోని మీ పరపతిని ఆదాయంగా మలచుకోండి.',
        typicalNetwork: 'క్లినిక్ డైరెక్టర్లు, పాఠశాల కరస్పాండెంట్లు, ఛాంబర్ ఆఫ్ కామర్స్ సభ్యులు.',
        expectedIncome: 'ఒక్కో రిఫరల్‌పై ₹25,000 – ₹75,000',
      },
    ],
    reassurance: 'ఎలాంటి అమ్మకాల అనుభవం అవసరం లేదు. మీ నమ్మకమైన పరిచయమే మీ ప్రధాన అర్హత.',
  },
  earningsTransparency: {
    eyebrow: 'కమీషన్ పారదర్శకత',
    headline: 'ఎలాంటి దాపరికం లేని అధిక-విలువ కమీషన్లు.',
    description:
      'మేము పూర్తి ఆర్థిక స్పష్టతను పాటిస్తాము. మీ కమీషన్ ఎలా లెక్కించబడుతుందో మరియు ఎప్పుడు అందుతుందో ఇక్కడ వివరంగా ఉంది.',
    tiers: [
      {
        tierName: 'స్టాండర్డ్ రిఫరల్',
        rate: '15% – 20%',
        qualification: 'త్రైమాసికంలో 1 నుండి 3 క్లయింట్ డీల్స్',
        avgPerDeal: '₹18,000 – ₹35,000',
      },
      {
        tierName: 'గ్రోత్ పార్ట్‌నర్',
        rate: '20% – 22%',
        qualification: 'త్రైమాసికంలో 4 నుండి 7 క్లయింట్ డీల్స్',
        avgPerDeal: '₹35,000 – ₹55,000',
      },
      {
        tierName: 'ఎంటర్‌ప్రైజ్ సర్కిల్',
        rate: '25% ఫ్లాట్',
        qualification: '8+ డీల్స్ లేదా ₹3 లక్షల పైబడిన ఎంటర్‌ప్రైజ్ రిటైనర్లు',
        avgPerDeal: '₹50,000 – ₹95,000',
      },
    ],
    simulator: {
      title: 'ఇంటరాక్టివ్ ఆదాయ కాలిక్యులేటర్',
      subtitle: 'మీ పరిచయాల సంఖ్య ఆధారంగా మీరు పొందగల ఆదాయాన్ని లెక్కించండి.',
      dealCountLabel: 'త్రైమాసికంలో ముగిసే క్లయింట్ డీల్స్ సంఖ్య:',
      avgDealLabel: 'సగటు కాంట్రాక్ట్ విలువ:',
      projectedQuarterly: 'అంచనా వేసిన త్రైమాసిక కమీషన్',
      projectedMonthly: 'సగటు నెలవారీ ఆదాయం',
      disclaimer: '20% సగటు కమీషన్ రేటుతో లెక్కించబడింది. రిటైనర్ పునరుద్ధరణలతో అదనపు నెలవారీ రికరింగ్ ఆదాయం లభిస్తుంది.',
    },
    policies: [
      {
        title: '60 రోజుల కుకీ ట్రాకింగ్',
        description: 'క్లయింట్ ఈరోజు మీ లింక్‌ను సందర్శించి 60 రోజుల్లోపు డీల్ పూర్తి చేసుకున్నా మీకు పూర్తి కమీషన్ లభిస్తుంది.',
      },
      {
        title: 'ప్రతి నెలా 10వ తేదీన చెల్లింపు',
        description: 'మునుపటి నెలలో ఆమోదించబడిన అన్ని కమీషన్లు నిర్దేశిత తేదీకి బ్యాంకులో జమవుతాయి.',
      },
      {
        title: 'కనీస ఉపసంహరణ పరిమితి లేదు',
        description: 'మీ కమీషన్ ₹5,000 అయినా లేదా ₹2,50,000 అయినా పూర్తి మొత్తం ఎలాంటి ఆంక్షలు లేకుండా చెల్లించబడుతుంది.',
      },
      {
        title: 'సెక్షన్ 194H TDS సమ్మతి',
        description: 'భారత ప్రభుత్వ నిబంధనల ప్రకారం 5% TDS మినహాయించి త్రైమాసిక ఫారం 16A సర్టిఫికేట్ అందించబడుతుంది.',
      },
    ],
  },
  faq: {
    eyebrow: 'తరచుగా అడిగే ప్రశ్నలు',
    headline: 'sBLOOM అఫిలియేట్ ప్రోగ్రామ్ గురించి సమగ్ర వివరాలు.',
    description: 'ట్రాకింగ్, చెల్లింపులు మరియు క్లయింట్ గోప్యత గురించిన మీ సందేహాలకు స్పష్టమైన సమాధానాలు.',
    items: [
      {
        question: 'sBLOOM అఫిలియేట్ ప్రోగ్రామ్‌లో చేరడానికి రుసుము ఎంత?',
        answer:
          'సభ్యుడిగా చేరడం 100% ఉచితం. ఎటువంటి రిజిస్ట్రేషన్ ఫీజులు, సబ్‌స్క్రిప్షన్ ఛార్జీలు లేదా రహస్య రుసుములు లేవు. సైన్ అప్ చేసిన వెంటనే మీ ఖాతా మరియు రిఫరల్ కోడ్ యాక్టివేట్ అవుతాయి.',
      },
      {
        question: 'నా రిఫరల్స్ ఎలా ఖచ్చితంగా ట్రాక్ చేయబడతాయి?',
        answer:
          'మేము డ్యూయల్ అట్రిబ్యూషన్ సిస్టమ్‌ను ఉపయోగిస్తాము: మీ ప్రత్యేక రిఫరల్ లింక్‌కు 60 రోజుల కుకీ భద్రత ఉంటుంది, మరియు మీరు పోర్టల్ లీడ్ డ్రాయర్ ద్వారా నేరుగా లీడ్ సమర్పించవచ్చు. ఒక్కసారి సమర్పిస్తే మీ క్రెడిట్ లాక్ అవుతుంది.',
      },
      {
        question: 'నాకు కమీషన్ చెల్లింపులు ఎప్పుడు మరియు ఎలా అందుతాయి?',
        answer:
          'ప్రతి నెలా 10వ తేదీన చెల్లింపులు జరుగుతాయి. NEFT/IMPS లేదా మీ ధృవీకరించబడిన UPI ద్వారా నేరుగా భారతీయ బ్యాంక్ ఖాతాలోకి బదిలీ చేయబడుతుంది, మరియు అధికారిక TDS ఫారం 16A సర్టిఫికేట్ జతచేయబడుతుంది.',
      },
      {
        question: 'నేను స్వయంగా ప్రపోజల్స్ తయారు చేయాలా లేదా క్లయింట్‌తో బేరసారాలు ఆడాలా?',
        answer:
          'అస్సలు అవసరం లేదు. మీ పని కేవలం పరిచయం చేయడమే. లీడ్ అందిన వెంటనే sBLOOM సీనియర్ ఇండస్ట్రీ కన్సల్టెంట్లు క్లయింట్‌తో సమావేశమై, ప్రెజెంటేషన్ ఇచ్చి, కాంట్రాక్ట్ ఖరారు చేస్తారు.',
      },
      {
        question: 'క్లయింట్ డీల్ ఖరారు చేసుకోవడానికి 4 నుండి 6 వారాల సమయం తీసుకుంటే నా కమీషన్ వస్తుందా?',
        answer:
          'ఖచ్చితంగా వస్తుంది! సంస్థాగత నిర్ణయాలకు బోర్డు అనుమతులు అవసరమవుతాయి. మా 60-రోజుల అట్రిబ్యూషన్ విండో మీ సిఫార్సును సురక్షితంగా ఉంచుతుంది, డీల్ ఎప్పుడు ముగిసినా మీకు పూర్తి కమీషన్ అందుతుంది.',
      },
      {
        question: 'నా నెట్‌వర్క్ ప్రధానంగా ఆంధ్రప్రదేశ్ మరియు తెలంగాణ ప్రాంతాలకు చెందినదైతే నేను చేరవచ్చా?',
        answer:
          'తప్పకుండా! దక్షిణ భారతదేశం మా అత్యంత క్రియాశీలక మార్కెట్లలో ఒకటి. మేము తెలుగు మరియు ఇంగ్లీష్ భాషలలో కరపత్రాలు మరియు పిచ్ డెక్స్ అందిస్తాము, మరియు మా కన్సల్టింగ్ బృందం తెలుగులో అనర్గళంగా మాట్లాడగలదు.',
      },
    ],
  },
  finalCta: {
    eyebrow: 'అవకాశపు దారం మీ చేతుల్లోనే ఉంది',
    headline: 'మీ నెట్‌వర్క్ ఇప్పటికే ఎదుగుదల కోసం చూస్తోంది. వారికి సరైన భాగస్వామిని అందించండి.',
    description:
      'వందలాది మంది క్రియేటర్లు, కన్సల్టెంట్లు, ఏజెన్సీ వ్యవస్థాపకులు మరియు ప్రాంతీయ నాయకులతో చేరి sBLOOM తో స్థిరమైన మరియు పారదర్శకమైన ఆదాయాన్ని ప్రారంభించండి.',
    primaryCta: 'మీ అఫిలియేట్ ఖాతాను సృష్టించండి →',
    secondaryCta: 'డెమో డ్యాష్‌బోర్డ్‌ను చూడండి',
    securityNote: 'తక్షణ భాగస్వామ్య నమోదు • వేచి ఉండే అవసరం లేదు • 100% ఉచితం',
  },
  contact: {
    eyebrow: 'సహాయం & విచారణలు',
    headline: 'చేరడానికి ముందు ఏవైనా ప్రశ్నలు ఉన్నాయా? మా పార్ట్‌నర్‌షిప్ టీమ్‌తో మాట్లాడండి.',
    description: 'మీ లింక్‌లను కాన్ఫిగర్ చేసుకోవడానికి మరియు మీ ప్రశ్నలకు సమాధానాలు ఇవ్వడానికి మేము సిద్ధంగా ఉన్నాము.',
    channels: [
      {
        title: 'పార్ట్‌నర్ సపోర్ట్ ఈమెయిల్',
        value: 'affiliates@sbloom.io',
        actionText: 'ఈమెయిల్ పంపండి',
        href: 'mailto:affiliates@sbloom.io',
        badge: '4 గంటల్లో సమాధానం',
      },
      {
        title: 'వాట్సాప్ పార్ట్‌నర్‌షిప్ డెస్క్',
        value: '+91 98765 43210',
        actionText: 'వాట్సాప్‌లో సంప్రదించండి',
        href: 'https://wa.me/919876543210?text=నమస్కారం%20sBLOOM,%20అఫిలియేట్%20ప్రోగ్రామ్%20గురించి%20తెలుసుకోవాలనుకుంటున్నాను',
        badge: 'తక్షణ సందేశం',
      },
      {
        title: 'హైదరాబాద్ టెక్నాలజీ సెంటర్',
        value: 'హైటెక్ సిటీ, హైదరాబాద్, తెలంగాణ',
        actionText: 'లొకేషన్ చూడండి',
        href: '#contact',
        badge: 'కార్పొరేట్ ఆఫీస్',
      },
    ],
  },
  footer: {
    aboutText:
      'sBLOOM అనేది పరిశ్రమ-కేంద్రీకృత మార్కెటింగ్ మరియు ఎంటర్‌ప్రైజ్ గ్రోత్ పార్ట్‌నర్. sBLOOM అఫిలియేట్ పోర్టల్ క్రియేటర్లు, కన్సల్టెంట్లు మరియు ఏజెన్సీలకు పారదర్శక ఆదాయ మార్గాన్ని అందిస్తుంది.',
    columns: [
      {
        title: 'అఫిలియేట్ పోర్టల్',
        links: [
          { label: 'పార్ట్‌నర్ డ్యాష్‌బోర్డ్', href: '/app' },
          { label: 'సర్వీసెస్ కేటలాగ్', href: '/app/services' },
          { label: 'లీడ్ సమర్పించండి', href: '/app/leads' },
          { label: 'ఆదాయాల లెడ్జర్', href: '/app/earnings' },
        ],
      },
      {
        title: 'విభాగాలు',
        links: [
          { label: 'హెల్త్‌కేర్ & IVF', href: '#services' },
          { label: 'విద్య & విద్యా సంస్థలు', href: '#services' },
          { label: 'ప్రొఫెషనల్ సర్వీసెస్', href: '#services' },
          { label: 'పిచ్ అకాడమీ', href: '/app/learn' },
        ],
      },
      {
        title: 'విశ్వసనీయత & పాలన',
        links: [
          { label: 'అఫిలియేట్ ఎథిక్స్ చార్టర్', href: '/app/support' },
          { label: 'TDS సెక్షన్ 194H నిబంధనలు', href: '/app/earnings' },
          { label: 'సేవా నిబంధనలు', href: '/app/signup' },
          { label: 'గోప్యతా విధానం', href: '/app/signup' },
        ],
      },
    ],
    copyright: '© 2026 sBLOOM Creator & Growth Ecosystem. సర్వహక్కులు ప్రత్యేకించబడ్డాయి.',
    legalNote: 'భారతీయ డిజిటల్ వాణిజ్య నిబంధనలకు అనుగుణంగా రూపొందించబడిన డెమో మరియు ప్రొడక్షన్ పర్యావరణం.',
  },
};

