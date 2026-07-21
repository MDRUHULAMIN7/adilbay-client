import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { Icon } from './icon';

export interface SelectProps
  extends BaseComponentProps,
    React.SelectHTMLAttributes<HTMLSelectElement> {
  validationState?: 'success' | 'warning' | 'error' | 'default';
  errorMessage?: string;
  helperText?: string;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      validationState = 'default',
      errorMessage,
      helperText,
      placeholder,
      disabled,
      children,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || React.useId();
    const helperId = `${selectId}-helper`;
    const errorId = `${selectId}-error`;

    const stateStyles = {
      default: 'border-border focus:ring-ring',
      success: 'border-success focus:ring-success',
      warning: 'border-warning focus:ring-warning',
      error: 'border-destructive focus:ring-destructive',
    };

    return (
      <div className={cn('flex flex-col gap-1.5 w-full', className)}>
        <div className="relative w-full rounded-lg shadow-flat">
          <select
            id={selectId}
            ref={ref}
            disabled={disabled}
            defaultValue={placeholder ? "" : undefined}
            aria-describedby={
              errorMessage ? errorId : helperText ? helperId : undefined
            }
            aria-invalid={validationState === 'error'}
            className={cn(
              'flex h-10 w-full rounded-lg border bg-background px-3 py-2 pr-10 text-base transition-colors appearance-none focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              stateStyles[validationState]
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground pointer-events-none">
            <Icon name="ChevronDown" className="h-4 w-4" />
          </div>
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

Select.displayName = 'Select';
