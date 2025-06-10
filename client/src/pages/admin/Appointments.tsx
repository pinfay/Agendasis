import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  UserIcon,
  ScissorsIcon,
} from '@heroicons/react/24/outline';

interface Appointment {
  id: number;
  client: {
    name: string;
    phone: string;
  };
  service: string;
  date: string;
  time: string;
  barber: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data - substituir por dados reais da API
  const [appointments] = useState<Appointment[]>([
    {
      id: 1,
      client: {
        name: 'João Silva',
        phone: '(11) 98765-4321',
      },
      service: 'Corte + Barba',
      date: '2024-03-24',
      time: '14:30',
      barber: 'Ricardo Silva',
      status: 'confirmed',
    },
    {
      id: 2,
      client: {
        name: 'Pedro Santos',
        phone: '(11) 98765-4322',
      },
      service: 'Corte',
      date: '2024-03-24',
      time: '15:00',
      barber: 'André Santos',
      status: 'pending',
    },
    {
      id: 3,
      client: {
        name: 'Carlos Oliveira',
        phone: '(11) 98765-4323',
      },
      service: 'Barba',
      date: '2024-03-24',
      time: '15:30',
      barber: 'Ricardo Silva',
      status: 'completed',
      notes: 'Cliente prefere navalha',
    },
  ]);

  const handlePreviousDay = () => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (filterStatus === 'all') return true;
    return appointment.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Gerenciamento de Agendamentos</h1>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => {}}
            className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
          >
            <CalendarIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Novo Agendamento
          </button>
        </div>
      </div>

      {/* Filtros e Navegação */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePreviousDay}
                className="inline-flex items-center rounded-full border border-gray-300 bg-white p-2 text-gray-400 shadow-sm hover:bg-gray-50"
              >
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="text-lg font-semibold text-gray-900">
                {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
              </div>
              <button
                onClick={handleNextDay}
                className="inline-flex items-center rounded-full border border-gray-300 bg-white p-2 text-gray-400 shadow-sm hover:bg-gray-50"
              >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 sm:mt-0">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              >
                <option value="all">Todos os Status</option>
                <option value="pending">Pendentes</option>
                <option value="confirmed">Confirmados</option>
                <option value="completed">Concluídos</option>
                <option value="cancelled">Cancelados</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Agendamentos */}
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <ul role="list" className="divide-y divide-gray-200">
          {filteredAppointments.length === 0 ? (
            <li className="px-4 py-5 sm:px-6">
              <div className="text-center text-gray-500">
                Nenhum agendamento encontrado
              </div>
            </li>
          ) : (
            filteredAppointments.map((appointment) => (
              <li key={appointment.id} className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-1 items-center space-x-4">
                    <div className="flex-shrink-0">
                      <UserIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {appointment.client.name}
                        </p>
                        <div className="ml-2 flex flex-shrink-0">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            {getStatusText(appointment.status)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                          {appointment.time}
                          <span className="mx-2">•</span>
                          <ScissorsIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                          {appointment.service}
                          <span className="mx-2">•</span>
                          {appointment.barber}
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span>{appointment.client.phone}</span>
                          {appointment.notes && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="italic">{appointment.notes}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex space-x-2">
                    <button
                      onClick={() => {}}
                      className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {}}
                      className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
} 