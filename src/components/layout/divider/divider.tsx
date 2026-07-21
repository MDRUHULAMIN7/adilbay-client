import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

export interface DividerProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({
  className,
  orientation = 'horizontal',
  ...props
}: DividerProps) {
  return (
    <div
      role="separator"
      className={cn(
        orientation === 'horizontal'
          ? 'w-full border-t border-border/80'
          : 'h-full border-l border-border/80',
        className
      )}
      {...props}
    />
  );
}
