'use client';

import React from 'react';
import { SHOP_FILTERS } from '@/config/shop-filters';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

interface FiltersSidebarProps {
  categories: string[];
  materials: string[];
  colors: string[];
  availability: string[];
  priceRange: { min: number; max: number } | null;
  toggleCategory: (val: string) => void;
  toggleMaterial: (val: string) => void;
  toggleColor: (val: string) => void;
  toggleAvailability: (val: string) => void;
  setPriceRange: (range: { min: number; max: number } | null) => void;
  resetFilters: () => void;
}

export function FiltersSidebar({
  categories,
  materials,
  colors,
  availability,
  priceRange,
  toggleCategory,
  toggleMaterial,
  toggleColor,
  toggleAvailability,
  setPriceRange,
  resetFilters,
}: FiltersSidebarProps) {
  return (
    <div className="flex flex-col gap-6 w-full lg:w-64 bg-background pr-0 lg:pr-6 lg:border-r border-border/40 text-left shrink-0">
      <div className="flex items-center justify-between">
        <Heading level={3} className="font-display font-bold text-base text-foreground tracking-tight">
          Filters
        </Heading>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-primary hover:underline focus-visible:outline-none cursor-pointer"
        >
          Reset All
        </button>
      </div>

      <div className="h-px bg-border/40 w-full" />

      {/* Categories */}
      <div className="flex flex-col gap-3">
        <Heading level={4} className="font-display font-semibold text-xs text-foreground uppercase tracking-wider">
          Categories
        </Heading>
        <div className="flex flex-col gap-2">
          {SHOP_FILTERS.categories.map((cat) => {
            const checked = categories.includes(cat.value);
            return (
              <label
                key={cat.value}
                className="flex items-center gap-2.5 text-xs font-semibold text-stone-605 dark:text-stone-400 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(cat.value)}
                  className="rounded border-stone-300 text-primary focus:ring-primary h-3.5 w-3.5 cursor-pointer"
                />
                <span>{cat.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-border/40 w-full" />

      {/* Materials */}
      <div className="flex flex-col gap-3">
        <Heading level={4} className="font-display font-semibold text-xs text-foreground uppercase tracking-wider">
          Wood Materials
        </Heading>
        <div className="flex flex-col gap-2">
          {SHOP_FILTERS.materials.map((mat) => {
            const checked = materials.includes(mat.value);
            return (
              <label
                key={mat.value}
                className="flex items-center gap-2.5 text-xs font-semibold text-stone-605 dark:text-stone-400 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleMaterial(mat.value)}
                  className="rounded border-stone-300 text-primary focus:ring-primary h-3.5 w-3.5 cursor-pointer"
                />
                <span>{mat.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-border/40 w-full" />

      {/* Colors */}
      <div className="flex flex-col gap-3">
        <Heading level={4} className="font-display font-semibold text-xs text-foreground uppercase tracking-wider">
          Color Polish
        </Heading>
        <div className="flex flex-wrap gap-2">
          {SHOP_FILTERS.colors.map((col) => {
            const checked = colors.includes(col.name);
            return (
              <button
                key={col.name}
                onClick={() => toggleColor(col.name)}
                title={col.name}
                className={cn(
                  'h-7 w-7 rounded-full border border-border/85 relative cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
                  checked && 'ring-2 ring-primary ring-offset-1'
                )}
                style={{ backgroundColor: col.hex }}
              >
                {checked && <Icon name="check" className="h-3 w-3 text-white dark:text-black stroke-[3px]" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-border/40 w-full" />

      {/* Price Ranges */}
      <div className="flex flex-col gap-3">
        <Heading level={4} className="font-display font-semibold text-xs text-foreground uppercase tracking-wider">
          Price Range
        </Heading>
        <div className="flex flex-col gap-2">
          {SHOP_FILTERS.priceRanges.map((range) => {
            const checked = priceRange?.min === range.min && priceRange?.max === range.max;
            return (
              <label
                key={range.label}
                className="flex items-center gap-2.5 text-xs font-semibold text-stone-605 dark:text-stone-400 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="priceRange"
                  checked={checked}
                  onChange={() => setPriceRange({ min: range.min, max: range.max })}
                  className="rounded-full border-stone-300 text-primary focus:ring-primary h-3.5 w-3.5 cursor-pointer"
                />
                <span>{range.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-border/40 w-full" />

      {/* Availability */}
      <div className="flex flex-col gap-3">
        <Heading level={4} className="font-display font-semibold text-xs text-foreground uppercase tracking-wider">
          Availability
        </Heading>
        <div className="flex flex-col gap-2">
          {SHOP_FILTERS.availability.map((av) => {
            const checked = availability.includes(av.value);
            return (
              <label
                key={av.value}
                className="flex items-center gap-2.5 text-xs font-semibold text-stone-605 dark:text-stone-400 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAvailability(av.value)}
                  className="rounded border-stone-300 text-primary focus:ring-primary h-3.5 w-3.5 cursor-pointer"
                />
                <span>{av.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default FiltersSidebar;
