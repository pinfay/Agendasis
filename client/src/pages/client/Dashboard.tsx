import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  CalendarIcon,
  ClockIcon,
  ScissorsIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface Barber {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specialties: string[];
}

interface Appointment {
  id: string;
  date: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  service: Service;
  barber: Barber;
}

export default function ClientDashboard() {
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setUpcomingAppointments(response.data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar agendamentos');
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Appointment['status']) => {
    switch (status) {
      case 'CONFIRMED':
        return 'Confirmado';
      case 'PENDING':
        return 'Pendente';
      case 'COMPLETED':
        return 'Concluído';
      case 'CANCELLED':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Meu Dashboard</h1>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/dashboard/schedule"
            className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
          >
            <CalendarIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Novo Agendamento
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/dashboard/schedule"
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-primary/60"
        >
          <div className="flex-shrink-0">
            <CalendarIcon className="h-10 w-10 text-primary" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">Agendar Serviço</p>
            <p className="truncate text-sm text-gray-500">Escolha data e horário</p>
          </div>
        </Link>

        <Link
          to="/dashboard/history"
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-primary/60"
        >
          <div className="flex-shrink-0">
            <ClockIcon className="h-10 w-10 text-primary" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">Histórico</p>
            <p className="truncate text-sm text-gray-500">Veja seus agendamentos anteriores</p>
          </div>
        </Link>

        <Link
          to="/dashboard/profile"
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-primary/60"
        >
          <div className="flex-shrink-0">
            <ScissorsIcon className="h-10 w-10 text-primary" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">Preferências</p>
            <p className="truncate text-sm text-gray-500">Gerencie suas preferências</p>
          </div>
        </Link>
      </div>

      {/* Upcoming Appointments */}
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Próximos Agendamentos</h2>
            <Link
              to="/dashboard/history"
              className="text-sm font-medium text-primary hover:text-primary/90"
            >
              <span className="flex items-center">
                Ver todos
                <ArrowRightIcon className="ml-1 h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-200">
          {loading ? (
            <div className="px-4 py-5 sm:px-6 text-center">
              <div className="animate-pulse">Carregando agendamentos...</div>
            </div>
          ) : error ? (
            <div className="px-4 py-5 sm:px-6 text-center text-red-600">
              {error}
            </div>
          ) : (
            <ul role="list" className="divide-y divide-gray-200">
              {upcomingAppointments.length === 0 ? (
                <li className="px-4 py-5 sm:px-6">
                  <div className="text-center text-gray-500">
                    Nenhum agendamento próximo
                  </div>
                </li>
              ) : (
                upcomingAppointments.map((appointment) => (
                  <li key={appointment.id} className="px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-1 items-center">
                        <div className="flex-shrink-0">
                          <CalendarIcon className="h-8 w-8 text-primary" aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{appointment.service.name}</p>
                          <div className="mt-1 flex text-sm text-gray-500">
                            <p>{formatDate(appointment.date)}</p>
                            <span className="mx-2">•</span>
                            <p>{formatTime(appointment.date)}</p>
                            <span className="mx-2">•</span>
                            <p>{`${appointment.barber.firstName} ${appointment.barber.lastName}`}</p>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 