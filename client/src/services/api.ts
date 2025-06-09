import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Add token to requests
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const auth = {
  register: async (data: { name: string; email: string; password: string; role?: string }) =>
    api.post('/auth/register', data),
  
  login: async (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  
  me: async () => api.get('/auth/me'),
};

// Dashboard services
export const dashboard = {
  getStatistics: async () => api.get('/statistics/dashboard'),
  getOwnerStatistics: async () => api.get('/statistics/owner'),
  getTodayAppointments: async () => api.get('/appointments/today'),
  getMonthlyRevenue: async () => api.get('/statistics/revenue/monthly'),
  getTotalCustomers: async () => api.get('/statistics/customers/total'),
  getRecentAppointments: async () => api.get('/appointments/recent'),
  getPopularServices: async () => api.get('/services/popular'),
};

export default api; 