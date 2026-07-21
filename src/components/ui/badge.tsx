import React from 'react';
import { BaseComponentProps } from '@/types/component';
import { badgeVariants, BadgeVariant } from '@/lib/variants';

export interface BadgeProps extends BaseComponentProps, React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
  return (
    <span
      className={badgeVariants({ variant, className })}
      {...props}
    />
  );
}
