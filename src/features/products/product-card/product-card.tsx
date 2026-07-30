'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { ProductBadges } from '../product-badges';
import { ProductPrice } from '../product-price';
import { ProductActions } from '../product-actions';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { useWishlist } from '@/hooks/useWishlist';
import { useToast } from '@/components/ui/toast';
import { analytics } from '@/lib/analytics';
import { cn } from '@/lib/cn';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const activeWish = isInWishlist(product.slug);

  // Calculate discount percentage if oldPrice exists
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : undefined;

  const isOutOfStock = product.stockStatus === 'out-of-stock';

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.slug);
    analytics.trackCart('checkout', { slug: product.slug, action: activeWish ? 'wishlist_remove' : 'wishlist_add' });
    toast({
      type: 'success',
      title: activeWish ? 'Removed from Wishlist' : 'Added to Wishlist',
      message: `${product.title} was ${activeWish ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  return (
    <div
      className={cn(
        'group flex flex-col h-full bg-transparent border-none shadow-none text-left relative focus-visible:outline-none select-none',
        isOutOfStock && 'opacity-85',
        className
      )}
    >
      {/* Product Image & badges container (aspect-[4/5] ratio container) */}
      <div className="relative aspect-[4/5] w-full bg-stone-200/70 dark:bg-stone-800/70 overflow-hidden rounded-2xl border border-stone-200/60 dark:border-stone-800/60 shadow-xs">
        {/* Badges */}
        <ProductBadges
          badge={product.badge}
          stockStatus={product.stockStatus}
          discountPercent={discountPercent}
        />

        {/* Primary and secondary hover image with ultra-smooth 1200ms cubic-bezier transitions */}
        <Link href={`/products/${product.slug}`} className="absolute inset-0 block bg-stone-200/70 dark:bg-stone-800/70">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
              className={cn(
                'object-cover transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105',
                product.images[1] && 'group-hover:opacity-0'
              )}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400 dark:text-stone-600 bg-stone-100 dark:bg-stone-900">
              <Icon name="image" className="h-8 w-8 opacity-40" />
            </div>
          )}
          {product.images && product.images[1] && (
            <Image
              src={product.images[1]}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
              className="object-cover opacity-0 group-hover:opacity-100 transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] scale-105 group-hover:scale-100"
              loading="lazy"
            />
          )}
        </Link>

        {/* Hover action triggers */}
        <ProductActions slug={product.slug} title={product.title} stockStatus={product.stockStatus} product={product} />
      </div>

      {/* Details content */}
      <div className="flex flex-col gap-2 pt-3 pb-2 text-left flex-1 justify-between">
        <div className="flex flex-col gap-1 items-start">
          {/* Brand, Rating, and Wishlist heart Row */}
          <div className="flex items-center justify-between w-full text-xs font-bold text-stone-500 dark:text-stone-400 pb-0.5">
            <span className="text-xs uppercase font-bold tracking-wider">{product.brand}</span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">{product.rating.toFixed(1)}</span>
              <Icon name="star" className="h-3.5 w-3.5 fill-amber-500 text-amber-500 -mt-0.5" />
              <button
                onClick={handleWishlistClick}
                className="text-stone-700 dark:text-stone-300 hover:text-red-500 hover:scale-115 transition-all duration-200 p-0.5 focus-visible:outline-none cursor-pointer"
                aria-label={activeWish ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Icon
                  name="heart"
                  className={cn('h-4 w-4 transition-colors', activeWish && 'fill-current text-red-500')}
                />
              </button>
            </div>
          </div>

          {/* Product Title (Underline matches exact title text length) */}
          <Link href={`/products/${product.slug}`} className="inline-block self-start max-w-full">
            <Heading
              level={4}
              className="relative inline-block font-display font-bold text-sm sm:text-[15px] text-stone-900 dark:text-stone-50 leading-snug line-clamp-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-stone-900 dark:after:bg-stone-100 after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-700 after:ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              {product.title}
            </Heading>
          </Link>
        </div>

        {/* Pricing */}
        <ProductPrice price={product.price} oldPrice={product.oldPrice} className="text-stone-900 dark:text-stone-50 text-base font-bold mt-0.5" />
      </div>
    </div>
  );
}
export default ProductCard;
