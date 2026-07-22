'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/types/cart';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPrice } from '@/lib/format-price';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

interface CartItemProps {
  item: CartItemType;
  isCompact?: boolean;
}

export function CartItem({ item, isCompact = false }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const maxStock = item.product.stock || 15;
  const isWishlisted = isInWishlist(item.product.slug);

  return (
    <div className="flex gap-4 py-4 border-b border-border/40 items-start text-left group">
      {/* Product Image */}
      <Link
        href={`/products/${item.product.slug}`}
        className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-lg overflow-hidden bg-muted/40 shrink-0 border border-border/40 group-hover:opacity-90 transition-opacity"
      >
        {item.product.images[0] ? (
          <Image
            src={item.product.images[0]}
            alt={item.product.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-stone-400">
            <Icon name="tag" className="h-6 w-6" />
          </div>
        )}
      </Link>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
              {item.product.brand}
            </span>
            <Link
              href={`/products/${item.product.slug}`}
              className="text-xs sm:text-sm font-bold font-display text-foreground hover:text-primary transition-colors truncate max-w-[200px] sm:max-w-xs"
            >
              {item.product.title}
            </Link>
            {(item.selectedColor || item.selectedMaterial) && (
              <span className="text-[11px] text-stone-500">
                {item.selectedColor && `Color: ${item.selectedColor}`}
                {item.selectedColor && item.selectedMaterial && ' • '}
                {item.selectedMaterial && `Material: ${item.selectedMaterial}`}
              </span>
            )}
          </div>

          {/* Remove item button */}
          <button
            onClick={() => removeItem(item.id)}
            className="text-stone-400 hover:text-destructive transition-colors p-1 cursor-pointer focus-visible:outline-none"
            aria-label={`Remove ${item.product.title} from cart`}
          >
            <Icon name="trash" className="h-4 w-4" />
          </button>
        </div>

        {/* Price & Quantity Stepper */}
        <div className="flex items-center justify-between gap-2 pt-3">
          <div className="flex items-center border border-border/80 rounded-lg overflow-hidden bg-background">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="h-7 w-7 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-muted transition-colors cursor-pointer disabled:opacity-40"
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Icon name="minus" className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-xs font-bold select-none">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="h-7 w-7 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-muted transition-colors cursor-pointer disabled:opacity-40"
              disabled={item.quantity >= maxStock}
              aria-label="Increase quantity"
            >
              <Icon name="plus" className="h-3 w-3" />
            </button>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs sm:text-sm font-bold text-foreground font-display">
              {formatPrice(item.product.price * item.quantity)}
            </span>
            {item.quantity > 1 && (
              <span className="text-[10px] text-stone-400">
                {formatPrice(item.product.price)} each
              </span>
            )}
          </div>
        </div>

        {!isCompact && (
          <div className="pt-2">
            <button
              onClick={() => toggleWishlist(item.product.slug, item.product.title)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-500 hover:text-primary transition-colors cursor-pointer"
            >
              <Icon name="heart" className={`h-3 w-3 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
              <span>{isWishlisted ? 'Saved to Wishlist' : 'Save for later'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartItem;
