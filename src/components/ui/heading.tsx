import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

export interface HeadingProps extends BaseComponentProps, React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'display' | 'default' | 'muted';
}

const levelStyles = {
  1: 'text-4xl font-display font-semibold tracking-tight sm:text-5xl',
  2: 'text-3xl font-display font-semibold tracking-tight sm:text-4xl',
  3: 'text-2xl font-sans font-semibold tracking-tight sm:text-3xl',
  4: 'text-xl font-sans font-medium tracking-tight sm:text-2xl',
  5: 'text-lg font-sans font-medium',
  6: 'text-base font-sans font-medium',
};

const variantStyles = {
  display: 'font-display font-bold tracking-tight text-foreground',
  default: 'text-foreground',
  muted: 'text-muted-foreground',
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 1, variant = 'default', className, children, ...props }, ref) => {
    const Tag = `h${level}` as const;

    return (
      <Tag
        ref={ref}
        className={cn(
          levelStyles[level],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = 'Heading';
