import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { LeadDrawer } from '../../components/features/LeadDrawer';
import { DemoDataNotice } from '../../components/ui/DemoDataNotice';
import { 
  Briefcase, 
  Copy, 
  Check, 
  Search, 
  CheckCircle2, 
  Coins, 
  ArrowRight,
  RefreshCw,
  AlertTriangle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../services/api';
import type { ServiceCatalogItem, LeadItem } from '../../types/api';

export const ServicesPage: React.FC = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<ServiceCatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Drawer for direct referral
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedServiceForLead, setSelectedServiceForLead] = useState<string | undefined>(undefined);

  const fetchServices = async () => {
    setIsLoading(true);
    setServerError(null);
    try {
      const data = await apiClient.getServices();
      setServices(data.services || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch services from backend.';
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchServices();
  }, []);

  const categories = ['All', ...Array.from(new Set(services.map((s) => s.category)))];

  const filteredServices = services.filter((srv) => {
    const matchesSearch =
      srv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || srv.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyServiceLink = (serviceId: string) => {
    const code = user?.referralCode || 'SBLOOM-HARSHI-78';
    const link = `${window.location.origin}/services/${serviceId}?ref=${code}`;
    navigator.clipboard.writeText(link);
    setCopiedId(serviceId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReferService = (serviceId: string) => {
    setSelectedServiceForLead(serviceId);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Demo Notice */}
      <DemoDataNotice />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-sbloom-text-main">
            Services & Commission Catalog
          </h2>
          <p className="text-xs sm:text-sm text-sbloom-text-secondary mt-1">
            Connected to FastAPI backend: <code className="text-xs font-mono bg-sbloom-surface px-1.5 py-0.5 rounded text-sbloom-violet">GET /api/v1/services</code>. Promote sBLOOM enterprise products and earn up to 25% on client contracts.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="md"
            onClick={fetchServices}
            disabled={isLoading}
            leftIcon={<RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}
          >
            Refresh
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setSelectedServiceForLead(undefined);
              setIsDrawerOpen(true);
            }}
            leftIcon={<Coins className="w-4 h-4" />}
          >
            Refer a Custom Lead
          </Button>
        </div>
      </div>

      {/* Server Error Alert */}
      {serverError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start justify-between text-xs">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Failed to load services: </span>
              <span>{serverError}</span>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={fetchServices}>
            Try Again
          </Button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-sbloom-border shadow-sbloom">
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search services, AI workflows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-sbloom-violet text-white shadow-2xs'
                  : 'bg-sbloom-surface text-sbloom-text-secondary hover:text-sbloom-text-main hover:bg-[#ebd9c7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-sbloom-border space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin text-sbloom-violet mx-auto" />
          <p className="text-xs text-sbloom-text-secondary">Loading services catalog from FastAPI backend...</p>
        </div>
      ) : (
        /* Services Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} variant="canvas" padding="lg" hoverable className="flex flex-col justify-between">
              <div className="space-y-4">
                
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sbloom-violet">
                      {service.category}
                    </span>
                    <h3 className="font-fraunces text-xl font-bold text-sbloom-text-main mt-0.5">
                      {service.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-xl bg-sbloom-lime/30 text-sbloom-text-main font-bold font-fraunces text-sm">
                      {service.commission_rate}
                    </span>
                    <span className="block text-[10px] text-sbloom-text-secondary mt-0.5">Commission Rate</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-sbloom-text-secondary leading-relaxed">
                  {service.description}
                </p>

                {/* Feature Tags */}
                <div className="space-y-1.5 pt-2">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-sbloom-text-main">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#6fa014] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Commission Stats Pill */}
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-sbloom-surface border border-sbloom-border/70 text-xs">
                  <div>
                    <span className="text-[10px] text-sbloom-text-secondary block">Average Payout (Est):</span>
                    <span className="font-bold font-fraunces text-sbloom-text-main">{service.avg_commission}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-sbloom-text-secondary block">Attribution Cookie:</span>
                    <span className="font-bold text-sbloom-text-main">{service.cookie_duration}</span>
                  </div>
                </div>

              </div>

              {/* Action Bar */}
              <div className="mt-6 pt-4 border-t border-sbloom-border/70 flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyServiceLink(service.id)}
                  leftIcon={copiedId === service.id ? <Check className="w-3.5 h-3.5 text-sbloom-violet" /> : <Copy className="w-3.5 h-3.5" />}
                >
                  {copiedId === service.id ? 'Link Copied!' : 'Copy Promo Link'}
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleReferService(service.id)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Refer Client
                </Button>
              </div>

            </Card>
          ))}
        </div>
      )}

      {/* Direct Referral Drawer */}
      <LeadDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedLead={null}
        mode="create"
        servicesList={services}
      />

    </div>
  );
};

