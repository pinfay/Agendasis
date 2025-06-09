import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import AdminDashboard from './pages/AdminDashboard';
import HamburgerMenu from './components/HamburgerMenu';

// Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import OwnerDashboard from './pages/dashboard/owner/Dashboard';
import BarberDashboard from './pages/dashboard/barber/Dashboard';
import ClientDashboard from './pages/dashboard/client/Dashboard';
import Appointments from './pages/dashboard/Appointments';
import Services from './pages/dashboard/Services';
import Reviews from './pages/dashboard/Reviews';
import Profile from './pages/dashboard/Profile';
import AppointmentForm from './pages/AppointmentForm';
import OnboardingTutorial from './components/OnboardingTutorial';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gray-900 text-white">
          {/* Hamburger Menu - only show on protected routes */}
          <Routes>
            <Route path="/login" element={null} />
            <Route path="/register" element={null} />
            <Route
              path="*"
              element={
                <div className="fixed top-4 right-4 z-50">
                  <HamburgerMenu />
                </div>
              }
            />
          </Routes>

          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
              path="/owner/dashboard"
              element={
                <ProtectedRoute allowedRoles={['owner']}>
                  <OwnerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/barber/dashboard"
              element={
                <ProtectedRoute allowedRoles={['barber']}>
                  <BarberDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client/dashboard"
              element={
                <ProtectedRoute allowedRoles={['client']}>
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <Services />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reviews"
              element={
                <ProtectedRoute>
                  <Reviews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              {/* Add other admin routes here */}
            </Route>
            <Route path="/agendar" element={<AppointmentForm />} />
            <Route path="/tutorial" element={<OnboardingTutorial />} />

            {/* Client routes - to be implemented */}
            <Route
              path="/cliente"
              element={
                <ProtectedRoute allowedRoles={['client']}>
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App; 