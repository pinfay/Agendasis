import { useState } from 'react';
import { BuildingStorefrontIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface BusinessHours {
  [key: string]: {
    open: boolean;
    start: string;
    end: string;
  };
}

interface BusinessSettings {
  name: string;
  description: string;
  phone: string;
  email: string;
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  businessHours: BusinessHours;
  logo: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
}

export default function Settings() {
  // Mock data - substituir por dados reais da API
  const [settings, setSettings] = useState<BusinessSettings>({
    name: 'Barbearia AgendaSis',
    description: 'Barbearia moderna com profissionais experientes',
    phone: '(11) 98765-4321',
    email: 'contato@agendasis.com',
    address: {
      street: 'Rua das Barbearias',
      number: '123',
      complement: 'Sala 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
    },
    businessHours: {
      monday: { open: true, start: '09:00', end: '18:00' },
      tuesday: { open: true, start: '09:00', end: '18:00' },
      wednesday: { open: true, start: '09:00', end: '18:00' },
      thursday: { open: true, start: '09:00', end: '18:00' },
      friday: { open: true, start: '09:00', end: '18:00' },
      saturday: { open: true, start: '09:00', end: '15:00' },
      sunday: { open: false, start: '09:00', end: '18:00' },
    },
    logo: '/assets/images/logo-agensasis-.png',
    socialMedia: {
      instagram: '@agendasis',
      facebook: 'agendasis',
      whatsapp: '11987654321',
    },
  });

  const weekDays = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo',
  };

  const handleSave = () => {
    // Implementar salvamento na API
    console.log('Salvando configurações:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center">
          <BuildingStorefrontIcon className="h-6 w-6 text-primary" aria-hidden="true" />
          <h1 className="ml-2 text-2xl font-semibold text-gray-900">Configurações do Estabelecimento</h1>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleSave}
            className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
          >
            Salvar Alterações
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Informações Básicas */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Informações Básicas</h3>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome do Estabelecimento
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Logo</label>
                <div className="mt-1 flex items-center">
                  <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    {settings.logo ? (
                      <img src={settings.logo} alt="Logo" className="h-full w-full object-cover" />
                    ) : (
                      <PhotoIcon className="h-full w-full text-gray-300" aria-hidden="true" />
                    )}
                  </span>
                  <button
                    type="button"
                    className="ml-5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Alterar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Endereço</h3>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                  Rua
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  value={settings.address.street}
                  onChange={(e) => setSettings({
                    ...settings,
                    address: { ...settings.address, street: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                  Número
                </label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  value={settings.address.number}
                  onChange={(e) => setSettings({
                    ...settings,
                    address: { ...settings.address, number: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="complement" className="block text-sm font-medium text-gray-700">
                  Complemento
                </label>
                <input
                  type="text"
                  name="complement"
                  id="complement"
                  value={settings.address.complement}
                  onChange={(e) => setSettings({
                    ...settings,
                    address: { ...settings.address, complement: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
                  Bairro
                </label>
                <input
                  type="text"
                  name="neighborhood"
                  id="neighborhood"
                  value={settings.address.neighborhood}
                  onChange={(e) => setSettings({
                    ...settings,
                    address: { ...settings.address, neighborhood: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                  CEP
                </label>
                <input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  value={settings.address.zipCode}
                  onChange={(e) => setSettings({
                    ...settings,
                    address: { ...settings.address, zipCode: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Cidade
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={settings.address.city}
                  onChange={(e) => setSettings({
                    ...settings,
                    address: { ...settings.address, city: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={settings.address.state}
                  onChange={(e) => setSettings({
                    ...settings,
                    address: { ...settings.address, state: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Horário de Funcionamento */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Horário de Funcionamento</h3>
            <div className="mt-6 space-y-4">
              {Object.entries(weekDays).map(([day, label]) => (
                <div key={day} className="flex items-center space-x-4">
                  <div className="w-40">
                    <label className="block text-sm font-medium text-gray-700">{label}</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.businessHours[day].open}
                      onChange={(e) => setSettings({
                        ...settings,
                        businessHours: {
                          ...settings.businessHours,
                          [day]: { ...settings.businessHours[day], open: e.target.checked }
                        }
                      })}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-500">Aberto</span>
                  </div>
                  {settings.businessHours[day].open && (
                    <>
                      <input
                        type="time"
                        value={settings.businessHours[day].start}
                        onChange={(e) => setSettings({
                          ...settings,
                          businessHours: {
                            ...settings.businessHours,
                            [day]: { ...settings.businessHours[day], start: e.target.value }
                          }
                        })}
                        className="block rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                      <span className="text-gray-500">até</span>
                      <input
                        type="time"
                        value={settings.businessHours[day].end}
                        onChange={(e) => setSettings({
                          ...settings,
                          businessHours: {
                            ...settings.businessHours,
                            [day]: { ...settings.businessHours[day], end: e.target.value }
                          }
                        })}
                        className="block rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Redes Sociais</h3>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                  Instagram
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="instagram"
                    id="instagram"
                    value={settings.socialMedia.instagram.replace('@', '')}
                    onChange={(e) => setSettings({
                      ...settings,
                      socialMedia: { ...settings.socialMedia, instagram: e.target.value }
                    })}
                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                  Facebook
                </label>
                <input
                  type="text"
                  name="facebook"
                  id="facebook"
                  value={settings.socialMedia.facebook}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialMedia: { ...settings.socialMedia, facebook: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                  WhatsApp
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  value={settings.socialMedia.whatsapp}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialMedia: { ...settings.socialMedia, whatsapp: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 