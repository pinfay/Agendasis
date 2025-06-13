import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export default function RegisterEstablishment() {
  const navigate = useNavigate();
  const { signUpEstablishment } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Dados do proprietário
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    // Dados do estabelecimento
    establishmentName: '',
    cnpj: '',
    address: '',
    establishmentPhone: '',
    establishmentEmail: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await signUpEstablishment(registerData);
      toast.success('Estabelecimento registrado com sucesso!');
      navigate('/dashboard/admin');
    } catch (error) {
      toast.error('Erro ao registrar estabelecimento. Verifique os dados informados.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Registro de Estabelecimento
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Preencha os dados do proprietário e do estabelecimento
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Dados do Proprietário */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Dados do Proprietário</h3>
              
              <div>
                <label htmlFor="firstName" className="sr-only">Nome</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Nome"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="sr-only">Sobrenome</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Sobrenome"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">Telefone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Telefone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Senha</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirmar Senha</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Confirmar Senha"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Dados do Estabelecimento */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Dados do Estabelecimento</h3>
              
              <div>
                <label htmlFor="establishmentName" className="sr-only">Nome do Estabelecimento</label>
                <input
                  id="establishmentName"
                  name="establishmentName"
                  type="text"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Nome do Estabelecimento"
                  value={formData.establishmentName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="cnpj" className="sr-only">CNPJ</label>
                <input
                  id="cnpj"
                  name="cnpj"
                  type="text"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="CNPJ (XX.XXX.XXX/XXXX-XX)"
                  value={formData.cnpj}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="address" className="sr-only">Endereço</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Endereço"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="establishmentPhone" className="sr-only">Telefone do Estabelecimento</label>
                <input
                  id="establishmentPhone"
                  name="establishmentPhone"
                  type="tel"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Telefone do Estabelecimento"
                  value={formData.establishmentPhone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="establishmentEmail" className="sr-only">Email do Estabelecimento</label>
                <input
                  id="establishmentEmail"
                  name="establishmentEmail"
                  type="email"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Email do Estabelecimento"
                  value={formData.establishmentEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
            >
              {isLoading ? 'Registrando...' : 'Registrar Estabelecimento'}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link to="/auth/login" className="font-medium text-purple-400 hover:text-purple-300">
              Já tem uma conta? Faça login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 