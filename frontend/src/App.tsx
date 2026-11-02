import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

// Layouts
import { AffiliateLayout } from './components/layout/AffiliateLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public & Auth Pages
import { LandingPage } from './pages/LandingPage';
import { SignupPage } from './pages/auth/SignupPage';
import { LoginPage } from './pages/auth/LoginPage';

// Affiliate Pages
import { DashboardPage } from './pages/affiliate/DashboardPage';
import { ProfilePage } from './pages/affiliate/ProfilePage';
import { ServicesPage } from './pages/affiliate/ServicesPage';
import { LearnPage } from './pages/affiliate/LearnPage';
import { LeadsPage } from './pages/affiliate/LeadsPage';
import { EarningsPage } from './pages/affiliate/EarningsPage';
import { InvoicesPage } from './pages/affiliate/InvoicesPage';
import { SupportPage } from './pages/affiliate/SupportPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminLeadsPage } from './pages/admin/AdminLeadsPage';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* 1. Portal Welcome / Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* 2 & 3. Authentication Routes */}
            <Route path="/app/signup" element={<SignupPage />} />
            <Route path="/app/login" element={<LoginPage />} />

            {/* 4 to 11. Affiliate Portal Protected Routes */}
            <Route path="/app" element={<AffiliateLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="learn" element={<LearnPage />} />
              <Route path="leads" element={<LeadsPage />} />
              <Route path="earnings" element={<EarningsPage />} />
              <Route path="invoices" element={<InvoicesPage />} />
              <Route path="support" element={<SupportPage />} />
            </Route>

            {/* 12 & 13. Admin Management Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="leads" element={<AdminLeadsPage />} />
            </Route>

            {/* Fallback Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
