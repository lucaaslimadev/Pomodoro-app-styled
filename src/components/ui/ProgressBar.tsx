import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  isDarkTheme: boolean;
  label: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  isDarkTheme,
  label,
}) => {
  const progress = Math.min((current / total) * 100, 100);

  return (
    <div className="mt-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-medium ${
          isDarkTheme ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {label}
        </span>
        <span className={`text-sm font-medium ${
          isDarkTheme ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {current}/{total}
        </span>
      </div>
      <div className={`w-full bg-gray-200 rounded-full h-3 ${
        isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        <div 
          className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};