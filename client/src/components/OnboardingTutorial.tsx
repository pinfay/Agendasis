import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tutorialSteps = [
  {
    title: 'Bem-vindo ao AgendaSIS!',
    description: 'Vamos te ajudar a fazer seu primeiro agendamento em poucos passos.'
  },
  {
    title: 'Escolha o Serviço',
    description: 'Selecione o serviço desejado entre as opções disponíveis na barbearia.'
  },
  {
    title: 'Data e Horário',
    description: 'Escolha o melhor dia e horário disponível para seu atendimento.'
  },
  {
    title: 'Pagamento',
    description: 'Selecione sua forma de pagamento preferida e confirme seu agendamento.'
  }
];

export default function OnboardingTutorial() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-purple-900 flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-md w-full mx-4 text-center p-8 rounded-lg"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            {tutorialSteps[currentStep].title}
          </h2>

          <p className="text-xl text-white/90 mb-12">
            {tutorialSteps[currentStep].description}
          </p>

          <div className="flex justify-center space-x-2 mb-8">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              className={`p-2 rounded-full ${
                currentStep === 0
                  ? 'opacity-0 cursor-default'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              disabled={currentStep === 0}
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {currentStep === tutorialSteps.length - 1 ? (
              <button
                onClick={() => window.location.href = '/agendar'}
                className="px-6 py-3 bg-white text-purple-900 rounded-full font-medium hover:bg-white/90 text-lg"
              >
                Começar Agendamento
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-white text-purple-900 rounded-full font-medium hover:bg-white/90 text-lg"
              >
                Próximo
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 