'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/format-price';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/toast';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

interface StickyBuyBoxProps {
  product: Product;
  targetId?: string;
}

export function StickyBuyBox({ product, targetId = 'main-add-to-cart' }: StickyBuyBoxProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  const isOutOfStock = product.stockStatus === 'out-of-stock';

  useEffect(() => {
    const handleScroll = () => {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        // Visible when main CTA button has scrolled out of viewport
        setIsVisible(rect.bottom < 0);
      } else {
        setIsVisible(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetId]);

  if (!isVisible) return null;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, quantity);
    toast({
      type: 'success',
      title: 'Added to Cart!',
      message: product.title,
    });
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/80 shadow-2xl py-3 px-4 sm:px-8 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] animate-in slide-in-from-bottom duration-300">
      <div className="max-w-[1400px] xl:max-w-[1536px] 2xl:max-w-[1600px] mx-auto flex items-center justify-between gap-4">
        {/* Left Product Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0 border border-border/60">
            {product.images[0] && (
              <Image src={product.images[0]} alt={product.title} fill sizes="48px" className="object-cover" />
            )}
          </div>
          <div className="flex flex-col min-w-0 text-left">
            <span className="font-display font-bold text-xs sm:text-sm text-foreground truncate">{product.title}</span>
            <span className="font-bold text-xs text-primary">{formatPrice(product.price)}</span>
          </div>
        </div>

        {/* Right Actions Bar */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quantity selector (hidden on small mobile) */}
          <div className="hidden sm:flex items-center border border-border/80 rounded-lg bg-surface/5">
            <button
              disabled={quantity <= 1 || isOutOfStock}
              onClick={() => setQuantity(quantity - 1)}
              className="h-9 w-9 p-0 flex items-center justify-center cursor-pointer hover:bg-muted text-foreground rounded-l-lg transition-colors"
              aria-label="Decrease quantity"
            >
              <Icon name="minus" className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-xs font-bold select-none">{quantity}</span>
            <button
              disabled={isOutOfStock}
              onClick={() => setQuantity(quantity + 1)}
              className="h-9 w-9 p-0 flex items-center justify-center cursor-pointer hover:bg-muted text-foreground rounded-r-lg transition-colors"
              aria-label="Increase quantity"
            >
              <Icon name="plus" className="h-3 w-3" />
            </button>
          </div>

          <button
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={cn(
              'bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-primary/20 transition-all cursor-pointer flex items-center gap-2',
              isOutOfStock && 'opacity-60 cursor-not-allowed'
            )}
          >
            <Icon name="cart" className="h-4 w-4" />
            <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default StickyBuyBox;
