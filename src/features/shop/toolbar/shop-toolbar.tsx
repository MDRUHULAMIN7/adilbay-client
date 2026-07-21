'use client';

import React from 'react';
import { SHOP_FILTERS } from '@/config/shop-filters';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

interface ShopToolbarProps {
  totalCount: number;
  sort: string;
  setSort: (val: string) => void;
  gridCols: 3 | 4;
  setGridCols: (cols: 3 | 4) => void;
}

export function ShopToolbar({
  totalCount,
  sort,
  setSort,
  gridCols,
  setGridCols,
}: ShopToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-b border-border/40 w-full mb-6 text-xs font-semibold">
      {/* Product Count */}
      <div className="text-stone-500 select-none">
        Showing <span className="font-bold text-foreground">{totalCount}</span> pieces in catalog
      </div>

      {/* Grid density & Sort select */}
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
        {/* Desktop density options */}
        <div className="hidden md:flex items-center gap-1.5 border-r border-border/40 pr-4">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setGridCols(3)}
            className={cn(
              'h-8 w-8 p-0 rounded cursor-pointer flex items-center justify-center',
              gridCols === 3 && 'bg-stone-100 dark:bg-stone-900 text-primary'
            )}
            aria-label="3 Column Grid View"
          >
            <Icon name="menu" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setGridCols(4)}
            className={cn(
              'h-8 w-8 p-0 rounded cursor-pointer flex items-center justify-center',
              gridCols === 4 && 'bg-stone-100 dark:bg-stone-900 text-primary'
            )}
            aria-label="4 Column Grid View"
          >
            <Icon name="laptop" className="h-4 w-4" />
          </Button>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-stone-500 whitespace-nowrap">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-background border border-border/80 text-foreground py-1.5 px-3 rounded-lg text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 cursor-pointer"
          >
            {SHOP_FILTERS.sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
export default ShopToolbar;
