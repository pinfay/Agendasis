import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="container-padding mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/assets/images/logo-agensasis-.png" 
              alt="AgendaSis Logo" 
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('sobre')}
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Contato
            </button>
            <button
              onClick={() => scrollToSection('planos')}
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Planos
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            {/* Multi-purpose Login Button */}
            <Menu as="div" className="relative">
              <Menu.Button
                className="text-sm font-medium text-white px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-primary hover:opacity-90 transition-opacity flex items-center gap-1"
              >
                Login
                <ChevronDownIcon className="w-4 h-4" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-xl shadow-lg p-2 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/auth/login"
                      state={{ role: 'client' }}
                      className={`${
                        active ? 'bg-primary/5' : ''
                      } block px-4 py-2 text-sm text-gray-700 rounded-lg`}
                    >
                      Entrar como cliente
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/auth/login"
                      state={{ role: 'admin' }}
                      className={`${
                        active ? 'bg-primary/5' : ''
                      } block px-4 py-2 text-sm text-gray-700 rounded-lg`}
                    >
                      Entrar como administrador
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>

            <Link
              to="/register"
              className="gradient-bg text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Teste Grátis
            </Link>
          </div>
        </div>
      </nav>
    </motion.header>
  );
} 