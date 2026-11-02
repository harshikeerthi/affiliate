import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  helperText,
  errorMessage,
  required = false,
  className = '',
  rows = 3,
  id,
  ...props
}, ref) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const hasError = Boolean(errorMessage);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-xs font-semibold text-sbloom-text-main tracking-wide"
        >
          {label}
          {required && <span className="text-sbloom-magenta ml-1">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`block w-full rounded-xl text-sm bg-white border p-3 transition-colors duration-150 placeholder:text-sbloom-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-sbloom-surface/50 disabled:cursor-not-allowed ${
            hasError
              ? 'border-red-400 text-red-900 focus:ring-red-400 focus:border-red-400'
              : 'border-sbloom-border text-sbloom-text-main focus:ring-sbloom-violet focus:border-sbloom-violet hover:border-sbloom-violet/40'
          } ${className}`}
          aria-invalid={hasError}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
