import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

export default function Services() {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    // Carregar serviços
  }, []);

  return (
    <div className="p-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Serviços</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos os serviços disponíveis
          </p>
        </div>
        {user?.role === 'owner' && (
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-accent-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-accent-500"
            >
              Novo Serviço
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Nome
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Descrição
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Duração
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Preço
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {services.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">
                      Nenhum serviço encontrado
                    </td>
                  </tr>
                ) : (
                  services.map((service) => (
                    <tr key={service.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {service.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {service.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {service.duration} min
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(service.price)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 