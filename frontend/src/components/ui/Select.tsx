import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  helperText,
  errorMessage,
  required = false,
  options,
  className = '',
  id,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const hasError = Boolean(errorMessage);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-sbloom-text-main tracking-wide"
        >
          {label}
          {required && <span className="text-sbloom-magenta ml-1">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        <select
          ref={ref}
          id={selectId}
          className={`block w-full appearance-none rounded-xl text-sm bg-white border py-2.5 pl-3.5 pr-10 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-sbloom-surface/50 disabled:cursor-not-allowed ${
            hasError
              ? 'border-red-400 text-red-900 focus:ring-red-400 focus:border-red-400'
              : 'border-sbloom-border text-sbloom-text-main focus:ring-sbloom-violet focus:border-sbloom-violet hover:border-sbloom-violet/40'
          } ${className}`}
          aria-invalid={hasError}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-sbloom-text-secondary">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {hasError ? (
        <div className="flex items-center space-x-1 text-xs text-red-600 font-medium">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : helperText ? (
        <p className="text-[11px] text-sbloom-text-secondary">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';
