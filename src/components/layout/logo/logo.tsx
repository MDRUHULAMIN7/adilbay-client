import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { ROUTES } from '@/constants/routes';

export interface LogoProps extends BaseComponentProps {
  variant?: 'full' | 'compact';
  themeMode?: 'light' | 'dark' | 'system';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({
  className,
  variant = 'full',
  themeMode = 'system',
  size = 'md',
  ...props
}: LogoProps) {
  const iconSizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10 sm:h-11 sm:w-11',
    lg: 'h-12 w-12 sm:h-14 sm:w-14',
    xl: 'h-16 w-16',
  };

  const fullSizes = {
    sm: 'h-8 sm:h-9 w-auto max-h-9',
    md: 'h-10 sm:h-11 md:h-13 w-auto max-h-13',
    lg: 'h-12 sm:h-14 md:h-16 w-auto max-h-16',
    xl: 'h-16 sm:h-20 w-auto max-h-20',
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
          width={48}
          height={48}
          className={cn('object-contain shrink-0', iconSizes[size])}
          priority
        />
      ) : (
        <Image
          src="/images/logo.png"
          alt="AdilBay"
          width={180}
          height={68}
          className={cn('object-contain shrink-0', fullSizes[size])}
          priority
        />
      )}
      <span className="sr-only">AdilBay</span>
    </Link>
  );
}

export default Logo;
