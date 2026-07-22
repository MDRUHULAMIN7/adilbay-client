'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/format-price';
import { Icon } from '@/components/ui/icon';

export function CartList() {
  const { items, removeItem, updateQuantity, applyCoupon, appliedCoupon, removeCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = await applyCoupon(couponCode.trim());
    setCouponMsg({ success: res.success, text: res.message });
    if (res.success) setCouponCode('');
  };

  const freeShippingThreshold = 150;
  const currentSubtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - currentSubtotal);
  const freeShippingPercent = Math.min(100, (currentSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="flex flex-col gap-6 w-full text-left">
      {/* Free Shipping Progress Indicator */}
      <div className="flex flex-col gap-2">
        <span className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300">
          {remainingForFreeShipping > 0
            ? `Spend ${formatPrice(remainingForFreeShipping)} more and get free shipping!`
            : '🎉 You are eligible for free shipping!'}
        </span>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${freeShippingPercent}%` }}
          />
        </div>
      </div>

      {/* Cart Items Table */}
      <div className="w-full overflow-x-auto border-t border-b border-border/60">
        <table className="w-full text-left border-collapse min-w-[550px]">
          <thead>
            <tr className="border-b border-border/60 text-xs font-bold uppercase tracking-wider text-foreground">
              <th className="py-3.5 px-2 font-display">Product</th>
              <th className="py-3.5 px-2 text-center font-display">Quantity</th>
              <th className="py-3.5 px-2 text-right font-display">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-xs">
            {items.map((item) => (
              <tr key={item.id} className="align-middle">
                {/* Product Info Column */}
                <td className="py-4 px-2">
                  <div className="flex items-start gap-4">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-muted/40 shrink-0 overflow-hidden border border-border/40"
                    >
                      {item.product.images[0] && (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      )}
                    </Link>
                    <div className="flex flex-col gap-1 items-start">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-bold text-sm text-foreground hover:text-primary transition-colors font-display"
                      >
                        {item.product.title}
                      </Link>
                      <span className="text-xs font-semibold text-stone-500">
                        {formatPrice(item.product.price)}
                      </span>
                      {(item.selectedColor || item.selectedMaterial) && (
                        <span className="text-xs text-stone-400">
                          {item.selectedColor || 'Black'}
                        </span>
                      )}
                      {/* Theme Destructive Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-1.5 bg-destructive hover:bg-destructive/90 text-destructive-foreground text-[11px] font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </td>

                {/* Quantity Column */}
                <td className="py-4 px-2 text-center align-middle">
                  <div className="inline-flex items-center border border-border/80 rounded-lg bg-background overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors cursor-pointer disabled:opacity-40"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-xs">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </td>

                {/* Total Column */}
                <td className="py-4 px-2 text-right align-middle font-bold text-sm text-foreground font-display">
                  {formatPrice(item.product.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Navigation Links below table */}
      <div className="flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-300 pt-1">
        <Link href="/shop" className="text-primary hover:underline cursor-pointer">
          Continue Shopping
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="text-stone-500 hover:text-primary underline cursor-pointer bg-transparent border-none p-0 text-xs font-bold"
        >
          Update Shopping Cart
        </button>
      </div>

      {/* Apply Discount Code Box */}
      <div className="flex flex-col gap-3 pt-4 max-w-md">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
          <Icon name="package" className="h-4 w-4 text-primary" />
          <span>Apply Discount Code</span>
        </div>
        <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="FC-XXXXXX"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 bg-background border border-border/80 rounded-lg px-3 py-2.5 text-xs font-semibold uppercase placeholder:normal-case placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          {/* Theme Primary Button */}
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold px-5 py-2.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-sm"
          >
            Apply Discount
          </button>
        </form>

        {couponMsg && (
          <span className={`text-xs font-semibold ${couponMsg.success ? 'text-success' : 'text-destructive'}`}>
            {couponMsg.text}
          </span>
        )}

        {appliedCoupon && (
          <div className="flex items-center justify-between bg-primary/10 border border-primary/20 px-3 py-2 rounded-lg text-xs">
            <span className="font-bold text-primary">Coupon &quot;{appliedCoupon.code}&quot; applied</span>
            <button onClick={removeCoupon} className="text-stone-500 hover:text-destructive text-xs cursor-pointer font-bold">
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartList;
