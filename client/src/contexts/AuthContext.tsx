/// <reference types="vite/client" />
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'CLIENT' | 'ADMIN' | 'OWNER' | 'BARBER';
  phone?: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: RegisterData) => Promise<void>;
  signUpEstablishment: (data: RegisterEstablishmentData) => Promise<void>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'CLIENT' | 'ADMIN' | 'OWNER' | 'BARBER';
  phone?: string;
}

interface RegisterEstablishmentData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  establishmentName: string;
  cnpj: string;
  address: string;
  establishmentPhone: string;
  establishmentEmail: string;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there's a stored token
    const token = localStorage.getItem('@AgendaSis:token');
    const storedUser = localStorage.getItem('@AgendaSis:user');

    if (token && storedUser) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const handleError = (error: any) => {
    const message = error?.response?.data?.message || 'An error occurred';
    toast.error(message);
    throw error;
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      const { token, user: userData } = response.data;

      localStorage.setItem('@AgendaSis:token', token);
      localStorage.setItem('@AgendaSis:user', JSON.stringify(userData));

      api.defaults.headers.authorization = `Bearer ${token}`;
      setUser(userData);
    } catch (error) {
      handleError(error);
    }
  };

  const signUp = async (data: RegisterData) => {
    try {
      const response = await api.post('/auth/register', data);

      const { token, user: userData } = response.data;

      localStorage.setItem('@AgendaSis:token', token);
      localStorage.setItem('@AgendaSis:user', JSON.stringify(userData));

      api.defaults.headers.authorization = `Bearer ${token}`;
      setUser(userData);
    } catch (error) {
      handleError(error);
    }
  };

  const signUpEstablishment = async (data: RegisterEstablishmentData) => {
    try {
      const response = await api.post('/auth/register/establishment', data);

      const { token, user: userData, establishment } = response.data;

      localStorage.setItem('@AgendaSis:token', token);
      localStorage.setItem('@AgendaSis:user', JSON.stringify(userData));
      localStorage.setItem('@AgendaSis:establishment', JSON.stringify(establishment));

      api.defaults.headers.authorization = `Bearer ${token}`;
      setUser(userData);
    } catch (error) {
      handleError(error);
    }
  };

  const signOut = () => {
    localStorage.removeItem('@AgendaSis:token');
    localStorage.removeItem('@AgendaSis:user');
    localStorage.removeItem('@AgendaSis:establishment');
    setUser(null);
    api.defaults.headers.authorization = '';
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loading,
      signIn,
      signUp,
      signUpEstablishment,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 