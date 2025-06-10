import { useState } from 'react';
import { BellIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'appointment' | 'reminder' | 'system';
  read: boolean;
  createdAt: string;
}

export default function Notifications() {
  // Mock data - substituir por dados reais da API
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Agendamento Confirmado',
      message: 'Seu agendamento para Corte + Barba foi confirmado para amanhã às 14:30.',
      type: 'appointment',
      read: false,
      createdAt: '2024-03-23T10:30:00',
    },
    {
      id: 2,
      title: 'Lembrete de Agendamento',
      message: 'Não se esqueça do seu agendamento amanhã às 14:30.',
      type: 'reminder',
      read: false,
      createdAt: '2024-03-23T08:00:00',
    },
    {
      id: 3,
      title: 'Promoção Especial',
      message: 'Aproveite 20% de desconto em serviços de barba durante esta semana!',
      type: 'system',
      read: true,
      createdAt: '2024-03-22T15:00:00',
    },
  ]);

  const markAsRead = (notificationId: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const deleteNotification = (notificationId: number) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center">
          <BellIcon className="h-6 w-6 text-primary" aria-hidden="true" />
          <h1 className="ml-2 text-2xl font-semibold text-gray-900">Notificações</h1>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
            className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
          >
            Marcar todas como lidas
          </button>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <ul role="list" className="divide-y divide-gray-200">
          {notifications.length === 0 ? (
            <li className="px-4 py-5 sm:px-6">
              <div className="text-center text-gray-500">
                Nenhuma notificação no momento
              </div>
            </li>
          ) : (
            notifications.map((notification) => (
              <li
                key={notification.id}
                className={`px-4 py-5 sm:px-6 ${!notification.read ? 'bg-primary/5' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${!notification.read ? 'text-primary' : 'text-gray-900'}`}>
                        {notification.title}
                      </p>
                      <div className="ml-2 flex flex-shrink-0">
                        <p className="text-sm text-gray-500">
                          {formatDate(notification.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-gray-600">{notification.message}</p>
                    </div>
                  </div>
                  <div className="ml-4 flex space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                      >
                        <span className="sr-only">Marcar como lida</span>
                        <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                    >
                      <span className="sr-only">Excluir</span>
                      <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      notification.type === 'appointment'
                        ? 'bg-green-100 text-green-800'
                        : notification.type === 'reminder'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {notification.type === 'appointment'
                      ? 'Agendamento'
                      : notification.type === 'reminder'
                      ? 'Lembrete'
                      : 'Sistema'}
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
} 