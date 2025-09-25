import React from 'react';
import { Phase } from '../../types';
import { PROGRESS_CONSTANTS } from '../../constants';
import { formatTime, calculateStrokeDashOffset } from '../../utils/time';

interface CircularProgressProps {
  secondsLeft: number;
  initialSeconds: number;
  phase: Phase;
  isRunning: boolean;
  isDarkTheme: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  secondsLeft,
  initialSeconds,
  phase,
  isRunning,
  isDarkTheme,
}) => {
  const progress = ((initialSeconds - secondsLeft) / initialSeconds) * 100;
  const strokeDashoffset = calculateStrokeDashOffset(progress, PROGRESS_CONSTANTS.CIRCUMFERENCE);

  return (
    <div className="relative flex items-center justify-center mb-4">
      <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 256 256">
        <circle
          cx="128"
          cy="128"
          r={PROGRESS_CONSTANTS.CIRCLE_RADIUS}
          stroke={isDarkTheme ? '#374151' : '#e5e7eb'}
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="128"
          cy="128"
          r={PROGRESS_CONSTANTS.CIRCLE_RADIUS}
          stroke={phase === 'focus' ? '#10b981' : '#3b82f6'}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={PROGRESS_CONSTANTS.CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <h2
          className={`text-6xl font-bold transition-all duration-300 ${
            phase === 'focus' 
              ? (isDarkTheme ? 'text-green-400' : 'text-green-600')
              : (isDarkTheme ? 'text-blue-400' : 'text-blue-600')
          } ${isRunning ? 'animate-pulse' : ''}`}
        >
          {formatTime(secondsLeft)}
        </h2>
      </div>
    </div>
  );
};