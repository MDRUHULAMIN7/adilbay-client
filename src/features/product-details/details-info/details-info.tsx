'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { ProductPrice } from '@/features/products/product-price';
import { ProductRating } from '@/features/products/product-rating';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useWishlist } from '@/hooks/useWishlist';
import { useToast } from '@/components/ui/toast';
import { useLayout } from '@/providers/layout-provider';
import { analytics } from '@/lib/analytics';
import { cn } from '@/lib/cn';

interface DetailsInfoProps {
  product: Product;
}

export function DetailsInfo({ product }: DetailsInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState(product.colors[0]?.name || '');
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const { setIsCartOpen } = useLayout();

  const activeWish = isInWishlist(product.slug);
  const isOutOfStock = product.stockStatus === 'out-of-stock';

  const handleWishlistClick = () => {
    toggleWishlist(product.slug);
    analytics.trackCart('checkout', { slug: product.slug, action: activeWish ? 'wishlist_remove' : 'wishlist_add' });
    toast({
      type: 'success',
      title: activeWish ? 'Removed from Wishlist' : 'Added to Wishlist',
      message: `${product.title} was ${activeWish ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    analytics.trackCart('add', { slug: product.slug, quantity });
    setIsCartOpen(true);
    toast({
      type: 'success',
      title: 'Added to Cart',
      message: `${quantity}x ${product.title} has been added to your shopping cart.`,
    });
  };

  return (
    <div className="flex flex-col gap-6 text-left w-full">
      {/* Brand & Category line */}
      <div className="flex items-center gap-3 text-xs uppercase font-bold tracking-wider text-stone-400">
        <span>{product.brand}</span>
        <span>&bull;</span>
        <span className="text-primary">{product.category}</span>
      </div>

      {/* Title & Rating */}
      <div className="flex flex-col gap-2">
        <Heading level={1} className="font-display font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
          {product.title}
        </Heading>
        <ProductRating rating={product.rating} reviewsCount={product.reviewsCount} showText />
      </div>

      {/* Pricing */}
      <ProductPrice price={product.price} oldPrice={product.oldPrice} className="text-xl" />

      {/* Description */}
      <Text className="text-stone-550 text-xs sm:text-sm leading-relaxed">{product.description}</Text>

      {/* Color selections */}
      {product.colors.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-foreground">
            Color Polish: <span className="text-primary font-normal normal-case">{activeColor}</span>
          </span>
          <div className="flex gap-2">
            {product.colors.map((col) => {
              const isActive = col.name === activeColor;
              return (
                <button
                  key={col.name}
                  onClick={() => setActiveColor(col.name)}
                  title={col.name}
                  className={cn(
                    'h-7 w-7 rounded-full border border-border/80 cursor-pointer flex items-center justify-center focus-visible:outline-none',
                    isActive && 'ring-2 ring-primary ring-offset-1'
                  )}
                  style={{ backgroundColor: col.hex }}
                >
                  {isActive && <Icon name="check" className="h-3 w-3 text-white dark:text-black stroke-[3px]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
        {/* Quantity control */}
        <div className="flex items-center border border-border/80 rounded-lg bg-surface/5 w-full sm:w-auto">
          <Button
            variant="ghost"
            size="sm"
            disabled={quantity <= 1 || isOutOfStock}
            onClick={() => setQuantity(quantity - 1)}
            className="h-10 w-10 p-0 rounded-l-lg cursor-pointer"
          >
            <Icon name="minus" className="h-3 w-3" />
          </Button>
          <span className="w-12 text-center text-xs font-bold text-foreground select-none">{quantity}</span>
          <Button
            variant="ghost"
            size="sm"
            disabled={isOutOfStock}
            onClick={() => setQuantity(quantity + 1)}
            className="h-10 w-10 p-0 rounded-r-lg cursor-pointer"
          >
            <Icon name="plus" className="h-3 w-3" />
          </Button>
        </div>

        {/* Action Triggers */}
        <div className="flex gap-3 flex-1 w-full">
          <Button
            variant="brand"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="flex-1 rounded-lg font-bold text-sm h-10 cursor-pointer flex items-center justify-center gap-2"
          >
            <Icon name="cart" className="h-4 w-4" />
            <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
          </Button>

          <Button
            variant="outline"
            onClick={handleWishlistClick}
            className={cn(
              'h-10 w-10 p-0 rounded-lg cursor-pointer flex items-center justify-center border-border/80 bg-background',
              activeWish && 'text-red-500 border-red-200 bg-red-50/20 dark:bg-red-950/20'
            )}
            aria-label="Toggle wishlist"
          >
            <Icon name="heart" className={cn('h-4 w-4', activeWish && 'fill-current text-red-500')} />
          </Button>
        </div>
      </div>

      <div className="h-px bg-border/40 w-full my-2" />

      {/* Specifications Table */}
      {product.specifications.length > 0 && (
        <div className="flex flex-col gap-3">
          <Heading level={4} className="font-display font-semibold text-xs text-foreground uppercase tracking-wider">
            Product Specifications
          </Heading>
          <div className="flex flex-col border border-border/40 rounded-card overflow-hidden">
            {product.specifications.map((spec, idx) => (
              <div
                key={spec.label}
                className={cn(
                  'flex items-center justify-between p-3 text-xs border-b border-border/40 last:border-b-0',
                  idx % 2 === 0 ? 'bg-surface/5' : 'bg-background'
                )}
              >
                <span className="font-semibold text-stone-500">{spec.label}</span>
                <span className="font-bold text-foreground text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default DetailsInfo;
