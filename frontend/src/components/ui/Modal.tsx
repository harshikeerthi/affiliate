import React, { useEffect, ReactNode } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'primary' | 'danger';
  isLoading?: boolean;
  children?: ReactNode;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  isLoading = false,
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-modal="true" role="dialog">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
        />

        {/* Dialog Box */}
        <div className="relative w-full max-w-md transform overflow-hidden rounded-3xl bg-white border border-sbloom-border p-6 text-left shadow-2xl transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {variant === 'danger' && (
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              )}
              <h3 className="font-fraunces text-lg font-bold text-sbloom-text-main">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-sbloom-text-secondary hover:text-sbloom-text-main p-1.5 rounded-xl hover:bg-sbloom-surface transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-sbloom-text-secondary leading-relaxed mb-6">
            {description}
          </p>

          {children && <div className="mb-6">{children}</div>}

          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelLabel}
            </Button>
            <Button
              variant={variant === 'danger' ? 'danger' : 'primary'}
              size="sm"
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
