import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

export interface SpinnerProps extends BaseComponentProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'current';
}

const sizes = {
  xs: 'h-3 w-3 border',
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-3',
  xl: 'h-12 w-12 border-4',
};

const colors = {
  primary: 'border-primary border-t-transparent',
  secondary: 'border-secondary border-t-transparent',
  current: 'border-current border-t-transparent',
};

export function Spinner({ className, size = 'md', color = 'primary', ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      className={cn(
        'animate-spin rounded-full border-solid',
        sizes[size],
        colors[color],
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
