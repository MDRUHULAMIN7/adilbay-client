'use client';

import React, { useState } from 'react';
import { useProductFilters } from '@/hooks/useProductFilters';
import { FiltersSidebar } from './filters';
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

  return (
    <Container variant="wide" className="py-10 flex flex-col gap-6 text-left">
      {/* Header Info */}
      <div className="flex flex-col gap-1.5 border-b border-border/40 pb-6">
        <Heading
          level={1}
          variant="display"
          className="text-2xl sm:text-3xl font-bold font-display text-foreground uppercase tracking-tight"
        >
          {title}
        </Heading>
        <Text className="text-stone-500 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {description}
        </Text>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start pt-4 w-full">
        {/* Left Filters Sidebar */}
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

        {/* Right Catalog View */}
        <div className="flex-1 flex flex-col w-full">
          {/* Toolbar */}
          <ShopToolbar
            totalCount={totalCount}
            sort={sort}
            setSort={setSort}
            gridCols={gridCols}
            setGridCols={setGridCols}
          />

          {loading ? (
            /* Loading Skeleton Grid */
            <div
              className={cn(
                'grid gap-6 w-full grid-cols-1 sm:grid-cols-2',
                gridCols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-4'
              )}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            /* Empty State */
            <NoProducts onReset={resetFilters} />
          ) : (
            /* Products Grid */
            <div className="flex flex-col gap-10 w-full">
              <div
                className={cn(
                  'grid gap-6 w-full grid-cols-1 sm:grid-cols-2',
                  gridCols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-4'
                )}
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 border-t border-border/40 pt-8 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="flex items-center gap-1 text-xs cursor-pointer rounded-lg px-3 py-2"
                  >
                    <Icon name="chevronLeft" className="h-3.5 w-3.5" />
                    <span>Prev</span>
                  </Button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = page === pageNum;
                    return (
                      <Button
                        key={pageNum}
                        variant={isActive ? 'brand' : 'outline'}
                        size="sm"
                        onClick={() => setPage(pageNum)}
                        className={cn(
                          'h-9 w-9 rounded-lg font-bold text-xs cursor-pointer flex items-center justify-center',
                          isActive && 'shadow-flat'
                        )}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="flex items-center gap-1 text-xs cursor-pointer rounded-lg px-3 py-2"
                  >
                    <span>Next</span>
                    <Icon name="chevronRight" className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
export default ShopView;
