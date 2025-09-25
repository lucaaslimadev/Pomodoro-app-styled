import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Info,
  Sun,
  Moon,
  Play,
  Pause,
  RotateCcw,
  Target,
  Clock,
  Timer,
} from 'lucide-react';

// Hooks
import { usePomodoro } from '../hooks/usePomodoro';
import { useSettings } from '../hooks/useSettings';
import { useCurrentTask } from '../hooks/useCurrentTask';

// Components
import { CircularProgress } from './ui/CircularProgress';
import { ProgressBar } from './ui/ProgressBar';
import { Button } from './ui/Button';
import { HistoryModal } from './modals/HistoryModal';
import { SettingsModal } from './modals/SettingsModal';
import { InfoModal } from './modals/InfoModal';

// Types
import { ModalState } from '../types';

export default function Pomodoro() {
  const pomodoro = usePomodoro();
  const settings = useSettings();
  const { currentTask, setCurrentTask } = useCurrentTask();
  
  const [modals, setModals] = useState<ModalState>({
    showHistory: false,
    showInfo: false,
    showSettings: false,
  });

  // Handle timer completion
  useEffect(() => {
    if (pomodoro.secondsLeft <= 0) {
      pomodoro.finishPhase(settings.shortBreakMinutes);
    }
  }, [pomodoro.secondsLeft, pomodoro.finishPhase, settings.shortBreakMinutes]);

  const toggleModal = (modalName: keyof ModalState) => {
    setModals(prev => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  const handleStartShortBreak = () => {
    pomodoro.startShortBreak(settings.shortBreakMinutes);
  };

  const handleStartLongBreak = () => {
    pomodoro.startLongBreak(settings.longBreakMinutes);
  };

  const handleResetTimer = () => {
    pomodoro.resetTimer(settings.shortBreakMinutes);
  };

  const getPhaseMessage = () => {
    if (pomodoro.phase === 'focus') {
      return '🎯 Foque por 25 min.';
    }
    const minutes = pomodoro.isLongBreak ? settings.longBreakMinutes : settings.shortBreakMinutes;
    return `☕ Descanse por ${minutes} min.`;
  };

  return (
    <div className={`min-h-screen p-6 transition-all duration-500 ${
      settings.isDarkTheme 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-green-500 text-3xl font-bold flex items-center justify-center gap-2">
          <span role="img" aria-label="timer">⏱️</span> Chronos
        </h1>
        
        <nav className="flex justify-center gap-3 mt-4">
          <Button onClick={() => toggleModal('showHistory')} title="Histórico">
            <BarChart3 className="text-white" />
          </Button>
          <Button onClick={() => toggleModal('showSettings')} title="Configurações">
            <Target className="text-white" />
          </Button>
          <Button onClick={() => toggleModal('showInfo')} title="Informações">
            <Info className="text-white" />
          </Button>
          <Button onClick={settings.toggleTheme} title="Alternar tema">
            {settings.isDarkTheme ? <Sun className="text-white" /> : <Moon className="text-white" />}
          </Button>
        </nav>
      </header>

      {/* Current Task Input */}
      <section className="mt-6 mb-4">
        <input
          type="text"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          placeholder="O que você está fazendo?"
          className={`w-full max-w-md mx-auto block text-center p-3 rounded-lg border-2 transition-all duration-200 ${
            settings.isDarkTheme 
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-green-500' 
              : 'bg-white border-gray-300 text-black placeholder-gray-500 focus:border-green-500'
          } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
        />
      </section>

      {/* Timer Display */}
      <main>
        <CircularProgress
          secondsLeft={pomodoro.secondsLeft}
          initialSeconds={pomodoro.initialSeconds}
          phase={pomodoro.phase}
          isRunning={pomodoro.isRunning}
          isDarkTheme={settings.isDarkTheme}
        />

        {/* Cycle Indicator */}
        <div className="text-center mb-2">
          <span className={`text-lg font-semibold ${
            settings.isDarkTheme ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Ciclo {pomodoro.cycle}/4
          </span>
        </div>

        {/* Timer Controls */}
        <section className="flex justify-center gap-4 mt-2">
          <Button
            onClick={pomodoro.toggleTimer}
            variant={pomodoro.phase === 'focus' ? 'success' : 'info'}
            size="lg"
          >
            {pomodoro.isRunning ? <Pause className="text-white w-6 h-6" /> : <Play className="text-white w-6 h-6" />}
          </Button>
          
          <Button onClick={handleResetTimer} variant="secondary" size="lg">
            <RotateCcw className="text-white w-6 h-6" />
          </Button>
          
          <Button
            onClick={handleStartShortBreak}
            variant="info"
            size="lg"
            title={`Pausa Curta (${settings.shortBreakMinutes}min)`}
          >
            <Clock className="text-white w-6 h-6" />
          </Button>
          
          <Button
            onClick={handleStartLongBreak}
            variant="danger"
            size="lg"
            title={`Pausa Longa (${settings.longBreakMinutes}min)`}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Timer className="text-white w-6 h-6" />
          </Button>
        </section>

        {/* Reset Cycle Button */}
        <section className="flex justify-center mt-4">
          <Button onClick={pomodoro.resetCycle} variant="warning" className="px-6 py-2">
            Reset Cycle
          </Button>
        </section>

        {/* Phase Message */}
        <p className={`text-center mt-4 ${
          settings.isDarkTheme ? "text-gray-400" : "text-gray-600"
        }`}>
          <span className={`font-bold text-lg ${
            pomodoro.phase === 'focus'
              ? (settings.isDarkTheme ? 'text-green-400' : 'text-green-600')
              : (settings.isDarkTheme ? 'text-blue-400' : 'text-blue-600')
          }`}>
            {getPhaseMessage()}
          </span>
        </p>

        {/* Daily Progress */}
        <ProgressBar
          current={pomodoro.completedCycles}
          total={settings.dailyGoal}
          isDarkTheme={settings.isDarkTheme}
          label="Meta Diária"
        />
      </main>

      {/* Modals */}
      <HistoryModal
        isOpen={modals.showHistory}
        onClose={() => toggleModal('showHistory')}
        completedCycles={pomodoro.completedCycles}
        dailyGoal={settings.dailyGoal}
        currentTask={currentTask}
        isDarkTheme={settings.isDarkTheme}
      />

      <SettingsModal
        isOpen={modals.showSettings}
        onClose={() => toggleModal('showSettings')}
        dailyGoal={settings.dailyGoal}
        shortBreakMinutes={settings.shortBreakMinutes}
        longBreakMinutes={settings.longBreakMinutes}
        onUpdateDailyGoal={(value) => settings.updateSetting('dailyGoal', value)}
        onUpdateShortBreak={(value) => settings.updateSetting('shortBreakMinutes', value)}
        onUpdateLongBreak={(value) => settings.updateSetting('longBreakMinutes', value)}
        isDarkTheme={settings.isDarkTheme}
      />

      <InfoModal
        isOpen={modals.showInfo}
        onClose={() => toggleModal('showInfo')}
        isDarkTheme={settings.isDarkTheme}
      />

      {/* Footer */}
      <footer className={`mt-12 text-center text-xs ${
        settings.isDarkTheme ? "text-gray-400" : "text-gray-500"
      }`}>
        Chronos Pomodoro © 2025 — Feito com 💚
      </footer>
    </div>
  );
}