import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { dashboard } from '../../../services/api';
import { FaCalendar, FaMoneyBillWave, FaUsers } from 'react-icons/fa';

interface DashboardStats {
  todayAppointments: number;
  monthlyRevenue: number;
  totalCustomers: number;
}

export default function OwnerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    todayAppointments: 0,
    monthlyRevenue: 0,
    totalCustomers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          todayAppts,
          revenue,
          customers
        ] = await Promise.all([
          dashboard.getTodayAppointments(),
          dashboard.getMonthlyRevenue(),
          dashboard.getTotalCustomers()
        ]);

        setStats({
          todayAppointments: todayAppts.data.count,
          monthlyRevenue: revenue.data.total,
          totalCustomers: customers.data.count
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">Dashboard do Proprietário</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Agendamentos Hoje */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-purple-500/20 hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-400 text-sm font-semibold mb-2">Agendamentos Hoje</h2>
              <p className="text-4xl font-bold text-white">{stats.todayAppointments}</p>
            </div>
            <div className="bg-purple-500/20 p-4 rounded-lg">
              <FaCalendar className="text-2xl text-purple-500" />
            </div>
          </div>
        </div>

        {/* Faturamento do Mês */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-green-500/20 hover:border-green-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-400 text-sm font-semibold mb-2">Faturamento do Mês</h2>
              <p className="text-4xl font-bold text-white">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(stats.monthlyRevenue)}
              </p>
            </div>
            <div className="bg-green-500/20 p-4 rounded-lg">
              <FaMoneyBillWave className="text-2xl text-green-500" />
            </div>
          </div>
        </div>

        {/* Total de Clientes */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-500/20 hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-400 text-sm font-semibold mb-2">Total de Clientes</h2>
              <p className="text-4xl font-bold text-white">{stats.totalCustomers}</p>
            </div>
            <div className="bg-blue-500/20 p-4 rounded-lg">
              <FaUsers className="text-2xl text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 