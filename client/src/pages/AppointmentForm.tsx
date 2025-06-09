import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, CalendarIcon, CurrencyDollarIcon, UserIcon, ClockIcon, PhotoIcon, BellIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

const paymentMethods = [
  { id: 'pix', name: 'PIX' },
  { id: 'credit', name: 'Cartão de Crédito' },
  { id: 'debit', name: 'Cartão de Débito' },
  { id: 'cash', name: 'Dinheiro' },
];

const services = [
  { id: 'haircut', name: 'Corte de Cabelo', price: 45.00 },
  { id: 'beard', name: 'Barba', price: 35.00 },
  { id: 'combo', name: 'Corte + Barba', price: 70.00 },
  { id: 'hair-design', name: 'Design de Corte', price: 55.00 },
];

export default function AppointmentForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [notes, setNotes] = useState('');
  const [repeat, setRepeat] = useState('no-repeat');
  const [notification, setNotification] = useState('none');

  const calculateTotal = () => {
    return services
      .filter(service => selectedServices.includes(service.id))
      .reduce((total, service) => total + service.price, 0);
  };

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar o agendamento
    console.log('Salvando agendamento...');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm"
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-900">Agendamento</h1>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <CheckIcon className="w-5 h-5 mr-2" />
            Gravar
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Cliente */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <UserIcon className="w-5 h-5 mr-2 text-gray-500" />
              Cliente
            </h2>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <PlusIcon className="w-5 h-5 mr-2" />
              Selecionar Cliente
            </button>
          </div>

          {/* Data e Hora */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-gray-500" />
                Data
              </h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <ClockIcon className="w-5 h-5 mr-2 text-gray-500" />
                Horário
              </h2>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Serviços</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <label
                  key={service.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    selectedServices.includes(service.id)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedServices([...selectedServices, service.id]);
                        } else {
                          setSelectedServices(selectedServices.filter(id => id !== service.id));
                        }
                      }}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="ml-3">{service.name}</span>
                  </div>
                  <span className="text-gray-900 font-medium">
                    R$ {service.price.toFixed(2)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Pagamento */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <CurrencyDollarIcon className="w-5 h-5 mr-2 text-gray-500" />
              Forma de Pagamento
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`p-4 rounded-lg border text-center ${
                    selectedPayment === method.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {method.name}
                </button>
              ))}
            </div>
          </div>

          {/* Repetir Agendamento */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <ArrowPathIcon className="w-5 h-5 mr-2 text-gray-500" />
              Repetir Agendamento
            </h2>
            <select
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="no-repeat">Não Repetir</option>
              <option value="weekly">Semanalmente</option>
              <option value="biweekly">Quinzenalmente</option>
              <option value="monthly">Mensalmente</option>
            </select>
          </div>

          {/* Observações */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Observações</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Adicione observações importantes aqui..."
            />
          </div>

          {/* Notificação */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <BellIcon className="w-5 h-5 mr-2 text-gray-500" />
              Notificação
            </h2>
            <select
              value={notification}
              onChange={(e) => setNotification(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="none">Não notificar</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>

          {/* Total */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                R$ {calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 