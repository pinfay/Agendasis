import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon,
  ClockIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ArrowTrendingUpIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { dashboard } from '../services/api';
import { AxiosResponse } from 'axios';

const sidebarItems = [
  { name: 'Dashboard', icon: ChartBarIcon, href: '/dashboard' },
  { name: 'Agendamentos', icon: CalendarIcon, href: '/appointments' },
  { name: 'Clientes', icon: UserGroupIcon, href: '/clients' },
  { name: 'Horários', icon: ClockIcon, href: '/schedule' },
  { name: 'Faturamento', icon: CurrencyDollarIcon, href: '/revenue' },
  { name: 'Lista de Espera', icon: ListBulletIcon, href: '/waitlist' },
  { name: 'Configurações', icon: Cog6ToothIcon, href: '/settings' },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const recentTransactions = [
  {
    id: 1,
    client: 'João Silva',
    service: 'Corte + Barba',
    value: 75.00,
    status: 'completed',
    date: '2023-05-15',
  },
  {
    id: 2,
    client: 'Pedro Santos',
    service: 'Corte',
    value: 45.00,
    status: 'pending',
    date: '2023-05-15',
  },
  {
    id: 3,
    client: 'Carlos Oliveira',
    service: 'Barba',
    value: 35.00,
    status: 'completed',
    date: '2023-05-14',
  },
];

interface DashboardData {
  sales: {
    total: number;
    growth: number;
  };
  customers: {
    total: number;
    growth: number;
  };
  products: {
    total: number;
    growth: number;
  };
  revenue: {
    total: number;
    growth: number;
  };
  monthlyRevenue: Array<{
    month: string;
    earning: number;
    expense: number;
  }>;
  leads: {
    total: number;
    sources: Array<{
      name: string;
      value: number;
    }>;
    growth: number;
  };
  popularProducts: Array<{
    id: number;
    name: string;
    price: number;
    sales: number;
  }>;
}

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<DashboardData> = await dashboard.getStatistics();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 bg-gray-900 text-white"
      >
        <div className="p-4">
          <img src="/assets/images/logo-white.svg" alt="AgendaSIS" className="h-8 w-auto" />
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <item.icon className="h-6 w-6 mr-3" />
              {item.name}
            </a>
          ))}
        </nav>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
              >
                <option value="week">Esta semana</option>
                <option value="month">Este mês</option>
                <option value="year">Este ano</option>
              </select>
            </div>
          </div>

          {/* Welcome Card */}
          <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Congratulations John! 🎉</h2>
              <p className="text-gray-400 mt-1">Best seller of the month</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-purple-500">${data.revenue.total}</span>
                <button className="ml-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
                  View Sales
                </button>
              </div>
            </div>
            <img
              src="/assets/trophy.png"
              alt="Trophy"
              className="h-32 w-32 object-contain"
            />
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Sales</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{data.sales.total}</h3>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-full">
                  <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Customers</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{data.customers.total}</h3>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-full">
                  <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Products</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{data.products.total}</h3>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-full">
                  <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Revenue</p>
                  <h3 className="text-2xl font-bold text-white mt-1">${data.revenue.total}</h3>
                </div>
                <div className="p-3 bg-green-500/10 rounded-full">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Report */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Revenue Report</h3>
              <select className="bg-gray-700 text-white rounded-md px-3 py-1">
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="earning" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" fill="#EC4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Additional Charts Row */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-6">Profit</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="earning"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-6">Generated Leads</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.leads.sources}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.leads.sources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow"
          >
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Transações Recentes</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="pb-3 font-medium">Cliente</th>
                      <th className="pb-3 font-medium">Serviço</th>
                      <th className="pb-3 font-medium">Valor</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b last:border-b-0">
                        <td className="py-4">{transaction.client}</td>
                        <td className="py-4">{transaction.service}</td>
                        <td className="py-4">
                          R$ {transaction.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              transaction.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {transaction.status === 'completed' ? 'Concluído' : 'Pendente'}
                          </span>
                        </td>
                        <td className="py-4">
                          {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 