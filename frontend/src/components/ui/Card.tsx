import React, { ReactNode, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'canvas' | 'surface' | 'dark' | 'outline';
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'canvas',
  hoverable = false,
  padding = 'md',
  children,
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const variantStyles = {
    canvas: 'bg-white border border-sbloom-border shadow-sbloom text-sbloom-text-main',
    surface: 'bg-sbloom-surface border border-sbloom-border text-sbloom-text-main',
    dark: 'bg-sbloom-admin border border-white/10 text-white shadow-lg',
    outline: 'bg-transparent border border-sbloom-border text-sbloom-text-main',
  };

  const hoverClass = hoverable
    ? 'transition-all duration-200 hover:shadow-sbloom-hover hover:-translate-y-0.5 motion-reduce:transform-none'
    : '';

  return (
    <div
      className={`rounded-2xl ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
