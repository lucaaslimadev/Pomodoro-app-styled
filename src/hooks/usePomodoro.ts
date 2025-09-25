import { useState, useEffect, useRef, useCallback } from 'react';
import { Phase, PomodoroState } from '../types';
import { TIMER_CONSTANTS, STORAGE_KEYS } from '../constants';
import { getStorageItem, setStorageItem } from '../utils/storage';

export const usePomodoro = () => {
  const [state, setState] = useState<PomodoroState>({
    phase: 'focus',
    secondsLeft: TIMER_CONSTANTS.FOCUS_SECONDS,
    isRunning: false,
    cycle: 1,
    completedCycles: getStorageItem(STORAGE_KEYS.CYCLES, 0),
    isLongBreak: false,
  });

  const intervalRef = useRef<number | null>(null);
  const initialSecondsRef = useRef(TIMER_CONSTANTS.FOCUS_SECONDS);

  // Timer effect
  useEffect(() => {
    if (!state.isRunning) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setState(prev => ({ ...prev, secondsLeft: prev.secondsLeft - 1 }));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.isRunning]);

  // Save completed cycles to storage
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.CYCLES, state.completedCycles);
  }, [state.completedCycles]);

  // Update initial seconds reference
  useEffect(() => {
    if (state.phase === 'focus') {
      initialSecondsRef.current = TIMER_CONSTANTS.FOCUS_SECONDS;
    } else {
      initialSecondsRef.current = state.isLongBreak 
        ? TIMER_CONSTANTS.DEFAULT_LONG_BREAK * 60 
        : TIMER_CONSTANTS.DEFAULT_SHORT_BREAK * 60;
    }
  }, [state.phase, state.isLongBreak]);

  const finishPhase = useCallback((shortBreakMinutes: number) => {
    setState(prev => {
      if (prev.phase === 'focus') {
        return {
          ...prev,
          phase: 'break' as Phase,
          secondsLeft: shortBreakMinutes * 60,
          isRunning: false,
        };
      } else {
        return {
          ...prev,
          completedCycles: prev.completedCycles + 1,
          cycle: prev.cycle >= TIMER_CONSTANTS.MAX_CYCLES ? 1 : prev.cycle + 1,
          phase: 'focus' as Phase,
          secondsLeft: TIMER_CONSTANTS.FOCUS_SECONDS,
          isRunning: false,
        };
      }
    });
  }, []);

  const toggleTimer = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  }, []);

  const resetTimer = useCallback((shortBreakMinutes: number) => {
    setState(prev => {
      const newSeconds = prev.phase === 'focus' 
        ? TIMER_CONSTANTS.FOCUS_SECONDS 
        : shortBreakMinutes * 60;
      
      return {
        ...prev,
        isRunning: false,
        secondsLeft: newSeconds,
      };
    });
  }, []);

  const resetCycle = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: 'focus' as Phase,
      secondsLeft: TIMER_CONSTANTS.FOCUS_SECONDS,
      isRunning: false,
      isLongBreak: false,
    }));
  }, []);

  const startShortBreak = useCallback((shortBreakMinutes: number) => {
    setState(prev => ({
      ...prev,
      phase: 'break' as Phase,
      secondsLeft: shortBreakMinutes * 60,
      isRunning: true,
      isLongBreak: false,
    }));
  }, []);

  const startLongBreak = useCallback((longBreakMinutes: number) => {
    setState(prev => ({
      ...prev,
      phase: 'break' as Phase,
      secondsLeft: longBreakMinutes * 60,
      isRunning: true,
      isLongBreak: true,
    }));
  }, []);

  return {
    ...state,
    initialSeconds: initialSecondsRef.current,
    finishPhase,
    toggleTimer,
    resetTimer,
    resetCycle,
    startShortBreak,
    startLongBreak,
  };
};