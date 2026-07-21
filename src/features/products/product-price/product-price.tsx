'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

interface ProductPriceProps extends BaseComponentProps {
  price: number;
  oldPrice?: number;
}

export function ProductPrice({ price, oldPrice, className }: ProductPriceProps) {
  const formatTaka = (amount: number) => {
    return `Tk ${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className={cn('flex items-baseline gap-2 font-display text-sm font-bold', className)}>
      <span className="text-foreground">{formatTaka(price)}</span>
      {oldPrice && (
        <span className="text-xs text-stone-450 line-through font-normal">
          {formatTaka(oldPrice)}
        </span>
      )}
    </div>
  );
}
export default ProductPrice;
