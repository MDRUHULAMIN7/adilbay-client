'use client';

import React from 'react';
import { FiltersSidebar } from './filters-sidebar';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface MobileFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
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

export function MobileFiltersDrawer({
  isOpen,
  onClose,
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
}: MobileFiltersDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
      <div
        className="fixed inset-y-0 left-0 w-full max-w-xs bg-background text-foreground shadow-2xl p-6 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-left duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border/40">
            <span className="font-display font-bold text-lg text-foreground uppercase tracking-tight">
              Filter Products
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-stone-500 hover:text-foreground hover:bg-muted cursor-pointer transition-colors"
              aria-label="Close filters"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          {/* Filters List */}
          <FiltersSidebar
            categories={categories}
            materials={materials}
            colors={colors}
            availability={availability}
            priceRange={priceRange}
            toggleCategory={toggleCategory}
            toggleMaterial={toggleMaterial}
            toggleColor={toggleColor}
            toggleAvailability={toggleAvailability}
            setPriceRange={setPriceRange}
            resetFilters={resetFilters}
          />
        </div>

        {/* Apply CTA */}
        <div className="pt-6 border-t border-border/40 mt-6 sticky bottom-0 bg-background pb-2">
          <Button
            variant="brand"
            onClick={onClose}
            className="w-full font-bold text-xs uppercase tracking-wider py-3 rounded-xl cursor-pointer"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
export default MobileFiltersDrawer;
