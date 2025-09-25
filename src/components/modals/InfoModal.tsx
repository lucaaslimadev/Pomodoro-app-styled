import React from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme: boolean;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  isDarkTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-lg max-w-lg w-full mx-4 ${
        isDarkTheme ? "bg-gray-800" : "bg-white"
      }`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-green-500">Técnica Pomodoro</h3>
          <button onClick={onClose} className="p-1">
            <X className={`w-5 h-5 ${
              isDarkTheme ? "text-gray-300" : "text-gray-600"
            }`} />
          </button>
        </div>
        
        <div className="space-y-4 text-sm">
          <p>
            A Técnica Pomodoro é um método de gerenciamento de tempo
            desenvolvido por Francesco Cirillo nos anos 80.
          </p>
          
          <div>
            <h4 className="font-semibold text-green-400 mb-2">Como funciona:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>25 minutos de foco total na tarefa</li>
              <li>5 minutos de pausa</li>
              <li>Após 4 ciclos, pausa longa de 15-30 min</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-green-400 mb-2">Benefícios:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Melhora o foco e concentração</li>
              <li>Reduz a procrastinação</li>
              <li>Aumenta a produtividade</li>
              <li>Combate a fadiga mental</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};