import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface StaffMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  specialties: string[];
  schedule: {
    [key: string]: {
      start: string;
      end: string;
      break_start?: string;
      break_end?: string;
    };
  };
  active: boolean;
  image: string;
}

const weekDays = {
  monday: 'Segunda',
  tuesday: 'Terça',
  wednesday: 'Quarta',
  thursday: 'Quinta',
  friday: 'Sexta',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

export default function Staff() {
  // Mock data - substituir por dados reais da API
  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: 1,
      name: 'Ricardo Silva',
      email: 'ricardo@agendasis.com',
      phone: '(11) 98765-4321',
      role: 'Barbeiro Senior',
      specialties: ['Corte Masculino', 'Barba', 'Pigmentação'],
      schedule: {
        monday: { start: '09:00', end: '18:00', break_start: '12:00', break_end: '13:00' },
        tuesday: { start: '09:00', end: '18:00', break_start: '12:00', break_end: '13:00' },
        wednesday: { start: '09:00', end: '18:00', break_start: '12:00', break_end: '13:00' },
        thursday: { start: '09:00', end: '18:00', break_start: '12:00', break_end: '13:00' },
        friday: { start: '09:00', end: '18:00', break_start: '12:00', break_end: '13:00' },
        saturday: { start: '09:00', end: '15:00' },
      },
      active: true,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      name: 'André Santos',
      email: 'andre@agendasis.com',
      phone: '(11) 98765-4322',
      role: 'Barbeiro',
      specialties: ['Corte Masculino', 'Barba'],
      schedule: {
        monday: { start: '12:00', end: '21:00', break_start: '15:00', break_end: '16:00' },
        tuesday: { start: '12:00', end: '21:00', break_start: '15:00', break_end: '16:00' },
        wednesday: { start: '12:00', end: '21:00', break_start: '15:00', break_end: '16:00' },
        thursday: { start: '12:00', end: '21:00', break_start: '15:00', break_end: '16:00' },
        friday: { start: '12:00', end: '21:00', break_start: '15:00', break_end: '16:00' },
        saturday: { start: '10:00', end: '16:00' },
      },
      active: true,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const handleEditStaff = (member: StaffMember) => {
    setEditingStaff(member);
    setIsModalOpen(true);
  };

  const handleDeleteStaff = (staffId: number) => {
    if (window.confirm('Tem certeza que deseja remover este funcionário?')) {
      setStaff(staff.filter(member => member.id !== staffId));
    }
  };

  const handleEditSchedule = (member: StaffMember) => {
    setEditingStaff(member);
    setIsScheduleModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Gerenciamento de Funcionários</h1>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => {
              setEditingStaff(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Novo Funcionário
          </button>
        </div>
      </div>

      {/* Lista de Funcionários */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {staff.map((member) => (
          <div
            key={member.id}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:border-gray-400"
          >
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src={member.image} alt="" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                <p className="truncate text-sm text-gray-500">{member.role}</p>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{member.email}</p>
                <p className="text-sm text-gray-500">{member.phone}</p>
              </div>
              <div className="mt-2">
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleEditStaff(member)}
                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleEditSchedule(member)}
                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <CalendarIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDeleteStaff(member.id)}
                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-red-600"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Edição/Criação */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {editingStaff ? 'Editar Funcionário' : 'Novo Funcionário'}
                </h3>
                <div className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nome
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={editingStaff?.name}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      defaultValue={editingStaff?.email}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      defaultValue={editingStaff?.phone}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Cargo
                    </label>
                    <select
                      id="role"
                      name="role"
                      defaultValue={editingStaff?.role}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    >
                      <option>Barbeiro</option>
                      <option>Barbeiro Senior</option>
                      <option>Gerente</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="specialties" className="block text-sm font-medium text-gray-700">
                      Especialidades
                    </label>
                    <div className="mt-2 space-y-2">
                      {['Corte Masculino', 'Barba', 'Pigmentação', 'Sobrancelha'].map((specialty) => (
                        <div key={specialty} className="flex items-center">
                          <input
                            type="checkbox"
                            id={specialty}
                            name="specialties"
                            defaultChecked={editingStaff?.specialties.includes(specialty)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <label htmlFor={specialty} className="ml-2 text-sm text-gray-900">
                            {specialty}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Salvar
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Horários */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Horários de Trabalho - {editingStaff?.name}
                </h3>
                <div className="mt-5 space-y-4">
                  {Object.entries(weekDays).map(([day, label]) => (
                    <div key={day} className="border-t border-gray-200 pt-4 first:border-0 first:pt-0">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700">
                          {label}
                        </label>
                        <input
                          type="checkbox"
                          defaultChecked={!!editingStaff?.schedule[day]}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                      {editingStaff?.schedule[day] && (
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-500">Início</label>
                            <input
                              type="time"
                              defaultValue={editingStaff.schedule[day].start}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500">Fim</label>
                            <input
                              type="time"
                              defaultValue={editingStaff.schedule[day].end}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500">Intervalo Início</label>
                            <input
                              type="time"
                              defaultValue={editingStaff.schedule[day].break_start}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500">Intervalo Fim</label>
                            <input
                              type="time"
                              defaultValue={editingStaff.schedule[day].break_end}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  onClick={() => setIsScheduleModalOpen(false)}
                >
                  Salvar
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                  onClick={() => setIsScheduleModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 