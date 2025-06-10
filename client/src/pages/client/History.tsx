import { format, isToday, isYesterday, isTomorrow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

type AppointmentStatus = 'completed' | 'upcoming' | 'cancelled';

interface Appointment {
  id: number;
  service: string;
  date: Date;
  price: number;
  status: AppointmentStatus;
}

// Mock data - replace with API call
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    service: 'Corte de Cabelo',
    date: new Date(2024, 2, 15, 14, 30),
    price: 35,
    status: 'completed',
  },
  {
    id: 2,
    service: 'Barba',
    date: new Date(2024, 2, 20, 10, 0),
    price: 25,
    status: 'upcoming',
  },
  {
    id: 3,
    service: 'Corte + Barba',
    date: new Date(2024, 2, 10, 16, 30),
    price: 55,
    status: 'cancelled',
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircleIcon,
    text: 'Concluído',
    className: 'text-green-700 bg-green-50',
  },
  upcoming: {
    icon: ClockIcon,
    text: 'Agendado',
    className: 'text-blue-700 bg-blue-50',
  },
  cancelled: {
    icon: XCircleIcon,
    text: 'Cancelado',
    className: 'text-red-700 bg-red-50',
  },
} as const;

const formatAppointmentDate = (date: Date) => {
  if (isToday(date)) {
    return `Hoje às ${format(date, 'HH:mm')}`;
  }
  if (isYesterday(date)) {
    return `Ontem às ${format(date, 'HH:mm')}`;
  }
  if (isTomorrow(date)) {
    return `Amanhã às ${format(date, 'HH:mm')}`;
  }
  return format(date, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
};

export default function History() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Histórico de Agendamentos</h2>

          <div className="space-y-6">
            {MOCK_APPOINTMENTS.map((appointment) => {
              const StatusIcon = statusConfig[appointment.status].icon;
              return (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <StatusIcon
                        className={`h-6 w-6 ${
                          statusConfig[appointment.status].className
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {appointment.service}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatAppointmentDate(appointment.date)}
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                          statusConfig[appointment.status].className
                        }`}
                      >
                        {statusConfig[appointment.status].text}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-900">
                      R$ {appointment.price.toFixed(2)}
                    </p>
                    {appointment.status === 'upcoming' && (
                      <button className="text-sm text-red-600 hover:text-red-800 mt-2">
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 