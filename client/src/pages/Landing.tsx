import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navigation from '../components/Navigation';
import {
  CalendarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  StarIcon,
  UserGroupIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Easy Scheduling',
    description: 'Streamline your appointment booking process with our intuitive calendar system.',
    icon: CalendarIcon,
  },
  {
    name: 'Financial Management',
    description: 'Track revenue, expenses, and commissions with detailed financial reports.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Performance Analytics',
    description: 'Monitor your business growth with comprehensive analytics and insights.',
    icon: ChartBarIcon,
  },
  {
    name: 'Client Management',
    description: 'Build stronger relationships with a complete client management system.',
    icon: UserGroupIcon,
  },
  {
    name: 'Real-time Availability',
    description: 'Show real-time availability and reduce no-shows with automated reminders.',
    icon: ClockIcon,
  },
  {
    name: 'Reviews & Ratings',
    description: 'Build trust with verified customer reviews and ratings for your services.',
    icon: StarIcon,
  },
];

const pricing = [
  {
    name: 'Basic',
    price: 'R$99',
    description: 'Perfect for small barbershops',
    features: [
      'Up to 2 barbers',
      'Basic appointment scheduling',
      'Client management',
      'Payment processing',
      'Email notifications',
    ],
  },
  {
    name: 'Professional',
    price: 'R$199',
    description: 'Great for growing businesses',
    features: [
      'Up to 5 barbers',
      'Advanced scheduling',
      'Financial reports',
      'SMS notifications',
      'Customer loyalty program',
      'Performance analytics',
    ],
  },
  {
    name: 'Enterprise',
    price: 'R$299',
    description: 'For large establishments',
    features: [
      'Unlimited barbers',
      'Multiple locations',
      'Custom branding',
      'Priority support',
      'API access',
      'Advanced analytics',
      'Custom reports',
    ],
  },
];

const testimonials = [
  {
    content: "AgendaSIS transformed how we manage our barbershop. It's easy to use and our clients love it!",
    author: "João Silva",
    role: "Owner, Barbearia Silva"
  },
  {
    content: "The scheduling system is perfect. I can manage my appointments and see my earnings in real-time.",
    author: "Carlos Santos",
    role: "Barber, Cortes & Cia"
  },
  {
    content: "Finally I can book my haircuts online! No more waiting in line or calling the barbershop.",
    author: "Pedro Oliveira",
    role: "Client"
  }
];

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
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
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

export default function Landing() {
  return (
    <div className="bg-white">
      <Navigation />

      {/* Hero section */}
      <div className="relative isolate pt-24">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-accent-200 to-accent-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeInSection>
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Transforme sua barbearia com agendamento inteligente
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Sistema completo para gestão de barbearias. Agendamentos online, controle financeiro,
                  comissões e fidelização de clientes em uma única plataforma.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    to="/register?role=owner"
                    className="rounded-md bg-accent-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
                  >
                    Comece agora
                  </Link>
                  <Link to="#features" className="text-sm font-semibold leading-6 text-gray-900">
                    Saiba mais <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeInSection>
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-accent-600">Tudo em um só lugar</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Tudo que você precisa para gerenciar sua barbearia
              </p>
            </div>
          </FadeInSection>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature, index) => (
                <FadeInSection key={feature.name} delay={index * 0.2}>
                  <div className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <feature.icon className="h-5 w-5 flex-none text-accent-600" aria-hidden="true" />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                </FadeInSection>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeInSection>
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-accent-600">Depoimentos</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                O que nossos clientes dizem
              </p>
            </div>
          </FadeInSection>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <FadeInSection key={index} delay={index * 0.2}>
                <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
                  <blockquote className="text-gray-900">
                    <p>"{testimonial.content}"</p>
                  </blockquote>
                  <div className="mt-6">
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="mt-1 text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeInSection>
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-accent-600">Preços</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Escolha o plano ideal para seu negócio
              </p>
            </div>
          </FadeInSection>

          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {pricing.map((tier, index) => (
              <FadeInSection key={tier.name} delay={index * 0.2}>
                <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
                  <div>
                    <div className="flex items-center justify-between gap-x-4">
                      <h3 className="text-lg font-semibold leading-8 text-gray-900">{tier.name}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                    <p className="mt-6 flex items-baseline gap-x-1">
                      <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price}</span>
                      <span className="text-sm font-semibold leading-6 text-gray-600">/mês</span>
                    </p>
                    <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <svg className="h-6 w-5 flex-none text-accent-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to={`/register?role=owner&plan=${tier.name.toLowerCase()}`}
                    className="mt-8 block rounded-md bg-accent-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accent-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
                  >
                    Começar agora
                  </Link>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} AgendaSIS. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 