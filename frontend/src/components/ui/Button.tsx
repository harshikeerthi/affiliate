import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'lime' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none motion-reduce:transform-none';

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-2.5 text-base gap-2.5',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-sbloom-violet text-white hover:bg-sbloom-violet-dark focus:ring-sbloom-violet shadow-sm hover:shadow-violet-glow',
    secondary: 'bg-sbloom-surface text-sbloom-text-main hover:bg-[#ebd9c7] border border-sbloom-border focus:ring-sbloom-border',
    outline: 'bg-transparent text-sbloom-text-main border border-sbloom-border hover:bg-sbloom-surface focus:ring-sbloom-border',
    ghost: 'bg-transparent text-sbloom-text-secondary hover:text-sbloom-text-main hover:bg-black/5 focus:ring-black/10',
    lime: 'bg-sbloom-lime text-sbloom-text-main hover:bg-sbloom-lime-dark font-semibold focus:ring-sbloom-lime shadow-sm',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-sm',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin motion-reduce:animate-none" />
      ) : leftIcon ? (
        <span className="flex-shrink-0">{leftIcon}</span>
      ) : null}
      
      <span>{children}</span>

      {!isLoading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};
