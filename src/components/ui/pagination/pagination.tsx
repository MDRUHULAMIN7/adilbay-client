import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { Icon } from '../icon';

export interface PaginationProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export function Pagination({
  className,
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  ...props
}: PaginationProps) {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const getPageNumbers = () => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, 'ellipsis', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, 'ellipsis', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, 'ellipsis', ...middleRange, 'ellipsis', lastPageIndex];
    }

    return range(1, totalPages);
  };

  const pages = getPageNumbers();

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const buttonBase =
    'h-10 w-10 inline-flex items-center justify-center rounded-md border border-border text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer';

  return (
    <div
      role="navigation"
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-1.5', className)}
      {...props}
    >
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className={buttonBase}
      >
        <Icon name="ChevronLeft" className="h-4 w-4" />
      </button>

      {pages.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="h-10 w-10 inline-flex items-center justify-center text-sm font-medium text-muted-foreground select-none"
            >
              &bull;&bull;&bull;
            </span>
          );
        }

        const isCurrent = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            aria-current={isCurrent ? 'page' : undefined}
            aria-label={`Go to page ${page}`}
            className={cn(
              buttonBase,
              isCurrent
                ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                : 'bg-background'
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className={buttonBase}
      >
        <Icon name="ChevronRight" className="h-4 w-4" />
      </button>
    </div>
  );
}
