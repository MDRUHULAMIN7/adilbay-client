import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

export interface SkeletonProps extends BaseComponentProps {
  variant?: 'text' | 'circle' | 'card' | 'image' | 'list' | 'rect';
  count?: number;
}

export function Skeleton({ className, variant = 'rect', count = 1, ...props }: SkeletonProps) {
  const baseClass = 'animate-pulse bg-stone-200 dark:bg-stone-800 rounded';

  const variants = {
    rect: 'w-full h-24',
    text: 'w-full h-4 mb-2 last:mb-0 last:w-[85%]',
    circle: 'rounded-full w-10 h-10 shrink-0',
    image: 'w-full h-48',
    card: 'w-full h-64 border border-border p-4 flex flex-col gap-4',
    list: 'w-full flex flex-col gap-3',
  };

  const renderSkeleton = (index: number) => {
    if (variant === 'list') {
      return (
        <div key={index} className="flex gap-4 items-center w-full">
          <div className={cn(baseClass, variants.circle)} />
          <div className="flex-1 flex flex-col gap-2">
            <div className={cn(baseClass, 'w-1/3 h-4')} />
            <div className={cn(baseClass, 'w-3/4 h-3')} />
          </div>
        </div>
      );
    }

    if (variant === 'card') {
      return (
        <div key={index} className="rounded-lg bg-background p-4 border border-border flex flex-col gap-4 shadow-flat">
          <div className={cn(baseClass, 'w-full h-36 rounded-md')} />
          <div className={cn(baseClass, 'w-1/2 h-5')} />
          <div className={cn(baseClass, 'w-3/4 h-3')} />
          <div className="flex justify-between items-center mt-auto">
            <div className={cn(baseClass, 'w-16 h-8')} />
            <div className={cn(baseClass, 'w-24 h-8')} />
          </div>
        </div>
      );
    }

    return (
      <div
        key={index}
        className={cn(baseClass, variants[variant], className)}
        {...props}
      />
    );
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => renderSkeleton(i))}
    </>
  );
}
