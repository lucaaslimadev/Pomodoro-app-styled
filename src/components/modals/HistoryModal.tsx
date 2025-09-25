import React from 'react';
import { X } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedCycles: number;
  dailyGoal: number;
  currentTask: string;
  isDarkTheme: boolean;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  completedCycles,
  dailyGoal,
  currentTask,
  isDarkTheme,
}) => {
  if (!isOpen) return null;

  const totalFocusHours = Math.floor((completedCycles * 25) / 60);
  const totalFocusMinutes = (completedCycles * 25) % 60;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-lg max-w-md w-full mx-4 ${
        isDarkTheme ? "bg-gray-800" : "bg-white"
      }`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-green-500">Histórico</h3>
          <button onClick={onClose} className="p-1">
            <X className={`w-5 h-5 ${
              isDarkTheme ? "text-gray-300" : "text-gray-600"
            }`} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg text-center ${
              isDarkTheme ? "bg-gray-700" : "bg-gray-100"
            }`}>
              <p className="text-sm font-medium mb-1">Ciclos Hoje</p>
              <p className="text-3xl font-bold text-green-500">{completedCycles}</p>
            </div>
            <div className={`p-4 rounded-lg text-center ${
              isDarkTheme ? "bg-gray-700" : "bg-gray-100"
            }`}>
              <p className="text-sm font-medium mb-1">Meta Diária</p>
              <p className="text-3xl font-bold text-blue-500">{dailyGoal}</p>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${
            isDarkTheme ? "bg-gray-700" : "bg-gray-100"
          }`}>
            <p className="text-sm font-medium mb-2">Tempo Total Focado</p>
            <p className="text-2xl font-semibold">
              {totalFocusHours}h {totalFocusMinutes}min
            </p>
          </div>
          
          {currentTask && (
            <div className={`p-4 rounded-lg ${
              isDarkTheme ? "bg-gray-700" : "bg-gray-100"
            }`}>
              <p className="text-sm font-medium mb-1">Tarefa Atual</p>
              <p className="text-lg">{currentTask}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};