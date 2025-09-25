export type Phase = 'focus' | 'break';

export interface PomodoroState {
  phase: Phase;
  secondsLeft: number;
  isRunning: boolean;
  cycle: number;
  completedCycles: number;
  isLongBreak: boolean;
}

export interface Settings {
  isDarkTheme: boolean;
  dailyGoal: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  notifications: boolean;
}

export interface ModalState {
  showHistory: boolean;
  showInfo: boolean;
  showSettings: boolean;
}