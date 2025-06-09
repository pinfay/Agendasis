import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  AcademicCapIcon,
  TruckIcon,
  DocumentTextIcon,
  ChatBubbleLeftEllipsisIcon,
  CalendarIcon,
  Cog6ToothIcon,
  BellIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboards', icon: HomeIcon, href: '/admin', count: '5' },
  { name: 'Analytics', icon: ChartBarIcon, href: '/admin/analytics' },
  { name: 'CRM', icon: UserGroupIcon, href: '/admin/crm' },
  { name: 'Ecommerce', icon: ShoppingBagIcon, href: '/admin/ecommerce' },
  { name: 'Academy', icon: AcademicCapIcon, href: '/admin/academy' },
  { name: 'Logistics', icon: TruckIcon, href: '/admin/logistics' },
];

const apps = [
  { name: 'Pages', icon: DocumentTextIcon, href: '/admin/pages' },
  { name: 'Chat', icon: ChatBubbleLeftEllipsisIcon, href: '/admin/chat' },
  { name: 'Calendar', icon: CalendarIcon, href: '/admin/calendar' },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700">
        <div className="flex items-center h-16 px-4">
          <img
            className="h-8 w-auto"
            src="/logo.svg"
            alt="Vuexy"
          />
          <span className="ml-2 text-xl font-semibold text-purple-500">Vuexy</span>
        </div>
        
        <nav className="mt-4">
          <div className="px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <item.icon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" />
                {item.name}
                {item.count && (
                  <span className="ml-auto bg-purple-500 text-white px-2 py-0.5 rounded-full text-xs">
                    {item.count}
                  </span>
                )}
              </Link>
            ))}
          </div>
          
          <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Apps & Pages
            </h3>
            <div className="mt-2 px-2 space-y-1">
              {apps.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <item.icon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Header */}
        <header className="h-16 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center justify-end h-full px-4 space-x-4">
            <button className="p-1 text-gray-400 hover:text-white">
              <BellIcon className="h-6 w-6" />
            </button>
            <button className="flex items-center text-sm text-gray-300 hover:text-white">
              <UserCircleIcon className="h-8 w-8" />
              <span className="ml-2">John Doe</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 