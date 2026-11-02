export type Language = 'en' | 'te';

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    te: string;
  };
}

export const translations: TranslationDictionary = {
  // Navigation & Brand
  brandName: { en: 'sBLOOM', te: 'ఎస్ బ్లూమ్ (sBLOOM)' },
  portalTitle: { en: 'Affiliate Portal', te: 'అఫిలియేట్ పోర్టల్' },
  adminPortalTitle: { en: 'Admin Portal', te: 'అడ్మిన్ పోర్టల్' },
  dashboard: { en: 'Dashboard', te: 'డ్యాష్‌బోర్డ్' },
  services: { en: 'Services', te: 'సేవలు' },
  learn: { en: 'Learn', te: 'నేర్చుకోండి' },
  myLeads: { en: 'My Leads', te: 'నా లీడ్‌లు' },
  earnings: { en: 'Earnings', te: 'ఆదాయాలు' },
  invoices: { en: 'Invoices', te: 'ఇన్‌వాయిస్‌లు' },
  profile: { en: 'Profile', te: 'ప్రొఫైల్' },
  support: { en: 'Support', te: 'సహాయం' },
  adminOverview: { en: 'Overview', te: 'అడ్మిన్ సమీక్ష' },
  adminLeads: { en: 'Lead Management', te: 'లీడ్ నిర్వహణ' },
  switchView: { en: 'Switch View', te: 'వీక్షణ మార్చండి' },
  switchToAdmin: { en: 'Switch to Admin', te: 'అడ్మిన్ మోడ్‌కు మారండి' },
  switchToAffiliate: { en: 'Back to Affiliate Portal', te: 'అఫిలియేట్ మోడ్‌కు మారండి' },
  
  // Header & Topbar
  welcomeBack: { en: 'Welcome back', te: 'తిరిగి స్వాగతం' },
  teluguDraftNotice: { 
    en: 'Telugu translations are draft pending native-speaker review', 
    te: 'తెలుగు అనువాదం ప్రస్తుతం డ్రాఫ్ట్ దశలో ఉంది (సమీక్ష పెండింగ్)' 
  },
  demoNotice: {
    en: 'Demonstration Environment: All figures, commissions, and sample leads are simulated examples.',
    te: 'డెమో పర్యావరణం: అన్ని సంఖ్యలు మరియు లీడ్‌లు కేవలం ప్రదర్శన కొరకు మాత్రమే.'
  },
  copyAffiliateLink: { en: 'Copy Affiliate Link', te: 'అఫిలియేట్ లింక్ కాపీ చేయండి' },
  linkCopied: { en: 'Link copied to clipboard!', te: 'లింక్ కాపీ చేయబడింది!' },
  submitLead: { en: 'Submit New Lead', te: 'కొత్త లీడ్ సమర్పించండి' },
  signOut: { en: 'Sign Out', te: 'లాగ్ అవుట్' },
  login: { en: 'Log In', te: 'లాగిన్' },
  signUp: { en: 'Join sBLOOM', te: 'సభ్యుడిగా చేరండి' },

  // Auth pages
  joinDirectlyTitle: { en: 'Instant Partner Access', te: 'తక్షణ భాగస్వామ్య నమోదు' },
  joinDirectlySubtitle: { 
    en: 'Join the sBLOOM creator ecosystem directly. No manual waiting list or delayed approval.',
    te: 'ఎలాంటి వేచి ఉండే సమయం లేకుండా వెంటనే sBLOOM అఫిలియేట్‌గా చేరండి.' 
  },
  fullName: { en: 'Full Name', te: 'పూర్తి పేరు' },
  emailAddress: { en: 'Email Address', te: 'ఈమెయిల్ చిరునామా' },
  phoneNumber: { en: 'Phone / WhatsApp Number', te: 'ఫోన్ / వాట్సాప్ నంబర్' },
  password: { en: 'Password', te: 'పాస్‌వర్డ్' },
  category: { en: 'Promotion Category', te: 'ప్రచార వర్గం' },
  termsAgreement: { 
    en: 'I agree to the sBLOOM Affiliate Partner Terms & Ethics Guidelines', 
    te: 'నేను sBLOOM భాగస్వామ్య నిబంధనలను అంగీకరిస్తున్నాను' 
  },
  createAccountButton: { en: 'Create Active Account', te: 'ఖాతాను సృష్టించండి' },
  alreadyHaveAccount: { en: 'Already have an account? Log in', te: 'ఇప్పటికే ఖాతా ఉందా? లాగిన్ అవ్వండి' },
  dontHaveAccount: { en: "Don't have an account? Sign up now", te: 'ఖాతా లేదా? ఇప్పుడే నమోదు చేసుకోండి' },

  // Metrics
  totalEarnings: { en: 'Total Earnings', te: 'మొత్తం సంపాదన' },
  pendingCommission: { en: 'Pending Commission', te: 'పెండింగ్ కమీషన్' },
  convertedLeads: { en: 'Converted Leads', te: 'కన్వర్ట్ అయిన లీడ్‌లు' },
  conversionRate: { en: 'Conversion Rate', te: 'కన్వర్షన్ రేటు' },
  activePromotions: { en: 'Active Services', te: 'యాక్టివ్ సేవలు' },

  // Common UI
  filter: { en: 'Filter', te: 'ఫిల్టర్' },
  searchPlaceholder: { en: 'Search by client, service or status...', te: 'వెతకండి...' },
  status: { en: 'Status', te: 'స్థితి' },
  date: { en: 'Date', te: 'తేదీ' },
  clientName: { en: 'Client Name', te: 'క్లయింట్ పేరు' },
  servicePromoted: { en: 'Service', te: 'సేవ' },
  commission: { en: 'Commission', te: 'కమీషన్' },
  actions: { en: 'Actions', te: 'చర్యలు' },
  viewDetails: { en: 'View Details', te: 'వివరాలు చూడండి' },
  close: { en: 'Close', te: 'మూసివేయి' },
  cancel: { en: 'Cancel', te: 'రద్దు చేయి' },
  save: { en: 'Save', te: 'సేవ్ చేయి' },
  confirm: { en: 'Confirm', te: 'నిర్ధారించు' },
  comingSoonTitle: { en: 'Module Coming Soon', te: 'ఈ విభాగం త్వరలో అందుబాటులోకి వస్తుంది' },
  comingSoonDesc: { 
    en: 'This module is scheduled for Phase 2 deployment alongside live Supabase database sync.',
    te: 'ఈ విభాగం ఫేజ్ 2 లో లైవ్ డేటాబేస్ అనుసంధానంతో విడుదల కానుంది.'
  },
};
