import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import jwt_decode from 'jwt-decode';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

interface JwtPayload {
  userId: string;
  role: string;
  exp: number;
}

const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decoded = jwt_decode<JwtPayload>(token);

    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check role if specified
    if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
      // Redirect to appropriate dashboard based on role
      return <Navigate to={decoded.role === 'admin' ? '/admin' : '/cliente'} replace />;
    }

    return <>{children}</>;
  } catch (error) {
    console.error('Error decoding token:', error);
    localStorage.removeItem('token');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute; 