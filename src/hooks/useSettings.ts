import { useState, useEffect } from 'react';
import { Settings } from '../types';
import { TIMER_CONSTANTS, STORAGE_KEYS } from '../constants';
import { getStorageItem, setStorageItem } from '../utils/storage';

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    isDarkTheme: getStorageItem(STORAGE_KEYS.THEME, true),
    dailyGoal: getStorageItem(STORAGE_KEYS.DAILY_GOAL, TIMER_CONSTANTS.DEFAULT_DAILY_GOAL),
    shortBreakMinutes: getStorageItem(STORAGE_KEYS.SHORT_BREAK, TIMER_CONSTANTS.DEFAULT_SHORT_BREAK),
    longBreakMinutes: getStorageItem(STORAGE_KEYS.LONG_BREAK, TIMER_CONSTANTS.DEFAULT_LONG_BREAK),
    notifications: true,
  });

  // Apply theme to document body
  useEffect(() => {
    document.body.className = settings.isDarkTheme 
      ? 'bg-gray-900 text-white' 
      : 'bg-white text-black';
    setStorageItem(STORAGE_KEYS.THEME, settings.isDarkTheme);
  }, [settings.isDarkTheme]);

  // Save settings to localStorage
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.DAILY_GOAL, settings.dailyGoal);
  }, [settings.dailyGoal]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.SHORT_BREAK, settings.shortBreakMinutes);
  }, [settings.shortBreakMinutes]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.LONG_BREAK, settings.longBreakMinutes);
  }, [settings.longBreakMinutes]);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleTheme = () => {
    updateSetting('isDarkTheme', !settings.isDarkTheme);
  };

  return {
    ...settings,
    updateSetting,
    toggleTheme,
  };
};