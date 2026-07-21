import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

export interface SpacerProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export function Spacer({
  className,
  size = 'md',
  ...props
}: SpacerProps) {
  const sizeClasses = {
    xs: 'h-2',
    sm: 'h-4',
    md: 'h-8',
    lg: 'h-12',
    xl: 'h-16',
  };

  return (
    <div
      role="none"
      className={cn(sizeClasses[size], 'w-full shrink-0', className)}
      {...props}
    />
  );
}
