import React, { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  errorMessage,
  required = false,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const hasError = Boolean(errorMessage);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-sbloom-text-main tracking-wide"
        >
          {label}
          {required && <span className="text-sbloom-magenta ml-1" title="Required field">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sbloom-text-secondary">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          className={`block w-full rounded-xl text-sm bg-white border transition-colors duration-150 placeholder:text-sbloom-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-sbloom-surface/50 disabled:cursor-not-allowed ${
            leftIcon ? 'pl-10' : 'pl-3.5'
          } ${rightIcon ? 'pr-10' : 'pr-3.5'} py-2.5 ${
            hasError
              ? 'border-red-400 text-red-900 focus:ring-red-400 focus:border-red-400'
              : 'border-sbloom-border text-sbloom-text-main focus:ring-sbloom-violet focus:border-sbloom-violet hover:border-sbloom-violet/40'
          } ${className}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-sbloom-text-secondary">
            {rightIcon}
          </div>
        )}
      </div>

      {hasError ? (
        <div id={`${inputId}-error`} className="flex items-center space-x-1 text-xs text-red-600 font-medium">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="text-[11px] text-sbloom-text-secondary">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
