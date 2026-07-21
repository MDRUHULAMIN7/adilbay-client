import React, { useState } from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

export interface AvatarProps extends BaseComponentProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'none';
}

const sizes = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
};

const indicatorSizes = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-4 w-4',
};

function getInitials(name = ''): string {
  const parts = name.trim().split(' ');
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function Avatar({
  className,
  src,
  alt = '',
  name = '',
  size = 'md',
  status = 'none',
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const hasImage = src && !imageError;
  const initials = getInitials(name);

  return (
    <div className={cn('relative inline-block shrink-0', className)} {...props}>
      <div
        className={cn(
          'flex items-center justify-center rounded-full overflow-hidden border border-border bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-semibold select-none',
          sizes[size]
        )}
      >
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || name}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{initials || '?'}</span>
        )}
      </div>

      {status !== 'none' && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-background',
            status === 'online' ? 'bg-success' : 'bg-stone-400',
            indicatorSizes[size]
          )}
          data-testid="avatar-status"
        />
      )}
    </div>
  );
}
