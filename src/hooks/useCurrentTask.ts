import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants';
import { getStorageItem, setStorageItem } from '../utils/storage';

export const useCurrentTask = () => {
  const [currentTask, setCurrentTask] = useState<string>(
    getStorageItem(STORAGE_KEYS.CURRENT_TASK, '')
  );

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.CURRENT_TASK, currentTask);
  }, [currentTask]);

  return {
    currentTask,
    setCurrentTask,
  };
};