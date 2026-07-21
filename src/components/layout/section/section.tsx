import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

export interface SectionProps extends BaseComponentProps, React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'compact' | 'comfortable' | 'spacious';
  as?: React.ElementType;
}

export function Section({
  className,
  variant = 'default',
  as: Component = 'section',
  children,
  ...props
}: SectionProps) {
  const variantClasses = {
    default: 'py-12 md:py-16 lg:py-20',
    compact: 'py-6 md:py-8',
    comfortable: 'py-16 md:py-24',
    spacious: 'py-24 md:py-32 lg:py-40',
  };

  return (
    <Component className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Component>
  );
}
