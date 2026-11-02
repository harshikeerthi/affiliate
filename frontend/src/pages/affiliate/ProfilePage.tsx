import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ConfirmationDialog } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  UserCircle, 
  CreditCard, 
  Bell, 
  CheckCircle2, 
  ShieldCheck, 
  Languages,
  Sparkles 
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [name, setName] = useState(user?.name || 'Harshitha Rao');
  const [email] = useState(user?.email || 'harshitha.partner@sbloom.demo');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [category, setCategory] = useState(user?.category || 'Tech & Digital Creators');
  const [payoutUpi, setPayoutUpi] = useState(user?.payoutUpi || 'harshitha@oksbi');
  const [bankAccount, setBankAccount] = useState('HDFC Bank •••• 4092');

  // Notifications
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);

  // Modal & Save State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateProfile({
        name,
        phone,
        category,
        payoutUpi,
      });
      setIsSaving(false);
      setShowConfirmModal(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 500);
  };

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

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center space-x-2 text-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">
            Partner profile and payout preferences updated successfully!
          </span>
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
                Basic details attached to your partner code.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name / Brand Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Primary Email Address"
              value={email}
              disabled
              helperText="Managed by account authentication."
            />

            <Input
              label="Phone / WhatsApp Contact"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <Input
              label="Assigned Referral Code"
              value={user?.referralCode || 'SBLOOM-HARSHI-78'}
              disabled
              helperText="Permanent identifier for attribution tracking."
            />
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
                Payout & Banking Settlement
              </h3>
              <p className="text-xs text-sbloom-text-secondary">
                Where monthly commission earnings will be credited automatically.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Primary UPI ID (Instant Payouts)"
              placeholder="e.g. name@okhdfcbank"
              value={payoutUpi}
              onChange={(e) => setPayoutUpi(e.target.value)}
              helperText="Fastest settlement route for commissions under ₹1,00,000."
              required
            />

            <Input
              label="Direct Bank Transfer Account (NEFT / RTGS)"
              placeholder="Bank Account Number"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              helperText="Used for high-value enterprise payouts."
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
                className="rounded text-sbloom-violet focus:ring-sbloom-violet"
              />
            </label>
          </div>
        </Card>

        {/* Action Button */}
        <div className="flex items-center justify-end space-x-3">
          <Button type="submit" variant="primary" size="md">
            Save Profile Settings
          </Button>
        </div>

      </form>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSave}
        title="Confirm Profile Updates"
        description="Are you sure you want to save these profile and payout account changes? Future commission disbursements will use the updated details."
        confirmLabel="Save Changes"
        isLoading={isSaving}
      />

    </div>
  );
};
