'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/format-price';

export function CartSummary() {
  const { summary, itemCount } = useCart();

  const isFreeShipping = summary.shippingEstimate === 0;

  return (
    <div className="flex flex-col gap-6 text-left w-full sticky top-24">
      {/* 1. Order Summary Card */}
      <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-soft flex flex-col gap-4">
        <h3 className="font-display font-bold text-base text-foreground border-b border-border/40 pb-3">
          Order Summary
        </h3>

        <div className="flex flex-col gap-3 text-xs">
          <div className="flex justify-between text-stone-600 dark:text-stone-300">
            <span>Subtotal({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
            <span className="font-bold text-foreground font-display">{formatPrice(summary.subtotal)}</span>
          </div>

          <div className="flex justify-between text-stone-600 dark:text-stone-300">
            <span>Shipping</span>
            <span className="font-bold text-foreground font-display">
              {isFreeShipping ? 'Free' : formatPrice(summary.shippingEstimate)}
            </span>
          </div>

          {summary.discount > 0 && (
            <div className="flex justify-between text-success font-bold">
              <span>Discount</span>
              <span className="font-display">-{formatPrice(summary.discount)}</span>
            </div>
          )}

          <div className="h-px bg-border/40 my-1" />

          <div className="flex justify-between items-baseline pt-1">
            <span className="text-sm font-bold text-foreground">Total:</span>
            <span className="text-lg font-bold font-display text-primary">
              {formatPrice(summary.grandTotal)}
            </span>
          </div>

          <span className="text-[11px] text-stone-400 leading-tight">
            Tax included and shipping calculated at checkout
          </span>
        </div>

        {/* Theme Primary Button */}
        <Link href="/checkout" className="w-full pt-2">
          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-colors cursor-pointer shadow-md shadow-primary/20">
            Proceed to Checkout
          </button>
        </Link>
      </div>

      {/* 2. We Accept Payments Box */}
      <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-soft flex flex-col items-center gap-3">
        <span className="text-xs font-bold text-foreground">We accept payments</span>
        <div className="flex items-center justify-center gap-2 flex-wrap text-[10px] font-bold">
          <span className="bg-background border border-border/60 px-2 py-1 rounded-md text-[#1A1F71] dark:text-stone-200">VISA</span>
          <span className="bg-background border border-border/60 px-2 py-1 rounded-md text-[#EB001B] dark:text-stone-200">MasterCard</span>
          <span className="bg-background border border-border/60 px-2 py-1 rounded-md text-[#006FCF] dark:text-stone-200">AMEX</span>
          <span className="bg-background border border-border/60 px-2 py-1 rounded-md text-[#003087] dark:text-stone-200">PayPal</span>
          <span className="bg-background border border-border/60 px-2 py-1 rounded-md text-primary font-bold">bKash</span>
        </div>
      </div>

      {/* 3. Free Shipping Banner (Theme Primary Highlight) */}
      <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-bold text-center">
        You are eligible for free shipping.
      </div>
    </div>
  );
}

export default CartSummary;
