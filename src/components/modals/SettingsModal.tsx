import React from 'react';
import { X, Minus, Plus } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyGoal: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  onUpdateDailyGoal: (value: number) => void;
  onUpdateShortBreak: (value: number) => void;
  onUpdateLongBreak: (value: number) => void;
  isDarkTheme: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  dailyGoal,
  shortBreakMinutes,
  longBreakMinutes,
  onUpdateDailyGoal,
  onUpdateShortBreak,
  onUpdateLongBreak,
  isDarkTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-lg max-w-lg w-full mx-4 ${
        isDarkTheme ? "bg-gray-800" : "bg-white"
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-green-500">Configurações</h3>
          <button onClick={onClose} className="p-1">
            <X className={`w-5 h-5 ${
              isDarkTheme ? "text-gray-300" : "text-gray-600"
            }`} />
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Daily Goal */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkTheme ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Meta Diária (ciclos)
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdateDailyGoal(Math.max(1, dailyGoal - 1))}
                className="bg-green-600 hover:bg-green-700 p-2 rounded transition-colors"
              >
                <Minus className="text-white w-4 h-4" />
              </button>
              <span className={`text-xl font-bold min-w-[60px] text-center ${
                isDarkTheme ? 'text-white' : 'text-black'
              }`}>
                {dailyGoal}
              </span>
              <button
                onClick={() => onUpdateDailyGoal(Math.min(20, dailyGoal + 1))}
                className="bg-green-600 hover:bg-green-700 p-2 rounded transition-colors"
              >
                <Plus className="text-white w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Short Break Duration */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkTheme ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Pausa Curta (minutos)
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdateShortBreak(Math.max(1, shortBreakMinutes - 1))}
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition-colors"
              >
                <Minus className="text-white w-4 h-4" />
              </button>
              <span className={`text-xl font-bold min-w-[60px] text-center ${
                isDarkTheme ? 'text-white' : 'text-black'
              }`}>
                {shortBreakMinutes}
              </span>
              <button
                onClick={() => onUpdateShortBreak(Math.min(15, shortBreakMinutes + 1))}
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition-colors"
              >
                <Plus className="text-white w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Long Break Duration */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkTheme ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Pausa Longa (minutos)
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdateLongBreak(Math.max(15, longBreakMinutes - 5))}
                className="bg-purple-600 hover:bg-purple-700 p-2 rounded transition-colors"
              >
                <Minus className="text-white w-4 h-4" />
              </button>
              <span className={`text-xl font-bold min-w-[60px] text-center ${
                isDarkTheme ? 'text-white' : 'text-black'
              }`}>
                {longBreakMinutes}
              </span>
              <button
                onClick={() => onUpdateLongBreak(Math.min(45, longBreakMinutes + 5))}
                className="bg-purple-600 hover:bg-purple-700 p-2 rounded transition-colors"
              >
                <Plus className="text-white w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};