import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

export interface CodeProps extends BaseComponentProps, React.HTMLAttributes<HTMLElement> {}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(
          'font-mono text-sm bg-muted text-foreground px-1.5 py-0.5 rounded border border-border font-medium',
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  }
);

Code.displayName = 'Code';
