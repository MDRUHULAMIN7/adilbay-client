import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { Icon } from './icon';

export interface CheckboxProps
  extends BaseComponentProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  isError?: boolean;
  errorMessage?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, isError = false, errorMessage, disabled, id, ...props }, ref) => {
    const checkboxId = id || React.useId();
    const errorId = `${checkboxId}-error`;

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        <label
          htmlFor={checkboxId}
          className={cn(
            'inline-flex items-start gap-3 select-none cursor-pointer',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <div className="relative flex items-center mt-0.5">
            <input
              type="checkbox"
              id={checkboxId}
              ref={ref}
              disabled={disabled}
              className="peer sr-only"
              aria-invalid={isError}
              aria-describedby={isError && errorMessage ? errorId : undefined}
              {...props}
            />
            <div
              className={cn(
                'flex items-center justify-center h-5 w-5 rounded border border-border bg-background transition-all duration-150',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
                'peer-checked:bg-primary peer-checked:border-primary peer-checked:[&>svg]:scale-100 peer-checked:[&>svg]:opacity-100',
                isError && 'border-destructive peer-checked:bg-destructive peer-checked:border-destructive'
              )}
            >
              <Icon
                name="Check"
                className="h-3.5 w-3.5 text-primary-foreground stroke-[3px] scale-0 opacity-0 transition-all duration-100"
              />
            </div>
          </div>
          {(label || description) && (
            <div className="flex flex-col">
              {label && (
                <span className="text-sm font-medium text-foreground leading-none mb-1">
                  {label}
                </span>
              )}
              {description && (
                <span className="text-xs text-muted-foreground leading-normal">
                  {description}
                </span>
              )}
            </div>
          )}
        </label>
        {isError && errorMessage && (
          <p id={errorId} role="alert" className="text-xs font-medium text-destructive ml-8">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
