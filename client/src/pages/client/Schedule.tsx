import { useState } from 'react';
import { format, addDays, startOfToday, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-hot-toast';

const MOCK_SERVICES = [
  { id: 1, name: 'Corte de Cabelo', duration: 30, price: 35 },
  { id: 2, name: 'Barba', duration: 20, price: 25 },
  { id: 3, name: 'Corte + Barba', duration: 50, price: 55 },
];

const MOCK_TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate next 7 days
  const availableDates = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i));

  const formatWeekday = (date: Date) => {
    const weekday = format(date, 'EEEE', { locale: ptBR });
    return weekday.charAt(0).toUpperCase() + weekday.slice(1);
  };

  const handleSchedule = async () => {
    if (!selectedService || !selectedTime) {
      toast.error('Selecione um serviço e horário');
      return;
    }

    try {
      // TODO: Implement API call
      toast.success('Agendamento realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao realizar agendamento. Tente novamente.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Agendar Horário</h2>

          {/* Services */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Escolha o serviço</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    selectedService === service.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <h4 className="font-medium text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-500">{service.duration} minutos</p>
                  <p className="text-sm font-medium text-gray-900 mt-2">
                    R$ {service.price.toFixed(2)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Escolha a data</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
              {availableDates.map((date) => (
                <button
                  key={date.toString()}
                  onClick={() => setSelectedDate(date)}
                  className={`p-4 rounded-lg border text-center transition-colors ${
                    format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <p className="text-sm font-medium text-gray-900">
                    {isToday(date) ? 'Hoje' : formatWeekday(date)}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {format(date, 'd', { locale: ptBR })}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(date, 'MMM', { locale: ptBR })}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Escolha o horário</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {MOCK_TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 rounded-lg border text-center transition-colors ${
                    selectedTime === time
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <p className="text-sm font-medium text-gray-900">{time}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Summary and Confirmation */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Resumo</h3>
                {selectedService && (
                  <p className="text-sm text-gray-500 mt-1">
                    {MOCK_SERVICES.find(s => s.id === selectedService)?.name} - R${' '}
                    {MOCK_SERVICES.find(s => s.id === selectedService)?.price.toFixed(2)}
                  </p>
                )}
                {selectedDate && selectedTime && (
                  <p className="text-sm text-gray-500">
                    {isToday(selectedDate) ? 'Hoje' : format(selectedDate, "dd 'de' MMMM", { locale: ptBR })} 
                    às {selectedTime}
                  </p>
                )}
              </div>
              <button
                onClick={handleSchedule}
                disabled={!selectedService || !selectedTime}
                className="gradient-bg text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar Agendamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 