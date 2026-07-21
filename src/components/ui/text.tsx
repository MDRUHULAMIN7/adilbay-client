import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

export interface TextProps extends BaseComponentProps, React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'large' | 'default' | 'small' | 'caption' | 'muted' | 'accent';
}

const variantStyles = {
  large: 'text-lg text-foreground md:text-xl',
  default: 'text-base text-foreground leading-relaxed',
  small: 'text-sm text-foreground',
  caption: 'text-xs tracking-wide text-muted-foreground',
  muted: 'text-sm text-muted-foreground leading-relaxed',
  accent: 'text-sm font-medium text-primary',
};

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = 'Text';
