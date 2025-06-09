import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Switch } from '@headlessui/react';

export default function Navigation() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-8 w-auto" src="/assets/images/logo.svg" alt="AgendaSIS" />
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="#sobre"
                className="text-gray-700 hover:text-accent-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sobre
              </Link>
              <Link
                to="#feedback"
                className="text-gray-700 hover:text-accent-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Feedback
              </Link>
              <Link
                to="#contato"
                className="text-gray-700 hover:text-accent-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contato
              </Link>

              <div className="flex items-center space-x-4 ml-6">
                <Switch.Group>
                  <div className="flex items-center">
                    <Switch.Label className={`mr-3 text-sm ${!isAdmin ? 'text-accent-600 font-medium' : 'text-gray-500'}`}>
                      Cliente
                    </Switch.Label>
                    <Switch
                      checked={isAdmin}
                      onChange={setIsAdmin}
                      className={`${
                        isAdmin ? 'bg-accent-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-600 focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          isAdmin ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                    <Switch.Label className={`ml-3 text-sm ${isAdmin ? 'text-accent-600 font-medium' : 'text-gray-500'}`}>
                      Administrador
                    </Switch.Label>
                  </div>
                </Switch.Group>

                <Link
                  to="/login"
                  className="bg-accent-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-accent-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-600"
                >
                  Entrar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 