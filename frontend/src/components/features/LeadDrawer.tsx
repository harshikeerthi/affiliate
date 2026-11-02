import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { SAMPLE_SERVICES } from '../../data/sampleServices';
import { Lead } from '../../data/sampleLeads';
import { CheckCircle2, Building, Mail, Phone, Calendar, DollarSign, Sparkles } from 'lucide-react';

interface LeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLead: Lead | null;
  mode: 'view' | 'create';
  onSubmitLead: (newLead: Omit<Lead, 'id' | 'submittedDate' | 'isDemoSample'>) => void;
}

export const LeadDrawer: React.FC<LeadDrawerProps> = ({
  isOpen,
  onClose,
  selectedLead,
  mode,
  onSubmitLead,
}) => {
  // Form State
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState(SAMPLE_SERVICES[0].id);
  const [notes, setNotes] = useState('');
  
  // Validation & UI State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const resetForm = () => {
    setClientName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setServiceId(SAMPLE_SERVICES[0].id);
    setNotes('');
    setErrors({});
    setSuccessMessage(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!clientName.trim()) newErrors.clientName = 'Client full name is required.';
    if (!companyName.trim()) newErrors.companyName = 'Company name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid email format.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Contact phone number is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const selectedService = SAMPLE_SERVICES.find((s) => s.id === serviceId) || SAMPLE_SERVICES[0];
      
      onSubmitLead({
        clientName,
        companyName,
        email,
        phone,
        serviceId,
        serviceName: selectedService.name,
        estimatedValue: '₹95,000',
        commissionEst: selectedService.avgCommission.split(' /')[0],
        status: 'Pending',
        notes: notes || 'Direct referral submitted by affiliate.',
      });

      setIsSubmitting(false);
      setSuccessMessage(true);
      setTimeout(() => {
        handleClose();
      }, 1500);
    }, 600);
  };

  const serviceOptions = SAMPLE_SERVICES.map((s) => ({
    value: s.id,
    label: `${s.name} (${s.commissionRate} commission)`,
  }));

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'create' ? 'Submit New Customer Lead' : 'Lead Details & Commission Audit'}
      subtitle={
        mode === 'create'
          ? 'Enter your referred client information to lock your commission.'
          : selectedLead ? `Reference ID: ${selectedLead.id}` : ''
      }
      width="lg"
    >
      {mode === 'create' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {successMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center space-x-2 text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span className="font-semibold">
                Lead submitted successfully! It has been added to your tracking table.
              </span>
            </div>
          )}

          <div className="p-3 rounded-xl bg-sbloom-surface border border-sbloom-border text-xs text-sbloom-text-secondary flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-sbloom-violet flex-shrink-0 mt-0.5" />
            <span>
              All fields marked with <span className="text-sbloom-magenta font-bold">*</span> are required for attribution tracking.
            </span>
          </div>

          <Input
            label="Client Contact Name"
            placeholder="e.g. Rajesh Kumar"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            errorMessage={errors.clientName}
            required
          />

          <Input
            label="Client Company / Organization"
            placeholder="e.g. Zenitron Technologies"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            errorMessage={errors.companyName}
            required
            leftIcon={<Building className="w-4 h-4" />}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Client Email"
              type="email"
              placeholder="rajesh@zenitron.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errorMessage={errors.email}
              required
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Client Phone / WhatsApp"
              placeholder="+91 98450 12345"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              errorMessage={errors.phone}
              required
              leftIcon={<Phone className="w-4 h-4" />}
            />
          </div>

          <Select
            label="Referred Service"
            options={serviceOptions}
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            helperText="Commission is credited based on this service tier upon closing."
            required
          />

          <Textarea
            label="Additional Notes / Client Needs"
            placeholder="Describe client's timeline, budget, or key pain points..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />

          <div className="pt-4 border-t border-sbloom-border flex items-center justify-end space-x-3">
            <Button type="button" variant="outline" size="md" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" isLoading={isSubmitting}>
              Submit Lead
            </Button>
          </div>

        </form>
      ) : selectedLead ? (
        <div className="space-y-6 text-xs text-sbloom-text-main">
          
          {/* Header Card */}
          <div className="p-4 rounded-2xl bg-white border border-sbloom-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-sbloom-text-secondary font-semibold">
                {selectedLead.id}
              </span>
              <StatusBadge status={selectedLead.status} />
            </div>

            <div>
              <h4 className="font-fraunces text-lg font-bold text-sbloom-text-main">
                {selectedLead.clientName}
              </h4>
              <p className="text-xs text-sbloom-text-secondary flex items-center space-x-1.5 mt-0.5">
                <Building className="w-3.5 h-3.5 text-sbloom-violet" />
                <span>{selectedLead.companyName}</span>
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
              <Calendar className="w-3.5 h-3.5 text-sbloom-violet" />
              <span>Submitted on {selectedLead.submittedDate}</span>
            </div>
          </div>

          {/* Service & Commission Calculation */}
          <div className="p-4 rounded-2xl bg-white border border-sbloom-border space-y-3">
            <h5 className="font-bold text-sbloom-text-secondary uppercase text-[10px] tracking-wider">
              Commission Breakdown
            </h5>
            <div className="flex items-center justify-between pb-2 border-b border-sbloom-border/60">
              <span className="text-sbloom-text-secondary">Selected Service</span>
              <span className="font-semibold">{selectedLead.serviceName}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-sbloom-border/60">
              <span className="text-sbloom-text-secondary">Estimated Deal Value</span>
              <span className="font-semibold">{selectedLead.estimatedValue}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-sbloom-violet">Estimated Commission</span>
              <span className="font-bold font-fraunces text-base text-sbloom-text-main">
                {selectedLead.commissionEst}
              </span>
            </div>
          </div>

          {/* Referral Notes */}
          <div className="p-4 rounded-2xl bg-sbloom-canvas border border-sbloom-border space-y-1.5">
            <h5 className="font-bold text-sbloom-text-secondary uppercase text-[10px] tracking-wider">
              Affiliate Submission Notes
            </h5>
            <p className="text-xs text-sbloom-text-secondary leading-relaxed">
              {selectedLead.notes}
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
