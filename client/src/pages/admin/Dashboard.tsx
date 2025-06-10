import { useState } from 'react';
import {
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ScissorsIcon,
} from '@heroicons/react/24/outline';
import { ChartData } from 'chart.js';
import Chart from '../../components/Chart';
import { chartColors, defaultLineChartOptions, defaultDoughnutChartOptions } from '../../config/chartConfig';

interface DashboardStats {
  totalAppointments: number;
  dailyRevenue: string;
  clientSatisfaction: string;
  activeClients: number;
}

export default function AdminDashboard() {
  const [stats] = useState<DashboardStats>({
    totalAppointments: 164,
    dailyRevenue: 'R$ 468,00',
    clientSatisfaction: '87%',
    activeClients: 45,
  });

  // Configuração do gráfico de linha
  const lineChartData: ChartData<'line'> = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Agendamentos',
        data: [12, 19, 15, 17, 22, 25, 18],
        fill: false,
        borderColor: chartColors.primary,
        tension: 0.4,
      },
    ],
  };

  // Configuração do gráfico de rosca
  const doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Corte', 'Barba', 'Combo', 'Outros'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          chartColors.primary,
          chartColors.secondary,
          chartColors.tertiary,
          chartColors.quaternary,
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
            Baixar Relatório
          </button>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Agendamentos</dt>
                <dd className="text-lg font-semibold text-gray-900">{stats.totalAppointments}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CurrencyDollarIcon className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Receita Diária</dt>
                <dd className="text-lg font-semibold text-gray-900">{stats.dailyRevenue}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Satisfação Clientes</dt>
                <dd className="text-lg font-semibold text-gray-900">{stats.clientSatisfaction}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ScissorsIcon className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Clientes Ativos</dt>
                <dd className="text-lg font-semibold text-gray-900">{stats.activeClients}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Agendamentos por Dia</h3>
            <div className="mt-2">
              <Chart
                type="line"
                data={lineChartData}
                options={defaultLineChartOptions}
                height={300}
              />
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Serviços Mais Procurados</h3>
            <div className="mt-2">
              <Chart
                type="doughnut"
                data={doughnutChartData}
                options={defaultDoughnutChartOptions}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Próximos Agendamentos */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Próximos Agendamentos</h3>
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Serviço
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Horário
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Mock data - substituir por dados reais */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">João Silva</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Corte + Barba</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">24/03/2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">14:30</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Confirmado
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Pedro Santos</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Corte</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">24/03/2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15:00</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pendente
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 