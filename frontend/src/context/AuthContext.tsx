import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  role: 'affiliate' | 'admin';
  referralCode: string;
  phone: string;
  category: string;
  joinedDate: string;
  payoutUpi?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, role?: 'affiliate' | 'admin') => void;
  signup: (details: { name: string; email: string; phone: string; category: string }) => void;
  logout: () => void;
  toggleRole: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const DEFAULT_DEMO_USER: UserProfile = {
  name: 'Harshitha Rao',
  email: 'harshitha.partner@sbloom.demo',
  role: 'affiliate',
  referralCode: 'SBLOOM-HARSHI-78',
  phone: '+91 98765 43210',
  category: 'Tech & Digital Creators',
  joinedDate: 'Oct 2026',
  payoutUpi: 'harshitha@oksbi',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_DEMO_USER);

  const login = (email: string, role: 'affiliate' | 'admin' = 'affiliate') => {
    setUser({
      name: role === 'admin' ? 'Admin Controller' : 'Harshitha Rao',
      email,
      role,
      referralCode: 'SBLOOM-HARSHI-78',
      phone: '+91 98765 43210',
      category: 'Tech & Digital Creators',
      joinedDate: 'Oct 2026',
      payoutUpi: 'harshitha@oksbi',
    });
  };

  const signup = (details: { name: string; email: string; phone: string; category: string }) => {
    // Business rule: Immediate active account, NO waiting screen!
    const newCode = `SBLOOM-${details.name.substring(0, 5).toUpperCase().replace(/\s+/g, '')}-${Math.floor(10 + Math.random() * 90)}`;
    setUser({
      name: details.name,
      email: details.email,
      role: 'affiliate',
      referralCode: newCode,
      phone: details.phone,
      category: details.category,
      joinedDate: 'Today',
      payoutUpi: '',
    });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleRole = () => {
    setUser((prev) => {
      if (!prev) return DEFAULT_DEMO_USER;
      return {
        ...prev,
        role: prev.role === 'affiliate' ? 'admin' : 'affiliate',
        name: prev.role === 'affiliate' ? 'Admin Controller' : 'Harshitha Rao',
      };
    });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, toggleRole, updateProfile }}>
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
