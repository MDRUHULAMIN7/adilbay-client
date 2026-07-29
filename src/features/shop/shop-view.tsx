'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductFilters } from '@/hooks/useProductFilters';
import { FiltersSidebar, MobileFiltersDrawer } from './filters';
import { ShopToolbar } from './toolbar';
import { ProductCard, ProductCardSkeleton } from '@/features/products';
import { NoProducts } from '@/features/empty-states';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

interface ShopViewProps {
  initialCategory?: string;
  initialBrand?: string;
  title?: string;
  description?: string;
}

export function ShopView({
  initialCategory,
  initialBrand,
  title = 'Design Catalog',
  description = 'Browse seasoned woodcraft creations, engineered to fit contemporary home layouts.',
}: ShopViewProps) {
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isDesktopFiltersOpen, setIsDesktopFiltersOpen] = useState(true);

  const {
    products,
    totalCount,
    totalPages,
    page,
    setPage,
    loading,
    filters,
    toggleCategory,
    toggleMaterial,
    toggleColor,
    toggleAvailability,
    setPriceRange,
    sort,
    setSort,
    resetFilters,
  } = useProductFilters(initialCategory, initialBrand);

  const activeFiltersCount =
    filters.categories.length +
    filters.materials.length +
    filters.colors.length +
    filters.availability.length +
    (filters.priceRange ? 1 : 0);

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Top Navbar Offset Padding Container */}
      <Container variant="wide" className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 flex flex-col text-left w-full">
        {/* Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 dark:border-stone-800 pb-6">
          <div className="flex flex-col gap-1">
            <Heading
              level={1}
              variant="display"
              className="text-2xl sm:text-3xl font-extrabold font-display text-foreground tracking-tight"
            >
              {title}
            </Heading>
            <Text className="text-stone-500 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {description}
            </Text>
          </div>

          {/* Desktop Filter Sidebar Toggle Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDesktopFiltersOpen((prev) => !prev)}
              className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer shadow-sm hover:border-primary transition-all"
            >
              <Icon name="filter" className="h-4 w-4 text-primary" />
              <span>{isDesktopFiltersOpen ? 'Hide Filters' : 'Show Filters'}</span>
              {activeFiltersCount > 0 && (
                <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold ml-1">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Filter Action Button */}
        <div className="flex lg:hidden items-center justify-between pt-4 pb-2 border-b border-stone-200/80 dark:border-stone-800">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
          >
            <Icon name="filter" className="h-4 w-4 text-primary" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold ml-1">
                {activeFiltersCount}
              </span>
            )}
          </Button>

          <span className="text-xs text-stone-500 font-semibold">{totalCount} Pieces</span>
        </div>

        {/* Main Catalog View Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start pt-6 w-full">
          {/* Animated Desktop Filters Sidebar */}
          <AnimatePresence initial={false}>
            {isDesktopFiltersOpen && (
              <motion.aside
                initial={{ opacity: 0, width: 0, marginRight: 0 }}
                animate={{ opacity: 1, width: '256px', marginRight: 0 }}
                exit={{ opacity: 0, width: 0, marginRight: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block shrink-0 overflow-hidden"
              >
                <div className="w-64">
                  <FiltersSidebar
                    categories={filters.categories}
                    materials={filters.materials}
                    colors={filters.colors}
                    availability={filters.availability}
                    priceRange={filters.priceRange}
                    toggleCategory={toggleCategory}
                    toggleMaterial={toggleMaterial}
                    toggleColor={toggleColor}
                    toggleAvailability={toggleAvailability}
                    setPriceRange={setPriceRange}
                    resetFilters={resetFilters}
                  />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Right Product Grid */}
          <div className="flex-1 w-full flex flex-col gap-6">
            {/* Toolbar */}
            <ShopToolbar
              totalCount={totalCount}
              sort={sort}
              setSort={setSort}
              gridCols={gridCols}
              setGridCols={setGridCols}
            />

            {/* Products Grid */}
            {loading ? (
              <div
                className={cn(
                  'grid gap-6 w-full',
                  gridCols === 4
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                )}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <NoProducts onReset={resetFilters} />
            ) : (
              <div
                className={cn(
                  'grid gap-6 w-full animate-in fade-in duration-300',
                  gridCols === 4
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                )}
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8 border-t border-stone-200/80 dark:border-stone-800 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="flex items-center gap-1 text-xs font-bold cursor-pointer rounded-xl"
                >
                  <Icon name="chevronLeft" className="h-3.5 w-3.5" />
                  <span>Previous</span>
                </Button>

                <div className="flex items-center gap-1 px-3">
                  <span className="text-xs font-bold text-foreground">
                    Page {page} of {totalPages}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="flex items-center gap-1 text-xs font-bold cursor-pointer rounded-xl"
                >
                  <span>Next</span>
                  <Icon name="chevronRight" className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Slide-over Mobile Filters Drawer with Framer Motion Animations */}
        <MobileFiltersDrawer
          isOpen={isMobileFiltersOpen}
          onClose={() => setIsMobileFiltersOpen(false)}
          categories={filters.categories}
          materials={filters.materials}
          colors={filters.colors}
          availability={filters.availability}
          priceRange={filters.priceRange}
          toggleCategory={toggleCategory}
          toggleMaterial={toggleMaterial}
          toggleColor={toggleColor}
          toggleAvailability={toggleAvailability}
          setPriceRange={setPriceRange}
          resetFilters={resetFilters}
        />
      </Container>
    </div>
  );
}
export default ShopView;
