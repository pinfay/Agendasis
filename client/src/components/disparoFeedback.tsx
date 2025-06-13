import React from 'react';
import toast from 'react-hot-toast';

const DisparoFeedback: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => toast.success('Sucesso! Operação realizada.')}
      >
        Disparar Toast de Sucesso
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => toast.error('Erro! Algo deu errado.')}
      >
        Disparar Toast de Erro
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => toast('Informação: Esta é uma mensagem informativa.')}
      >
        Disparar Toast Informativo
      </button>
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded"
        onClick={() => toast('Atenção! Verifique os dados.', { icon: '⚠️' })}
      >
        Disparar Toast de Aviso
      </button>
    </div>
  );
};

export default DisparoFeedback; 