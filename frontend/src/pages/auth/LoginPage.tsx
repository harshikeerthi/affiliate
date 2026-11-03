import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const LoginPage: React.FC = () => {
  const { user, login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate('/app', { replace: true });
    }
  }, [user, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid email format.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      login(email, 'affiliate');
      setIsLoading(false);
      const destination = (location.state as { from?: string })?.from || '/app';
      navigate(destination, { replace: true });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-sbloom-canvas flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-sbloom-lime">
      
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
          Partner Portal Login
        </h2>
        <p className="text-xs sm:text-sm text-sbloom-text-secondary">
          Access your referral analytics, leads tracking, and payout invoices.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sbloom rounded-3xl border border-sbloom-border space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Partner Email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errorMessage={errors.email}
              required
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errorMessage={errors.password}
              required
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Portal
            </Button>
          </form>

          <div className="pt-4 border-t border-sbloom-border/70 text-center text-xs text-sbloom-text-secondary space-y-2">
            <div>
              <span>New affiliate partner? </span>
              <Link to="/app/signup" className="font-bold text-sbloom-violet hover:underline">
                Join directly with no waiting screen
              </Link>
            </div>
            <div>
              <Link to="/" className="text-[11px] text-sbloom-text-secondary hover:underline">
                Back to Welcome Page
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
