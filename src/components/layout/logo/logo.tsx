import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  const iconSizes = {
    sm: 'h-7 w-7',
    md: 'h-8 w-8',
    lg: 'h-9 w-9',
  };

  const fullSizes = {
    sm: 'h-7 w-auto max-h-7',
    md: 'h-8 w-auto max-h-8',
    lg: 'h-9 w-auto max-h-9',
  };

  const isCompact = variant === 'compact';

  return (
    <Link
      href={ROUTES.HOME}
      className={cn(
        'inline-flex items-center select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md transition-opacity hover:opacity-90',
        className
      )}
      aria-label="AdilBay home page"
      {...props}
    >
      {isCompact ? (
        <Image
          src="/images/logo-icon.png"
          alt="AdilBay"
          width={36}
          height={36}
          className={cn('object-contain shrink-0', iconSizes[size])}
          priority
        />
      ) : themeMode === 'dark' ? (
        <Image
          src="/images/logo-white.png"
          alt="AdilBay"
          width={120}
          height={45}
          className={cn('object-contain shrink-0', fullSizes[size])}
          priority
        />
      ) : themeMode === 'light' ? (
        <Image
          src="/images/logo.png"
          alt="AdilBay"
          width={120}
          height={45}
          className={cn('object-contain shrink-0', fullSizes[size])}
          priority
        />
      ) : (
        <>
          <Image
            src="/images/logo.png"
            alt="AdilBay"
            width={120}
            height={45}
            className={cn('object-contain shrink-0 dark:hidden', fullSizes[size])}
            priority
          />
          <Image
            src="/images/logo-white.png"
            alt="AdilBay"
            width={120}
            height={45}
            className={cn('object-contain shrink-0 hidden dark:block', fullSizes[size])}
            priority
          />
        </>
      )}
      <span className="sr-only">AdilBay</span>
    </Link>
  );
}

export default Logo;
