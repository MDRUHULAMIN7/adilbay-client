import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { ROUTES } from '@/constants/routes';

export interface LogoProps extends BaseComponentProps {
  variant?: 'full' | 'compact';
  themeMode?: 'light' | 'dark' | 'system';
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({
  className,
  variant = 'full',
  themeMode = 'system',
  size = 'md',
  ...props
}: LogoProps) {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  const iconSizes = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-9 w-9 text-base',
  };

  const themeClasses = {
    system: 'text-foreground',
    light: 'text-stone-900',
    dark: 'text-stone-50',
  };

  const badgeClasses = {
    system: 'bg-primary text-primary-foreground',
    light: 'bg-primary text-stone-50',
    dark: 'bg-stone-800 text-stone-100 border border-stone-700/60',
  };

  const textGradClasses = {
    system: 'text-foreground',
    light: 'text-stone-900',
    dark: 'text-stone-50',
  };

  return (
    <Link
      href={ROUTES.HOME}
      className={cn(
        'inline-flex items-center gap-2 font-display font-bold select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md',
        themeClasses[themeMode],
        sizeClasses[size],
        className
      )}
      aria-label="Furnixo home page"
      {...props}
    >
      <div
        className={cn(
          'rounded-md flex items-center justify-center font-semibold shrink-0 shadow-flat transition-all',
          badgeClasses[themeMode],
          iconSizes[size]
        )}
      >
        F
      </div>
      {variant === 'full' && (
        <span className={cn('tracking-tight font-semibold leading-none', textGradClasses[themeMode])}>
          Furnixo
        </span>
      )}
    </Link>
  );
}
export default Logo;
