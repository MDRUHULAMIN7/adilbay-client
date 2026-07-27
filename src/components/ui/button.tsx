import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { buttonVariants, ButtonVariant, ButtonSize } from '@/lib/variants';
import { Icon } from './icon';

export interface ButtonProps
  extends BaseComponentProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={buttonVariants({ variant, size, fullWidth, className })}
        {...props}
      >
        {loading && (
          <Icon
            name="Spinner"
            className="h-4 w-4 animate-spin text-current"
            aria-hidden="true"
          />
        )}
        {!loading && leftIcon && (
          <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span className={cn('inline-flex items-center justify-center gap-2.5 whitespace-nowrap', loading && 'opacity-80')}>{children}</span>
        {!loading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
