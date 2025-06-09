import { useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

export default function BarberDashboard() {
  const { user } = useAuth();

  useEffect(() => {
    // Carregar dados do dashboard do barbeiro
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard do Barbeiro</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Cards de estatísticas */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Próximo Cliente</h2>
          <p className="text-xl text-accent-600">Nenhum agendamento</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Agendamentos Hoje</h2>
          <p className="text-3xl font-bold text-accent-600">0</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Comissões do Mês</h2>
          <p className="text-3xl font-bold text-accent-600">R$ 0,00</p>
        </div>
      </div>
    </div>
  );
} 