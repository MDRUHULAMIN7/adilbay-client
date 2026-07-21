import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

export interface InputProps
  extends BaseComponentProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  validationState?: 'success' | 'warning' | 'error' | 'default';
  helperText?: string;
  errorMessage?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      validationState = 'default',
      helperText,
      errorMessage,
      prefix,
      suffix,
      disabled,
      id,
      label,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const stateStyles = {
      default: 'border-border focus-visible:ring-ring',
      success: 'border-success focus-visible:ring-success',
      warning: 'border-warning focus-visible:ring-warning',
      error: 'border-destructive focus-visible:ring-destructive',
    };

    return (
      <div className={cn('flex flex-col gap-1.5 w-full', className)}>
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-foreground select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full rounded-lg shadow-flat">
          {prefix && (
            <div className="absolute left-3 flex items-center justify-center text-muted-foreground pointer-events-none">
              {prefix}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            aria-describedby={
              errorMessage ? errorId : helperText ? helperId : undefined
            }
            aria-invalid={validationState === 'error'}
            className={cn(
              'flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-base transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              prefix && 'pl-9',
              suffix && 'pr-9',
              stateStyles[validationState]
            )}
            {...props}
          />
          {suffix && (
            <div className="absolute right-3 flex items-center justify-center text-muted-foreground pointer-events-none">
              {suffix}
            </div>
          )}
        </div>
        {validationState === 'error' && errorMessage && (
          <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
            {errorMessage}
          </p>
        )}
        {validationState !== 'error' && helperText && (
          <p id={helperId} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
