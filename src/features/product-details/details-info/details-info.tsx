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
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { analytics } from '@/lib/analytics';
import { cn } from '@/lib/cn';

interface DetailsInfoProps {
  product: Product;
}

export function DetailsInfo({ product }: DetailsInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState(product.colors[0]?.name || '');
  const [selectedMaterial, setSelectedMaterial] = useState('Burmese Teak');
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addItem, openCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

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

  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast({
        type: 'success',
        title: 'Link Copied',
        message: 'Product link copied to your clipboard.',
      });
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, quantity, activeColor, selectedMaterial);
    openCart();
    analytics.trackCart('add', { slug: product.slug, quantity });
    toast({
      type: 'success',
      title: 'Added to Cart!',
      message: product.title,
    });
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addItem(product, quantity, activeColor, selectedMaterial);
    router.push(ROUTES.CHECKOUT);
  };

  const woodMaterials = ['Burmese Teak', 'American Walnut', 'White Ash Wood'];

  return (
    <div className="flex flex-col gap-6 text-left w-full">
      {/* Brand, Category & Share line */}
      <div className="flex items-center justify-between gap-3 text-xs uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-2">
          <span>{product.brand}</span>
          <span>&bull;</span>
          <span className="text-primary">{product.category}</span>
        </div>
        <button
          onClick={handleShareClick}
          className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300 hover:text-primary transition-colors cursor-pointer focus-visible:outline-none"
          aria-label="Share product"
        >
          <Icon name="share" className="h-3.5 w-3.5 text-stone-500 dark:text-stone-300" />
          <span className="capitalize">Share</span>
        </button>
      </div>

      {/* Title & Rating */}
      <div className="flex flex-col gap-2">
        <Heading level={1} className="font-display font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 tracking-tight">
          {product.title}
        </Heading>
        <ProductRating rating={product.rating} reviewsCount={product.reviewsCount} showText />
      </div>

      {/* Pricing */}
      <ProductPrice price={product.price} oldPrice={product.oldPrice} className="text-xl" />

      {/* Description */}
      <Text className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">{product.description}</Text>

      {/* Wood Material Variant Selection */}
      <div className="flex flex-col gap-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
          Wood Material: <span className="text-primary font-semibold">{selectedMaterial}</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {woodMaterials.map((mat) => (
            <button
              key={mat}
              onClick={() => setSelectedMaterial(mat)}
              className={cn(
                'min-w-[105px] sm:min-w-[120px] flex-1 min-h-[40px] px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer select-none flex items-center justify-center text-center',
                selectedMaterial === mat
                  ? 'border-primary bg-primary/10 text-primary shadow-flat'
                  : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:border-stone-300 dark:hover:border-stone-600'
              )}
            >
              {mat}
            </button>
          ))}
        </div>
      </div>

      {/* Color selections */}
      {product.colors.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
            Color Polish: <span className="text-primary font-semibold">{activeColor}</span>
          </span>
          <div className="flex flex-wrap gap-2.5">
            {product.colors.map((col) => {
              const isActive = col.name === activeColor;
              return (
                <button
                  key={col.name}
                  onClick={() => setActiveColor(col.name)}
                  title={col.name}
                  className={cn(
                    'h-10 w-10 sm:h-9 sm:w-9 rounded-full border border-stone-200 dark:border-stone-700 cursor-pointer flex items-center justify-center focus-visible:outline-none transition-transform shrink-0',
                    isActive && 'ring-2 ring-primary ring-offset-2 scale-105'
                  )}
                  style={{ backgroundColor: col.hex }}
                >
                  {isActive && <Icon name="check" className="h-4 w-4 text-white dark:text-black stroke-[3px]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & Actions Bar with ID for StickyBuyBox observer */}
      <div id="main-add-to-cart-container" className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center pt-2 w-full">
        <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
          {/* Quantity control (Fixed-width stepper) */}
          <div className="flex items-center border border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50 dark:bg-stone-900/60 w-32 shrink-0 h-11">
            <Button
              variant="ghost"
              size="sm"
              disabled={quantity <= 1 || isOutOfStock}
              onClick={() => setQuantity(quantity - 1)}
              className="h-11 w-10 p-0 rounded-l-xl cursor-pointer text-stone-700 dark:text-stone-200 shrink-0"
              aria-label="Decrease quantity"
            >
              <Icon name="minus" className="h-3.5 w-3.5 text-stone-700 dark:text-stone-200" />
            </Button>
            <span className="flex-1 text-center text-xs font-bold text-stone-900 dark:text-stone-100 select-none">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              disabled={isOutOfStock}
              onClick={() => setQuantity(quantity + 1)}
              className="h-11 w-10 p-0 rounded-r-xl cursor-pointer text-stone-700 dark:text-stone-200 shrink-0"
              aria-label="Increase quantity"
            >
              <Icon name="plus" className="h-3.5 w-3.5 text-stone-700 dark:text-stone-200" />
            </Button>
          </div>

          {/* Wishlist Heart button on Mobile (< sm) */}
          <Button
            variant="outline"
            onClick={handleWishlistClick}
            className={cn(
              'h-11 w-11 p-0 rounded-xl cursor-pointer flex sm:hidden items-center justify-center border-stone-200 dark:border-stone-800 bg-background hover:bg-muted shrink-0 text-stone-700 dark:text-stone-200',
              activeWish && 'text-red-500 border-red-200 bg-red-50/20 dark:bg-red-950/20'
            )}
            aria-label="Toggle wishlist"
          >
            <Icon name="heart" className={cn('h-4 w-4', activeWish && 'fill-current text-red-500')} />
          </Button>
        </div>

        {/* Action Triggers (Equal Flex 50/50 CTAs) */}
        <div className="flex items-center gap-3 flex-1 w-full">
          <Button
            id="main-add-to-cart"
            variant="brand"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="flex-1 rounded-xl font-bold text-xs sm:text-sm h-11 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-primary/20 whitespace-nowrap min-w-0"
          >
            <Icon name="cart" className="h-4 w-4 shrink-0" />
            <span className="truncate">{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
          </Button>

          <Button
            variant="primary"
            disabled={isOutOfStock}
            onClick={handleBuyNow}
            className="flex-1 rounded-xl font-bold text-xs sm:text-sm h-11 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 shadow-md whitespace-nowrap min-w-0"
          >
            <Icon name="bag" className="h-4 w-4 shrink-0" />
            <span className="truncate">Buy Now</span>
          </Button>

          {/* Wishlist Heart button on Desktop (>= sm) */}
          <Button
            variant="outline"
            onClick={handleWishlistClick}
            className={cn(
              'h-11 w-11 p-0 rounded-xl cursor-pointer hidden sm:flex items-center justify-center border-stone-200 dark:border-stone-800 bg-background hover:bg-muted shrink-0 text-stone-700 dark:text-stone-200',
              activeWish && 'text-red-500 border-red-200 bg-red-50/20 dark:bg-red-950/20'
            )}
            aria-label="Toggle wishlist"
          >
            <Icon name="heart" className={cn('h-4 w-4', activeWish && 'fill-current text-red-500')} />
          </Button>
        </div>
      </div>

      <div className="h-px bg-stone-200 dark:bg-stone-800 w-full my-2" />

      {/* Specifications Table */}
      {product.specifications.length > 0 && (
        <div className="flex flex-col gap-3">
          <Heading level={4} className="font-display font-semibold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider">
            Product Specifications
          </Heading>
          <div className="flex flex-col border border-stone-200/80 dark:border-stone-800 rounded-2xl overflow-hidden">
            {product.specifications.map((spec, idx) => (
              <div
                key={spec.label}
                className={cn(
                  'flex items-center justify-between p-3.5 text-xs border-b border-stone-200/80 dark:border-stone-800 last:border-b-0',
                  idx % 2 === 0 ? 'bg-stone-50/70 dark:bg-stone-900/40' : 'bg-background dark:bg-stone-950/60'
                )}
              >
                <span className="font-semibold text-stone-700 dark:text-stone-300">{spec.label}</span>
                <span className="font-bold text-stone-900 dark:text-stone-100 text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default DetailsInfo;
