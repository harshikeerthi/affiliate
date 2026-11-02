import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, CheckCircle2, AlertTriangle, ArrowRight, User, Mail, Phone, Lock, Info } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const SignupPage: React.FC = () => {
  const { registerDemo } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('Tech & Digital Creators');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Validation & UI State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredReferralCode, setRegisteredReferralCode] = useState<string | null>(null);

  const categoryOptions = [
    { value: 'Tech & Digital Creators', label: 'Tech & Digital Creators' },
    { value: 'Agency Founders & Consultancies', label: 'Agency Founders & Consultancies' },
    { value: 'Influencers & Content Publishers', label: 'Influencers & Content Publishers' },
    { value: 'Business Development Freelancers', label: 'Business Development Freelancers' },
    { value: 'Regional Communities (South India)', label: 'Regional Communities (South India)' },
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Please provide your full legal or brand name.';
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required for payout communications.';
    }
    if (!password) {
      newErrors.password = 'Password must be at least 6 characters.';
    } else if (password.length < 6) {
      newErrors.password = 'Password is too short (minimum 6 characters).';
    }
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the partner terms to activate your direct account.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Prevent duplicate form submission if already loading
    if (isLoading) return;

    if (!validate()) return;

    setIsLoading(true);

    try {
      // Connects to FastAPI endpoint: POST /api/v1/affiliates/register-demo
      const profile = await registerDemo({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        category,
        consent: agreedToTerms,
      });

      // Display success only after the backend confirms
      setRegisteredReferralCode(profile.referral_code);

      // Instant transition directly to dashboard without approval waiting screen
      setTimeout(() => {
        navigate('/app');
      }, 1200);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please check backend connection.';
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sbloom-canvas flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-sbloom-lime">
      
      {/* Top Language Toggle */}
      <div className="absolute top-6 right-6 flex items-center space-x-2">
        <div className="flex items-center p-1 rounded-xl bg-sbloom-surface border border-sbloom-border text-xs">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              language === 'en' ? 'bg-white text-sbloom-text-main shadow-2xs' : 'text-sbloom-text-secondary'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('te')}
            className={`px-2.5 py-1 rounded-lg font-bold font-telugu transition-all ${
              language === 'te' ? 'bg-sbloom-violet text-white shadow-2xs' : 'text-sbloom-text-secondary'
            }`}
          >
            తెలుగు
          </button>
        </div>
      </div>

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link to="/" className="inline-flex items-center space-x-2">
          <div className="w-10 h-10 rounded-2xl bg-sbloom-admin flex items-center justify-center font-fraunces font-bold text-lg text-sbloom-lime shadow-md">
            sB
          </div>
          <span className="font-fraunces text-2xl font-bold text-sbloom-text-main">
            sBLOOM
          </span>
        </Link>
        <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-sbloom-text-main">
          {t('joinDirectlyTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-sbloom-text-secondary max-w-sm mx-auto">
          {t('joinDirectlySubtitle')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sbloom rounded-3xl border border-sbloom-border space-y-6">
          
          {/* Direct Approval Banner */}
          <div className="p-3.5 rounded-2xl bg-sbloom-surface border border-sbloom-border flex items-start space-x-3 text-xs text-sbloom-text-main">
            <Zap className="w-4 h-4 text-sbloom-violet flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Direct Account Activation: </span>
              <span className="text-sbloom-text-secondary">
                No manual approval queues. Connected directly to FastAPI demo registration.
              </span>
            </div>
          </div>

          {/* Demo limitations disclaimer */}
          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-[11px] flex items-start space-x-2">
            <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Demo Environment:</strong> Registration is stored in temporary in-memory storage. Passwords are salted & hashed (PBKDF2). Database integration is deferred to Phase 2.
            </span>
          </div>

          {/* Server Error Alert */}
          {serverError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start space-x-2 text-xs">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Registration Failed: </span>
                <span>{serverError}</span>
              </div>
            </div>
          )}

          {/* Success Alert */}
          {registeredReferralCode && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center space-x-2 text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="font-semibold block">
                  Account created on FastAPI backend! Assigned Referral Code: <strong>{registeredReferralCode}</strong>
                </span>
                <span className="text-[11px] text-emerald-700">Redirecting directly to your active dashboard...</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            
            <Input
              label="Full Name / Brand Name"
              placeholder="e.g. Harshitha Rao"
              value={name}
              onChange={(e) => setName(e.target.value)}
              errorMessage={errors.name}
              required
              disabled={isLoading}
              leftIcon={<User className="w-4 h-4" />}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="harshitha@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errorMessage={errors.email}
              required
              disabled={isLoading}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Phone / WhatsApp Number"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              errorMessage={errors.phone}
              required
              disabled={isLoading}
              leftIcon={<Phone className="w-4 h-4" />}
            />

            <Select
              label="Creator / Promotion Category"
              options={categoryOptions}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isLoading}
              required
            />

            <Input
              label="Set Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errorMessage={errors.password}
              required
              disabled={isLoading}
              helperText="Minimum 6 characters. Hashed with salt before storage."
              leftIcon={<Lock className="w-4 h-4" />}
            />

            {/* Terms checkbox */}
            <div className="pt-1">
              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  disabled={isLoading}
                  className="mt-0.5 rounded text-sbloom-violet focus:ring-sbloom-violet border-sbloom-border"
                />
                <span className="text-xs text-sbloom-text-secondary leading-tight">
                  I agree to the <span className="font-semibold text-sbloom-text-main">sBLOOM Partner Terms</span> and acknowledge that commission payments are settled monthly upon deal clearance.
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-600 mt-1 font-medium">{errors.terms}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-4"
              isLoading={isLoading}
              disabled={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isLoading ? 'Creating Partner Account...' : 'Activate Partner Account & Enter'}
            </Button>

          </form>

          <div className="pt-4 border-t border-sbloom-border/70 text-center text-xs text-sbloom-text-secondary">
            <span>Already an affiliate partner? </span>
            <Link to="/app/login" className="font-bold text-sbloom-violet hover:underline">
              Log in to your account
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};
