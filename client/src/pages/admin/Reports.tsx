import { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ReportData {
  period: string;
  revenue: number;
  appointments: number;
  newClients: number;
}

interface ServiceData {
  name: string;
  count: number;
  revenue: number;
}

export default function Reports() {
  // Mock data - substituir por dados reais da API
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [reportData] = useState<ReportData[]>([
    { period: 'Jan', revenue: 5200, appointments: 130, newClients: 25 },
    { period: 'Fev', revenue: 4800, appointments: 120, newClients: 20 },
    { period: 'Mar', revenue: 6100, appointments: 150, newClients: 30 },
    { period: 'Abr', revenue: 5500, appointments: 140, newClients: 22 },
    { period: 'Mai', revenue: 5800, appointments: 145, newClients: 28 },
    { period: 'Jun', revenue: 6300, appointments: 155, newClients: 35 },
  ]);

  const [serviceData] = useState<ServiceData[]>([
    { name: 'Corte', count: 250, revenue: 8750 },
    { name: 'Barba', count: 180, revenue: 4500 },
    { name: 'Combo', count: 150, revenue: 8250 },
    { name: 'Outros', count: 50, revenue: 2000 },
  ]);

  // Configuração do gráfico de receita
  const revenueChartData = {
    labels: reportData.map(data => data.period),
    datasets: [
      {
        label: 'Receita (R$)',
        data: reportData.map(data => data.revenue),
        fill: false,
        borderColor: '#8B5CF6',
        tension: 0.4,
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Configuração do gráfico de agendamentos
  const appointmentsChartData = {
    labels: reportData.map(data => data.period),
    datasets: [
      {
        label: 'Agendamentos',
        data: reportData.map(data => data.appointments),
        backgroundColor: '#A855F7',
      },
    ],
  };

  const appointmentsChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Configuração do gráfico de serviços
  const servicesChartData = {
    labels: serviceData.map(data => data.name),
    datasets: [
      {
        data: serviceData.map(data => data.count),
        backgroundColor: ['#8B5CF6', '#A855F7', '#7E22CE', '#D8B4FE'],
        borderWidth: 0,
      },
    ],
  };

  const servicesChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
    cutout: '70%',
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Relatórios</h1>
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          >
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
            <option value="year">Último Ano</option>
          </select>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
          <dt className="truncate text-sm font-medium text-gray-500">Receita Total</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            R$ {reportData.reduce((sum, data) => sum + data.revenue, 0).toLocaleString('pt-BR')}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
          <dt className="truncate text-sm font-medium text-gray-500">Total Agendamentos</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {reportData.reduce((sum, data) => sum + data.appointments, 0)}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
          <dt className="truncate text-sm font-medium text-gray-500">Novos Clientes</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {reportData.reduce((sum, data) => sum + data.newClients, 0)}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
          <dt className="truncate text-sm font-medium text-gray-500">Ticket Médio</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            R$ {Math.round(reportData.reduce((sum, data) => sum + data.revenue, 0) / reportData.reduce((sum, data) => sum + data.appointments, 0)).toLocaleString('pt-BR')}
          </dd>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Receita por Período</h3>
            <div className="mt-2">
              <Line data={revenueChartData} options={revenueChartOptions} />
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Agendamentos por Período</h3>
            <div className="mt-2">
              <Bar data={appointmentsChartData} options={appointmentsChartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Serviços Mais Procurados */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Serviços Mais Procurados</h3>
            <div className="mt-2">
              <Doughnut data={servicesChartData} options={servicesChartOptions} />
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Detalhamento por Serviço</h3>
            <div className="mt-4">
              <div className="flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                            Serviço
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Quantidade
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Receita
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {serviceData.map((service) => (
                          <tr key={service.name}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                              {service.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {service.count}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              R$ {service.revenue.toLocaleString('pt-BR')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 