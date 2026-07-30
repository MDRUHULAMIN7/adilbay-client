'use client';

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

export interface TrustBadgeItem {
  icon: string;
  title: string;
  description: string;
}

export interface TrustBadgesProps {
  className?: string;
  items?: TrustBadgeItem[];
}

const defaultBadges: TrustBadgeItem[] = [
  {
    icon: 'truck',
    title: 'Countrywide Delivery',
    description: 'Free delivery on orders above 50,000 Tk',
  },
  {
    icon: 'shieldCheck',
    title: '10-Year Warranty',
    description: 'Covers structural seasoning defects',
  },
  {
    icon: 'rotateCcw',
    title: '7-Day Easy Return',
    description: 'Hassle-free replacement policy',
  },
];

export function TrustBadges({ className, items = defaultBadges }: TrustBadgesProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-stone-200/80 dark:border-stone-800 py-6 text-left w-full items-stretch',
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-start gap-3.5 p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 h-full transition-colors hover:border-primary/40"
        >
          <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary shrink-0 mt-0.5">
            <Icon name={item.icon} className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <span className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 leading-snug">
              {item.title}
            </span>
            <span className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {item.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrustBadges;
