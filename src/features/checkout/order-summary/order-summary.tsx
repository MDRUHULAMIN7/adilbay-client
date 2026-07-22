'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/format-price';
import { Heading } from '@/components/ui/heading';

export function CheckoutOrderSummary() {
  const { items, summary } = useCart();

  return (
    <div className="flex flex-col gap-6 p-6 rounded-2xl bg-card border border-border/60 shadow-soft text-left sticky top-24">
      <Heading level={3} className="font-display font-bold text-lg text-foreground border-b border-border/40 pb-3">
        Order Review ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
      </Heading>

      {/* Items Preview */}
      <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1 scrollbar-theme">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 text-xs">
            <div className="relative h-12 w-12 rounded bg-muted/40 overflow-hidden shrink-0 border border-border/40">
              {item.product.images[0] && (
                <Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover" sizes="48px" />
              )}
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <span className="font-bold text-foreground truncate">{item.product.title}</span>
              <span className="text-stone-500">Qty: {item.quantity}</span>
            </div>
            <span className="font-bold text-foreground">{formatPrice(item.product.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="h-px bg-border/40" />

      {/* Price Calculations */}
      <div className="flex flex-col gap-2.5 text-xs">
        <div className="flex justify-between text-stone-500">
          <span>Subtotal</span>
          <span className="font-bold text-foreground">{formatPrice(summary.subtotal)}</span>
        </div>
        {summary.discount > 0 && (
          <div className="flex justify-between text-success font-bold">
            <span>Discount</span>
            <span>-{formatPrice(summary.discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-stone-500">
          <span>Shipping</span>
          <span className="font-bold text-foreground">
            {summary.shippingEstimate > 0 ? formatPrice(summary.shippingEstimate) : 'FREE'}
          </span>
        </div>
        <div className="flex justify-between text-stone-500">
          <span>VAT (5%)</span>
          <span className="font-bold text-foreground">{formatPrice(summary.tax)}</span>
        </div>

        <div className="h-px bg-border/40 my-1" />

        <div className="flex justify-between text-base font-bold text-foreground pt-1">
          <span>Total Payable</span>
          <span className="text-primary font-display text-xl">{formatPrice(summary.grandTotal)}</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutOrderSummary;
