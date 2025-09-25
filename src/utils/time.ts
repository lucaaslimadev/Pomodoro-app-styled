/**
 * Formats seconds into MM:SS format
 * @param seconds - Number of seconds to format
 * @returns Formatted time string (e.g., "25:00")
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
};

/**
 * Calculates progress percentage
 * @param current - Current seconds left
 * @param total - Total seconds
 * @returns Progress percentage (0-100)
 */
export const calculateProgress = (current: number, total: number): number => {
  return ((total - current) / total) * 100;
};

/**
 * Calculates stroke dash offset for circular progress
 * @param progress - Progress percentage (0-100)
 * @param circumference - Circle circumference
 * @returns Stroke dash offset value
 */
export const calculateStrokeDashOffset = (progress: number, circumference: number): number => {
  return circumference - (progress / 100) * circumference;
};