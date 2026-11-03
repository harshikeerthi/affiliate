import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { apiClient } from '../services/api';
import type { AffiliateProfile, AffiliateRegisterRequest, AffiliateUpdateRequest } from '../types/api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'affiliate' | 'admin';
  referralCode: string;
  phone: string;
  category: string;
  joinedDate: string;
  payoutUpi?: string;
  notificationWhatsapp: boolean;
  notificationEmail: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  backendConnected: boolean;
  backendLatency: number;
  checkConnection: () => Promise<void>;
  login: (email: string, role?: 'affiliate' | 'admin') => Promise<void>;
  registerDemo: (details: AffiliateRegisterRequest) => Promise<AffiliateProfile>;
  logout: () => void;
  toggleRole: () => void;
  updateProfile: (updates: AffiliateUpdateRequest) => Promise<AffiliateProfile>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('sbloom_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fall back to null
      }
    }
    return null;
  });

  const [backendConnected, setBackendConnected] = useState<boolean>(false);
  const [backendLatency, setBackendLatency] = useState<number>(0);

  const checkConnection = useCallback(async () => {
    const result = await apiClient.checkHealth();
    setBackendConnected(result.status === 'connected');
    setBackendLatency(result.latencyMs);
  }, []);

  useEffect(() => {
    checkConnection();
    // Poll health every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, [checkConnection]);

  // Load backend profile on mount if connected and user is logged in
  useEffect(() => {
    const syncProfile = async () => {
      try {
        const profile = await apiClient.getAffiliateProfile();
        setUser((prev) => {
          if (!prev) return null;
          return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            role: prev.role || 'affiliate',
            referralCode: profile.referral_code,
            phone: profile.phone,
            category: profile.category,
            joinedDate: profile.joined_at ? new Date(profile.joined_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Oct 2026',
            payoutUpi: profile.payout_upi || '',
            notificationWhatsapp: profile.notification_whatsapp,
            notificationEmail: profile.notification_email,
          };
        });
      } catch {
        // In-memory fallback if backend is offline
      }
    };

    if (user) {
      syncProfile();
    }
  }, [backendConnected]);

  const login = async (email: string, role: 'affiliate' | 'admin' = 'affiliate') => {
    try {
      const profile = await apiClient.getAffiliateProfile();
      const updatedUser: UserProfile = {
        id: profile.id,
        name: role === 'admin' ? 'Admin Controller' : profile.name,
        email,
        role,
        referralCode: profile.referral_code,
        phone: profile.phone,
        category: profile.category,
        joinedDate: 'Oct 2026',
        payoutUpi: profile.payout_upi || '',
        notificationWhatsapp: profile.notification_whatsapp,
        notificationEmail: profile.notification_email,
      };
      setUser(updatedUser);
      localStorage.setItem('sbloom_active_user', JSON.stringify(updatedUser));
    } catch {
      // Fallback if backend server is offline
      const username = email.split('@')[0] || 'Partner';
      const cleanName = username.charAt(0).toUpperCase() + username.slice(1);
      const referralPrefix = username.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 6) || 'PARTNER';
      const randomSuffix = Math.floor(10 + Math.random() * 90);

      const fallbackUser: UserProfile = {
        id: `aff-${Date.now()}`,
        name: role === 'admin' ? 'Admin Controller' : cleanName,
        email,
        role,
        referralCode: `SBLOOM-${referralPrefix}-${randomSuffix}`,
        phone: '',
        category: 'Tech & Digital Creators',
        joinedDate: 'Recent',
        payoutUpi: '',
        notificationWhatsapp: true,
        notificationEmail: true,
      };
      setUser(fallbackUser);
      localStorage.setItem('sbloom_active_user', JSON.stringify(fallbackUser));
    }
  };

  const registerDemo = async (details: AffiliateRegisterRequest): Promise<AffiliateProfile> => {
    try {
      // Calls FastAPI backend endpoint POST /api/v1/affiliates/register-demo
      const profile = await apiClient.registerDemoAffiliate(details);

      const newUser: UserProfile = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: 'affiliate',
        referralCode: profile.referral_code,
        phone: profile.phone,
        category: profile.category,
        joinedDate: 'Today',
        payoutUpi: profile.payout_upi || '',
        notificationWhatsapp: profile.notification_whatsapp,
        notificationEmail: profile.notification_email,
      };

      setUser(newUser);
      localStorage.setItem('sbloom_active_user', JSON.stringify(newUser));
      return profile;
    } catch {
      // Graceful offline fallback if backend server (FastAPI on port 8000) is offline
      const cleanName = details.name.replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 6) || 'PARTNER';
      const randomSuffix = Math.floor(10 + Math.random() * 90);
      const fallbackProfile: AffiliateProfile = {
        id: `aff-local-${Date.now()}`,
        name: details.name,
        email: details.email,
        phone: details.phone,
        referral_code: `SBLOOM-${cleanName}-${randomSuffix}`,
        category: details.category,
        payout_upi: details.payout_upi || '',
        joined_at: new Date().toISOString(),
        role: 'affiliate',
        notification_whatsapp: true,
        notification_email: true,
        disclaimer: 'Client-side fallback demo account (Backend offline).',
      };

      const newUser: UserProfile = {
        id: fallbackProfile.id,
        name: fallbackProfile.name,
        email: fallbackProfile.email,
        role: 'affiliate',
        referralCode: fallbackProfile.referral_code,
        phone: fallbackProfile.phone,
        category: fallbackProfile.category,
        joinedDate: 'Today',
        payoutUpi: fallbackProfile.payout_upi || '',
        notificationWhatsapp: fallbackProfile.notification_whatsapp,
        notificationEmail: fallbackProfile.notification_email,
      };

      setUser(newUser);
      localStorage.setItem('sbloom_active_user', JSON.stringify(newUser));
      return fallbackProfile;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sbloom_active_user');
  };

  const toggleRole = () => {
    setUser((prev) => {
      if (!prev) return null;
      const nextRole = prev.role === 'affiliate' ? 'admin' : 'affiliate';
      const updated: UserProfile = {
        ...prev,
        role: nextRole,
        name: nextRole === 'admin' ? 'Admin Controller' : (prev.name === 'Admin Controller' ? 'Partner' : prev.name),
      };
      localStorage.setItem('sbloom_active_user', JSON.stringify(updated));
      return updated;
    });
  };

  const updateProfile = async (updates: AffiliateUpdateRequest): Promise<AffiliateProfile> => {
    // Calls FastAPI backend endpoint PATCH /api/v1/affiliates/me
    const profile = await apiClient.updateAffiliateProfile(updates);

    setUser((prev) => {
      if (!prev) return null;
      const updated: UserProfile = {
        ...prev,
        name: profile.name,
        phone: profile.phone,
        category: profile.category,
        payoutUpi: profile.payout_upi || '',
        notificationWhatsapp: profile.notification_whatsapp,
        notificationEmail: profile.notification_email,
      };
      localStorage.setItem('sbloom_active_user', JSON.stringify(updated));
      return updated;
    });

    return profile;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        backendConnected,
        backendLatency,
        checkConnection,
        login,
        registerDemo,
        logout,
        toggleRole,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
