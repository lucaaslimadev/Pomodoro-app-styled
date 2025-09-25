import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  title?: string;
  className?: string;
}

const variantClasses = {
  primary: 'bg-green-600 hover:bg-green-700',
  secondary: 'bg-gray-600 hover:bg-gray-700',
  success: 'bg-green-600 hover:bg-green-700',
  info: 'bg-blue-600 hover:bg-blue-700',
  warning: 'bg-orange-600 hover:bg-orange-700',
  danger: 'bg-red-600 hover:bg-red-700',
};

const sizeClasses = {
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  title,
  className = '',
}) => {
  const baseClasses = 'rounded-lg shadow-lg text-white font-medium transition-all duration-200';
  const variantClass = disabled ? 'bg-gray-400' : variantClasses[variant];
  const sizeClass = sizeClasses[size];
  const hoverClass = disabled ? '' : 'transform hover:scale-105';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${hoverClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};