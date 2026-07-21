import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

export interface ContainerProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'wide' | 'narrow' | 'fluid' | 'full';
  as?: React.ElementType;
}

export function Container({
  className,
  variant = 'default',
  as: Component = 'div',
  children,
  ...props
}: ContainerProps) {
  const variantClasses = {
    default: 'max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8',
    wide: 'max-w-[1400px] mx-auto px-4 md:px-8',
    narrow: 'max-w-[768px] mx-auto px-4',
    fluid: 'w-full max-w-none px-4 sm:px-6 lg:px-8',
    full: 'w-full max-w-none p-0',
  };

  return (
    <Component className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Component>
  );
}
