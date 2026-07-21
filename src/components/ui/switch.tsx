import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

export interface SwitchProps extends BaseComponentProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  label?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked = false, onChange, disabled = false, id, label, ...props }, ref) => {
    const switchId = id || React.useId();

    const handleToggle = () => {
      if (disabled) return;
      if (onChange) onChange(!checked);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleToggle();
      }
    };

    return (
      <div className="flex items-center gap-3">
        <button
          id={switchId}
          ref={ref}
          role="switch"
          aria-checked={checked}
          aria-label={label}
          disabled={disabled}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={cn(
            'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            checked ? 'bg-primary' : 'bg-stone-200 dark:bg-stone-700',
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
          {...props}
        >
          <motion.span
            layout
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
            className={cn(
              'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-flat',
              checked ? 'translate-x-5' : 'translate-x-0'
            )}
          />
        </button>
        {label && (
          <label
            htmlFor={switchId}
            className={cn('text-sm font-medium text-foreground cursor-pointer select-none', disabled && 'cursor-not-allowed opacity-50')}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
