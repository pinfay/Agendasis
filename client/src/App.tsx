import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/theme.css';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboardLayout from './layouts/AdminDashboardLayout';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterEstablishment from './pages/auth/RegisterEstablishment';

// Client Pages
import ClientDashboard from './pages/client/Dashboard';
import Schedule from './pages/client/Schedule';
import History from './pages/client/History';
import Profile from './pages/client/Profile';
import Notifications from './pages/client/Notifications';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import Appointments from './pages/admin/Appointments';
import Services from './pages/admin/Services';
import Staff from './pages/admin/Staff';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen transition-colors duration-300">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/register/establishment" element={<RegisterEstablishment />} />

              {/* Client Routes - Temporarily without protection */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<ClientDashboard />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="history" element={<History />} />
                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<Notifications />} />
              </Route>

              {/* Admin Routes - Temporarily without protection */}
              <Route path="/dashboard/admin" element={<AdminDashboardLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="services" element={<Services />} />
                <Route path="staff" element={<Staff />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; 