/**
 * Safely gets an item from localStorage with JSON parsing
 * @param key - Storage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns Parsed value or default
 */
export const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Safely sets an item in localStorage with JSON stringification
 * @param key - Storage key
 * @param value - Value to store
 */
export const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};