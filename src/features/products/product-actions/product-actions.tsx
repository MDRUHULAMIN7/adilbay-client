'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useToast } from '@/components/ui/toast';
import { useLayout } from '@/providers/layout-provider';
import { analytics } from '@/lib/analytics';
import { useRouter } from 'next/navigation';

interface ProductActionsProps extends BaseComponentProps {
  slug: string;
  title: string;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export function ProductActions({ slug, title, stockStatus, className }: ProductActionsProps) {
  const { toast } = useToast();
  const { setIsCartOpen } = useLayout();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (stockStatus === 'out-of-stock') return;
    analytics.trackCart('add', { slug, quantity: 1 });
    setIsCartOpen(true);
    toast({
      type: 'success',
      title: 'Added to Cart',
      message: `${title} has been added to your shopping cart.`,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/products/${slug}`);
  };

  return (
    <div
      className={cn(
        'absolute bottom-3 left-3 right-3 flex items-center gap-2 z-10 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
        className
      )}
    >
      {/* Quick View Button (Eye) */}
      <button
        onClick={handleQuickView}
        className="h-9.5 w-9.5 bg-stone-900 text-stone-50 border-none hover:bg-stone-800 flex items-center justify-center rounded-none cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 shadow-md"
        aria-label="Quick view product details"
      >
        <Icon name="eye" className="h-4 w-4" />
      </button>

      {/* Quick Add Button with Icon Inline Next to Text */}
      <Button
        variant="primary"
        onClick={handleAddToCart}
        disabled={stockStatus === 'out-of-stock'}
        className="flex-1 h-9.5 bg-stone-900 text-stone-50 border-none hover:bg-stone-800 rounded-none cursor-pointer transition-colors shadow-md px-2 min-w-0"
      >
        <div className="flex flex-row items-center justify-center gap-1.5 whitespace-nowrap w-full">
          <Icon name="plus" className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs font-bold whitespace-nowrap">Quick add</span>
        </div>
      </Button>
    </div>
  );
}
export default ProductActions;
