import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ConfirmationDialog } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { apiClient } from '../../services/api';
import { 
  UserCircle, 
  CreditCard, 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Languages, 
  Info 
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, backendConnected } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [category, setCategory] = useState(user?.category || 'Tech & Digital Creators');
  const [payoutUpi, setPayoutUpi] = useState(user?.payoutUpi || '');
  const [bankAccount, setBankAccount] = useState('');

  // Notifications
  const [emailAlerts, setEmailAlerts] = useState(user?.notificationEmail ?? true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(user?.notificationWhatsapp ?? true);

  // Modal & Save State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Sync state if user context updates from backend
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setCategory(user.category);
      if (user.payoutUpi) setPayoutUpi(user.payoutUpi);
      setEmailAlerts(user.notificationEmail);
      setWhatsappAlerts(user.notificationWhatsapp);
    }
  }, [user]);

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setShowConfirmModal(true);
  };

  const handleConfirmSave = async () => {
    if (isSaving) return; // prevent duplicate clicks
    setIsSaving(true);
    setServerError(null);

    try {
      // Connects to FastAPI endpoint: PATCH /api/v1/affiliates/me
      await updateProfile({
        name: name.trim(),
        phone: phone.trim(),
        category,
        payout_upi: payoutUpi.trim(),
        notification_whatsapp: whatsappAlerts,
        notification_email: emailAlerts,
      });

      setShowConfirmModal(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update profile settings';
      setServerError(msg);
      setShowConfirmModal(false);
    } finally {
      setIsSaving(false);
    }
  };

  const categoryOptions = [
    { value: 'Tech & Digital Creators', label: 'Tech & Digital Creators' },
    { value: 'Agency Founders & Consultancies', label: 'Agency Founders & Consultancies' },
    { value: 'Influencers & Content Publishers', label: 'Influencers & Content Publishers' },
    { value: 'Business Development Freelancers', label: 'Business Development Freelancers' },
    { value: 'Regional Communities (South India)', label: 'Regional Communities (South India)' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-sbloom-text-main">
          {t('profile')} & Partner Settings
        </h2>
        <p className="text-xs sm:text-sm text-sbloom-text-secondary mt-1">
          Manage your payout account, regional preferences, and notification channels.
        </p>
      </div>

      {/* Demo storage reminder notice */}
      <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Temporary In-Memory Profile: </span>
          <span>
            Connected to FastAPI endpoint <code className="font-mono font-semibold">/api/v1/affiliates/me</code>. Changes are stored in memory for this session and reset on server restart. No real bank or UPI transactions are executed.
          </span>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center space-x-2 text-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">
            Partner profile and payout preferences confirmed & updated by backend API!
          </span>
        </div>
      )}

      {serverError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start space-x-2 text-xs">
          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Failed to Update Profile: </span>
            <span>{serverError}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSaveClick} className="space-y-6">
        
        {/* Personal & Brand Information */}
        <Card variant="canvas" padding="lg">
          <div className="flex items-center space-x-3 mb-5 pb-3 border-b border-sbloom-border/60">
            <div className="w-9 h-9 rounded-xl bg-sbloom-violet/15 text-sbloom-violet flex items-center justify-center">
              <UserCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-fraunces text-base font-bold text-sbloom-text-main">
                Creator Profile Information
              </h3>
              <p className="text-xs text-sbloom-text-secondary">
                Details verified and synced with FastAPI backend.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name / Brand Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSaving}
              required
            />

            <Input
              label="Primary Email Address"
              value={email}
              disabled
              helperText="Permanent identifier for demo authentication."
            />

            <Input
              label="Phone / WhatsApp Contact"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSaving}
              required
            />

            <Select
              label="Promotion Category"
              options={categoryOptions}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isSaving}
              required
            />

            <div className="sm:col-span-2">
              <Input
                label="Assigned Referral Code (from Backend)"
                value={user?.referralCode || 'SBLOOM-HARSHI-78'}
                disabled
                helperText="Generated by backend API for referral attribution."
              />
            </div>
          </div>
        </Card>

        {/* Payout & Banking Details */}
        <Card variant="canvas" padding="lg">
          <div className="flex items-center space-x-3 mb-5 pb-3 border-b border-sbloom-border/60">
            <div className="w-9 h-9 rounded-xl bg-sbloom-lime/30 text-sbloom-text-main flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-fraunces text-base font-bold text-sbloom-text-main">
                Payout & Banking Settlement (Simulated Demo)
              </h3>
              <p className="text-xs text-sbloom-text-secondary">
                Demo UPI configuration for simulated monthly disbursements.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Primary UPI ID (Instant Payouts)"
              placeholder="e.g. name@okhdfcbank"
              value={payoutUpi}
              onChange={(e) => setPayoutUpi(e.target.value)}
              disabled={isSaving}
              helperText="Simulated demo UPI address. No real bank accounts are charged."
            />

            <Input
              label="Direct Bank Transfer Account (NEFT / RTGS)"
              placeholder="Bank Account Number"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              disabled={isSaving}
              helperText="Simulated representation for Phase 1 demo."
            />
          </div>
        </Card>

        {/* Regional & Language Preferences */}
        <Card variant="canvas" padding="lg">
          <div className="flex items-center space-x-3 mb-5 pb-3 border-b border-sbloom-border/60">
            <div className="w-9 h-9 rounded-xl bg-sbloom-magenta/15 text-sbloom-magenta flex items-center justify-center">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-fraunces text-base font-bold text-sbloom-text-main">
                Regional Language & Typography
              </h3>
              <p className="text-xs text-sbloom-text-secondary">
                Configure your preferred portal interface language.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Interface Display Language"
              options={[
                { value: 'en', label: 'English (Default)' },
                { value: 'te', label: 'తెలుగు (Telugu - Draft Translation)' },
              ]}
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'te')}
            />
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card variant="canvas" padding="lg">
          <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-sbloom-border/60">
            <div className="w-9 h-9 rounded-xl bg-sbloom-surface flex items-center justify-center text-sbloom-text-secondary">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-fraunces text-base font-bold text-sbloom-text-main">
                Notification Channels
              </h3>
              <p className="text-xs text-sbloom-text-secondary">
                Receive instant alerts when a lead progresses through the sales funnel.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-sbloom-surface cursor-pointer">
              <div>
                <span className="font-semibold text-sbloom-text-main block">WhatsApp Deal Alerts</span>
                <span className="text-sbloom-text-secondary">Receive WhatsApp notifications when a client converts.</span>
              </div>
              <input
                type="checkbox"
                checked={whatsappAlerts}
                onChange={(e) => setWhatsappAlerts(e.target.checked)}
                disabled={isSaving}
                className="rounded text-sbloom-violet focus:ring-sbloom-violet"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-sbloom-surface cursor-pointer">
              <div>
                <span className="font-semibold text-sbloom-text-main block">Monthly Invoice Summary Email</span>
                <span className="text-sbloom-text-secondary">Receive consolidated PDF invoices on settlement day.</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                disabled={isSaving}
                className="rounded text-sbloom-violet focus:ring-sbloom-violet"
              />
            </label>
          </div>
        </Card>

        {/* Action Button */}
        <div className="flex items-center justify-end space-x-3">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSaving}
            isLoading={isSaving}
          >
            {isSaving ? 'Saving to Backend...' : 'Save Profile Settings'}
          </Button>
        </div>

      </form>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSave}
        title="Confirm Profile Updates"
        description="Are you sure you want to update your profile on the FastAPI backend? New settings will be confirmed and saved in active demo memory."
        confirmLabel={isSaving ? 'Updating...' : 'Save Changes'}
        isLoading={isSaving}
      />

    </div>
  );
};
