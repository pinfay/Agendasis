import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const weekDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = Math.floor(i / 2) + 8;
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
}).filter((time) => {
  const hour = parseInt(time.split(':')[0]);
  return hour >= 8 && hour < 20;
});

export default function AppointmentScheduling() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const getDaysInWeek = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm"
      >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Agendar Horário</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateWeek('prev')}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
              </button>
              <span className="text-lg font-medium text-gray-900">
                {formatDate(currentDate)}
              </span>
              <button
                onClick={() => navigateWeek('next')}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronRightIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-8 gap-4">
            {/* Time slots column */}
            <div className="pt-8">
              {timeSlots.map((time) => (
                <div key={time} className="h-12 flex items-center justify-end pr-4 text-sm text-gray-500">
                  {time}
                </div>
              ))}
            </div>

            {/* Days columns */}
            {getDaysInWeek().map((date, index) => (
              <div key={date.toISOString()} className="flex flex-col">
                <div className="text-center mb-2">
                  <div className="text-sm font-medium text-gray-500 uppercase">
                    {weekDays[index]}
                  </div>
                  <button
                    onClick={() => setSelectedDate(date)}
                    className={`w-8 h-8 rounded-full mt-1 text-sm font-medium ${
                      isToday(date)
                        ? 'bg-accent-600 text-white'
                        : selectedDate?.toDateString() === date.toDateString()
                        ? 'bg-accent-100 text-accent-600'
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {date.getDate()}
                  </button>
                </div>

                {/* Time slots */}
                {timeSlots.map((time) => {
                  const isAvailable = Math.random() > 0.7; // Simulated availability
                  const timeSlotKey = `${date.toDateString()}-${time}`;
                  const isSelected = selectedDate?.toDateString() === date.toDateString() && selectedTime === time;

                  return (
                    <button
                      key={timeSlotKey}
                      disabled={!isAvailable}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime(time);
                      }}
                      className={`h-12 border-t border-l first:border-t-0 ${
                        isSelected
                          ? 'bg-accent-100 border-accent-200'
                          : isAvailable
                          ? 'hover:bg-gray-50'
                          : 'bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {selectedDate && selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gray-50 rounded-b-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Horário Selecionado</h2>
                <p className="text-gray-500">
                  {selectedDate.toLocaleDateString('pt-BR')} às {selectedTime}
                </p>
              </div>
              <button className="px-4 py-2 bg-accent-600 text-white rounded-md hover:bg-accent-500">
                Confirmar Agendamento
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 