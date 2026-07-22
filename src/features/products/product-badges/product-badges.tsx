'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

interface ProductBadgesProps extends BaseComponentProps {
  badge?: 'new' | 'sale' | 'hot' | 'featured';
  stockStatus?: 'in-stock' | 'low-stock' | 'pre-order' | 'back-order' | 'out-of-stock';
  discountPercent?: number;
}

export function ProductBadges({ badge, stockStatus, discountPercent, className }: ProductBadgesProps) {
  return (
    <div className={cn('absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none select-none', className)}>
      {stockStatus === 'out-of-stock' && (
        <span className="text-[10px] sm:text-xs font-bold bg-destructive text-white px-2.5 py-1 rounded-none uppercase tracking-wider shadow-xs">
          Sold Out
        </span>
      )}
      {stockStatus === 'pre-order' && (
        <span className="text-[10px] sm:text-xs font-bold bg-info text-white px-2.5 py-1 rounded-none uppercase tracking-wider shadow-xs">
          Pre Order
        </span>
      )}
      {stockStatus === 'back-order' && (
        <span className="text-[10px] sm:text-xs font-bold bg-stone-600 text-white px-2.5 py-1 rounded-none uppercase tracking-wider shadow-xs">
          Back Order
        </span>
      )}
      {stockStatus === 'low-stock' && (
        <span className="text-[10px] sm:text-xs font-bold bg-warning text-white px-2.5 py-1 rounded-none uppercase tracking-wider shadow-xs">
          Low Stock
        </span>
      )}
      {badge === 'sale' && discountPercent && (
        <span className="text-[10px] sm:text-xs font-bold bg-primary text-white px-2.5 py-1 rounded-none uppercase tracking-wider shadow-xs">
          -{discountPercent}%
        </span>
      )}
      {badge === 'new' && (
        <span className="text-[10px] sm:text-xs font-bold bg-[#0096eb] text-white px-2.5 py-1 rounded-none uppercase tracking-wider shadow-xs">
          New
        </span>
      )}
      {badge === 'hot' && (
        <span className="text-[10px] sm:text-xs font-bold bg-destructive text-white px-2.5 py-1 rounded-none uppercase tracking-wider shadow-xs">
          Hot
        </span>
      )}
    </div>
  );
}
export default ProductBadges;
