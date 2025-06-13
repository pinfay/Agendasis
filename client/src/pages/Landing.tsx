import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navigation from '../components/Navigation';
import {
  CalendarIcon,
  UserGroupIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import DisparoFeedback from '../components/disparoFeedback';

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = 0, className = '' }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const features = [
  {
    name: 'Funcionamos online',
    description: 'Nossa base de dados é 100% online.',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: 'Lembrete',
    description: 'Envie lembrete de agendamento para seus clientes.',
    icon: ClockIcon,
  },
  {
    name: 'Agendamento Online',
    description: 'Aceite agendamentos online através da sua página.',
    icon: CalendarIcon,
  },
  {
    name: 'Multi agendas',
    description: 'Tenha multi agendas, cadastre todos os seus funcionários.',
    icon: UserGroupIcon,
  },
  {
    name: 'Sempre em sincronia',
    description: 'Não se preocupe com os dados, tudo sincronizado.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Permissões',
    description: 'Defina permissões de acesso para cada funcionário.',
    icon: ShieldCheckIcon,
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section id="sobre" className="relative section-padding pt-32 overflow-hidden">
        <div className="container-padding mx-auto max-w-7xl">
          <FadeInSection>
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Gerencie seus<br />agendamentos<br />em um só lugar
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Aceite agendamentos online através da sua página. Seu cliente pode agendar sozinho, você receberá notificações e poderá focar mais tempo na sua empresa.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/register"
                  className="gradient-bg text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
                >
                  Teste Grátis
                </Link>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Features Section */}
      <section id="contato" className="section-padding bg-gray-50">
        <div className="container-padding mx-auto max-w-7xl">
          <FadeInSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
              Entre em contato
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeInSection key={feature.name} delay={index * 0.1}>
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <feature.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeInSection className="order-2 md:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Agenda web<br />Organizada
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Usada por pessoas que procuram deixar as coisas mais simples.
                Permite que seus clientes agendem os próprios horários.
              </p>
              <div className="flex gap-4">
                <Link to="#" className="hover:opacity-90 transition-opacity">
                  <img 
                    src="/assets/images/Apple-store.png" 
                    alt="Download on the App Store" 
                    className="h-12 w-auto"
                  />
                </Link>
                <Link to="#" className="hover:opacity-90 transition-opacity">
                  <img 
                    src="/assets/images/Google-play.png" 
                    alt="Get it on Google Play" 
                    className="h-12 w-auto"
                  />
                </Link>
              </div>
            </FadeInSection>
            
            <FadeInSection className="order-1 md:order-2">
              <img 
                src="/assets/images/celular 1.png" 
                alt="AgendaSis App Interface" 
                className="w-full max-w-[300px] mx-auto md:max-w-none"
              />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="section-padding bg-gray-50">
        <div className="container-padding mx-auto max-w-7xl text-center">
          <FadeInSection>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Escolha o plano certo<br />para seu negócio
            </h2>
            <p className="text-gray-600 mb-12">
              Comece o teste grátis de 30 dias, experimente nossa plataforma por um período, se gostar assine.
            </p>
            <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-sm p-8">
              <div className="text-primary font-semibold mb-2">NOSSOS PREÇOS</div>
              <div className="text-4xl font-bold mb-2">R$19,90</div>
              <div className="text-gray-600 mb-6">Por mês</div>
              <button className="w-full gradient-bg text-white py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
                Gratuito por 30 dias
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Download App Section */}
      <section className="section-padding gradient-bg text-white">
        <div className="container-padding mx-auto max-w-7xl text-center">
          <FadeInSection>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Aplicativo de Agendamento
            </h2>
            <p className="mb-8">
              Baixe o app agora, a teste sem compromisso! Não é necessário informar cartão de crédito ou qualquer forma de pagamento durante o período de testes.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="#" className="hover:opacity-90 transition-opacity">
                <img 
                  src="/assets/images/Google-play.png" 
                  alt="Get it on Google Play" 
                  className="h-12 w-auto"
                />
              </Link>
              <Link to="#" className="hover:opacity-90 transition-opacity">
                <img 
                  src="/assets/images/Apple-store.png" 
                  alt="Download on the App Store" 
                  className="h-12 w-auto"
                />
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
      <DisparoFeedback />
    </div>
  );
} 