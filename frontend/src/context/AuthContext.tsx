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
  backendConnected: boolean;
  backendLatency: number;
  checkConnection: () => Promise<void>;
  login: (email: string, role?: 'affiliate' | 'admin') => Promise<void>;
  registerDemo: (details: AffiliateRegisterRequest) => Promise<AffiliateProfile>;
  logout: () => void;
  toggleRole: () => void;
  updateProfile: (updates: AffiliateUpdateRequest) => Promise<AffiliateProfile>;
}

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'aff-demo-01',
  name: 'Harshitha Rao',
  email: 'harshitha.partner@sbloom.demo',
  role: 'affiliate',
  referralCode: 'SBLOOM-HARSHI-78',
  phone: '+91 98765 43210',
  category: 'Tech & Digital Creators',
  joinedDate: 'Oct 2026',
  payoutUpi: 'harshitha@oksbi',
  notificationWhatsapp: true,
  notificationEmail: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('sbloom_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fall back to default
      }
    }
    return DEFAULT_DEMO_USER;
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

  // Load backend profile on mount if connected
  useEffect(() => {
    const syncProfile = async () => {
      try {
        const profile = await apiClient.getAffiliateProfile();
        setUser((prev) => ({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: prev?.role || 'affiliate',
          referralCode: profile.referral_code,
          phone: profile.phone,
          category: profile.category,
          joinedDate: profile.joined_at ? new Date(profile.joined_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Oct 2026',
          payoutUpi: profile.payout_upi || '',
          notificationWhatsapp: profile.notification_whatsapp,
          notificationEmail: profile.notification_email,
        }));
      } catch {
        // In-memory fallback if backend is offline
      }
    };

    syncProfile();
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
      // Fallback
      const fallbackUser: UserProfile = {
        ...DEFAULT_DEMO_USER,
        email,
        role,
        name: role === 'admin' ? 'Admin Controller' : 'Harshitha Rao',
      };
      setUser(fallbackUser);
      localStorage.setItem('sbloom_active_user', JSON.stringify(fallbackUser));
    }
  };

  const registerDemo = async (details: AffiliateRegisterRequest): Promise<AffiliateProfile> => {
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
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sbloom_active_user');
  };

  const toggleRole = () => {
    setUser((prev) => {
      if (!prev) return DEFAULT_DEMO_USER;
      const nextRole = prev.role === 'affiliate' ? 'admin' : 'affiliate';
      const updated: UserProfile = {
        ...prev,
        role: nextRole,
        name: nextRole === 'admin' ? 'Admin Controller' : (prev.name === 'Admin Controller' ? 'Harshitha Rao' : prev.name),
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
