import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { apiClient } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import type { LeadItem, ServiceCatalogItem } from '../../types/api';
import { 
  CheckCircle2, 
  Building, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Briefcase, 
  AlertTriangle, 
  Sparkles,
  Info 
} from 'lucide-react';

interface LeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLead: LeadItem | null;
  mode: 'view' | 'create';
  servicesList?: ServiceCatalogItem[];
  onLeadCreated?: (newLead: LeadItem) => void;
}

export const LeadDrawer: React.FC<LeadDrawerProps> = ({
  isOpen,
  onClose,
  selectedLead,
  mode,
  servicesList = [],
  onLeadCreated,
}) => {
  const { user } = useAuth();

  // Form State
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Hyderabad, Telangana');
  const [sector, setSector] = useState('Healthcare');
  const [serviceId, setServiceId] = useState(
    servicesList.length > 0 ? servicesList[0].id : 'srv-whatsapp-automation'
  );
  const [requirements, setRequirements] = useState('');
  const [preferredMeeting, setPreferredMeeting] = useState('');
  const [consent, setConsent] = useState(false);
  const [notes, setNotes] = useState('');

  // UI & Network Feedback State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdRefNumber, setCreatedRefNumber] = useState<string | null>(null);

  const resetForm = () => {
    setBusinessName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setLocation('Hyderabad, Telangana');
    setSector('Healthcare');
    setServiceId(servicesList.length > 0 ? servicesList[0].id : 'srv-whatsapp-automation');
    setRequirements('');
    setPreferredMeeting('');
    setConsent(false);
    setNotes('');
    setErrors({});
    setServerError(null);
    setCreatedRefNumber(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!businessName.trim()) newErrors.businessName = 'Business or organization name is required.';
    if (!contactName.trim()) newErrors.contactName = 'Contact person full name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid email format.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Contact phone number is required.';
    }
    if (!location.trim()) {
      newErrors.location = 'Location / city is required.';
    }
    if (!requirements.trim() || requirements.trim().length < 10) {
      newErrors.requirements = 'Please describe requirements with at least 10 characters.';
    }
    if (!consent) {
      newErrors.consent = 'Explicit consent is required to process and refer client data.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Prevent duplicate submission
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Connect to FastAPI endpoint: POST /api/v1/leads
      const createdLead = await apiClient.createLead({
        business_name: businessName.trim(),
        contact_name: contactName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: location.trim(),
        sector,
        services_of_interest: [serviceId],
        business_requirements: requirements.trim(),
        preferred_meeting_datetime: preferredMeeting || undefined,
        timezone: 'Asia/Kolkata',
        consent,
        affiliate_code: user?.referralCode || 'SBLOOM-HARSHI-78',
        notes: notes.trim() || undefined,
      });

      // API confirmed success: display the returned reference number
      setCreatedRefNumber(createdLead.reference_number);

      if (onLeadCreated) {
        onLeadCreated(createdLead);
      }

      // Close drawer after short visual confirmation
      setTimeout(() => {
        handleClose();
      }, 1800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit lead to backend.';
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectorOptions = [
    { value: 'Healthcare', label: 'Healthcare & Clinics' },
    { value: 'Education', label: 'Education & Academies' },
    { value: 'Professional Services', label: 'Professional Services & Consulting' },
    { value: 'Technology & Enterprise', label: 'Technology & Enterprise' },
    { value: 'Retail & E-commerce', label: 'Retail & E-commerce' },
  ];

  const serviceOptions = servicesList.length > 0
    ? servicesList.map((s) => ({
        value: s.id,
        label: `${s.name} (${s.category})`,
      }))
    : [
        { value: 'srv-whatsapp-automation', label: 'WhatsApp Automation (Healthcare)' },
        { value: 'srv-website-building', label: 'Website Building (Professional Services)' },
        { value: 'srv-seo', label: 'Search Engine Optimization - SEO (Healthcare)' },
        { value: 'srv-google-ads', label: 'Google Ads (Education)' },
        { value: 'srv-meta-ads', label: 'Meta Ads (Professional Services)' },
      ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'create' ? 'Submit New Customer Lead' : 'Lead Details & Commission Audit'}
      subtitle={
        mode === 'create'
          ? 'Connected to FastAPI backend POST /api/v1/leads'
          : selectedLead ? `Reference ID: ${selectedLead.reference_number || selectedLead.id}` : ''
      }
      width="lg"
    >
      {mode === 'create' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Server Error Alert */}
          {serverError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start space-x-2 text-xs">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Backend Error: </span>
                <span>{serverError}</span>
              </div>
            </div>
          )}

          {/* Success Confirmation with Returned Reference Number */}
          {createdRefNumber && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start space-x-2.5 text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">
                  Lead successfully recorded by FastAPI Backend!
                </span>
                <span className="text-[11px] text-emerald-800">
                  Assigned Reference: <strong className="font-mono">{createdRefNumber}</strong>. Added to your live My Leads list.
                </span>
              </div>
            </div>
          )}

          <div className="p-3 rounded-xl bg-sbloom-surface border border-sbloom-border text-xs text-sbloom-text-secondary flex items-start space-x-2">
            <Info className="w-4 h-4 text-sbloom-violet flex-shrink-0 mt-0.5" />
            <span>
              All fields marked with <span className="text-sbloom-magenta font-bold">*</span> are validated by the FastAPI backend schema.
            </span>
          </div>

          <Input
            label="Business / Organization Name"
            placeholder="e.g. Apex Cloud Solutions Pvt Ltd"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            errorMessage={errors.businessName}
            required
            disabled={isSubmitting}
            leftIcon={<Building className="w-4 h-4" />}
          />

          <Input
            label="Contact Person Name"
            placeholder="e.g. Vikramaditya Sharma"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            errorMessage={errors.contactName}
            required
            disabled={isSubmitting}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Business Email"
              type="email"
              placeholder="vikram@apexcloud.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errorMessage={errors.email}
              required
              disabled={isSubmitting}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Phone / WhatsApp"
              placeholder="+91 98450 11223"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              errorMessage={errors.phone}
              required
              disabled={isSubmitting}
              leftIcon={<Phone className="w-4 h-4" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Location / City"
              placeholder="e.g. Hyderabad, India"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              errorMessage={errors.location}
              required
              disabled={isSubmitting}
              leftIcon={<MapPin className="w-4 h-4" />}
            />

            <Select
              label="Industry Sector"
              options={sectorOptions}
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <Select
            label="Service of Interest"
            options={serviceOptions}
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            disabled={isSubmitting}
            helperText="Commission rate is automatically calculated upon deal qualification."
            required
          />

          <Textarea
            label="Business Requirements & Project Scope"
            placeholder="Describe client's team size, pain points, or automation goals (min 10 characters)..."
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            errorMessage={errors.requirements}
            disabled={isSubmitting}
            rows={3}
            required
          />

          <Input
            label="Preferred Meeting Date & Time (Optional)"
            type="datetime-local"
            value={preferredMeeting}
            onChange={(e) => setPreferredMeeting(e.target.value)}
            disabled={isSubmitting}
            leftIcon={<Calendar className="w-4 h-4" />}
          />

          <Textarea
            label="Internal Affiliate Notes (Optional)"
            placeholder="Context on how you connected with this lead..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={isSubmitting}
            rows={2}
          />

          {/* Explicit Consent Checkbox */}
          <div className="pt-1">
            <label className="flex items-start space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                disabled={isSubmitting}
                className="mt-0.5 rounded text-sbloom-violet focus:ring-sbloom-violet border-sbloom-border"
              />
              <span className="text-xs text-sbloom-text-secondary leading-tight">
                <span className="text-sbloom-magenta font-bold">*</span> Client has provided explicit consent to be contacted regarding sBLOOM enterprise services.
              </span>
            </label>
            {errors.consent && (
              <p className="text-xs text-red-600 mt-1 font-medium">{errors.consent}</p>
            )}
          </div>

          <div className="pt-4 border-t border-sbloom-border flex items-center justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              {isSubmitting ? 'Recording on Backend...' : 'Submit Lead'}
            </Button>
          </div>

        </form>
      ) : selectedLead ? (
        <div className="space-y-6 text-xs text-sbloom-text-main">
          
          {/* Header Card */}
          <div className="p-4 rounded-2xl bg-white border border-sbloom-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-sbloom-violet font-bold">
                {selectedLead.reference_number || selectedLead.id}
              </span>
              <StatusBadge status={selectedLead.status} />
            </div>

            <div>
              <h4 className="font-fraunces text-lg font-bold text-sbloom-text-main">
                {selectedLead.business_name}
              </h4>
              <p className="text-xs text-sbloom-text-secondary flex items-center space-x-1.5 mt-0.5">
                <span>Contact:</span>
                <span className="font-semibold text-sbloom-text-main">{selectedLead.contact_name}</span>
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-4 rounded-2xl bg-sbloom-surface border border-sbloom-border space-y-2.5">
            <h5 className="font-bold text-sbloom-text-secondary uppercase text-[10px] tracking-wider">
              Client Contact Information
            </h5>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-sbloom-violet" />
              <span>{selectedLead.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-sbloom-violet" />
              <span>{selectedLead.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-sbloom-violet" />
              <span>{selectedLead.location} ({selectedLead.sector})</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5 text-sbloom-violet" />
              <span>Submitted: {new Date(selectedLead.created_at).toLocaleString()}</span>
            </div>
          </div>

          {/* Commission Breakdown */}
          <div className="p-4 rounded-2xl bg-white border border-sbloom-border space-y-3">
            <h5 className="font-bold text-sbloom-text-secondary uppercase text-[10px] tracking-wider">
              Commission Breakdown (Simulated Demo)
            </h5>
            <div className="flex items-center justify-between pb-2 border-b border-sbloom-border/60">
              <span className="text-sbloom-text-secondary">Selected Services</span>
              <span className="font-semibold">{selectedLead.services_of_interest?.join(', ') || 'Enterprise Pipeline'}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-sbloom-border/60">
              <span className="text-sbloom-text-secondary">Estimated Deal Value</span>
              <span className="font-semibold">{selectedLead.estimated_value}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-sbloom-violet">Estimated Commission</span>
              <span className="font-bold font-fraunces text-base text-sbloom-text-main">
                {selectedLead.estimated_commission}
              </span>
            </div>
          </div>

          {/* Requirements & Notes */}
          <div className="p-4 rounded-2xl bg-sbloom-canvas border border-sbloom-border space-y-1.5">
            <h5 className="font-bold text-sbloom-text-secondary uppercase text-[10px] tracking-wider">
              Project Requirements
            </h5>
            <p className="text-xs text-sbloom-text-secondary leading-relaxed">
              {selectedLead.business_requirements}
            </p>
          </div>

          <div className="pt-4 border-t border-sbloom-border flex justify-end">
            <Button variant="outline" size="sm" onClick={handleClose}>
              Close Details
            </Button>
          </div>

        </div>
      ) : null}
    </Drawer>
  );
};
