export const TIMER_CONSTANTS = {
  FOCUS_SECONDS: 25 * 60,
  DEFAULT_SHORT_BREAK: 5,
  DEFAULT_LONG_BREAK: 25,
  DEFAULT_DAILY_GOAL: 8,
  MAX_CYCLES: 4,
} as const;

export const STORAGE_KEYS = {
  THEME: 'chronos-theme',
  CYCLES: 'chronos-cycles',
  BREAK_TIME: 'chronos-break-time',
  LONG_BREAK: 'chronos-long-break',
  SHORT_BREAK: 'chronos-short-break',
  CURRENT_TASK: 'chronos-current-task',
  DAILY_GOAL: 'chronos-daily-goal',
} as const;

export const PROGRESS_CONSTANTS = {
  CIRCLE_RADIUS: 120,
  CIRCUMFERENCE: 2 * Math.PI * 120,
} as const;