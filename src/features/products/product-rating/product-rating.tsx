'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { Icon } from '@/components/ui/icon';

interface ProductRatingProps extends BaseComponentProps {
  rating: number;
  reviewsCount?: number;
  showText?: boolean;
}

export function ProductRating({ rating, reviewsCount = 0, showText = true, className }: ProductRatingProps) {
  const fullStars = Math.floor(rating);

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex gap-0.5 text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < fullStars) {
            return <Icon key={i} name="star" className="h-3 w-3 fill-amber-500 text-amber-500" />;
          }
          return <Icon key={i} name="star" className="h-3 w-3 text-stone-350 dark:text-stone-700" />;
        })}
      </div>
      {showText && reviewsCount > 0 && (
        <span className="text-[10px] text-stone-500 font-semibold select-none">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
}
export default ProductRating;
