'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Order } from '@/types/order';
import { formatPrice } from '@/lib/format-price';
import { Button } from '@/components/ui/button';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-soft flex flex-col gap-4 text-left">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/40 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold font-display text-primary text-sm">{order.id}</span>
          <span className="text-stone-400">•</span>
          <span className="text-stone-500">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <span className="font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase text-[10px]">
          {order.status}
        </span>
      </div>

      {/* Item Thumbnails Preview */}
      <div className="flex items-center justify-between gap-4 py-1">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {order.items.slice(0, 4).map((item) => (
            <div key={item.id} className="relative h-14 w-14 rounded-lg bg-muted/40 overflow-hidden border border-border/40 shrink-0">
              {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" sizes="56px" />}
            </div>
          ))}
          {order.items.length > 4 && (
            <div className="h-14 w-14 rounded-lg bg-muted/80 flex items-center justify-center font-bold text-xs text-stone-600 shrink-0">
              +{order.items.length - 4}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end shrink-0">
          <span className="text-[10px] uppercase font-bold text-stone-400">Grand Total</span>
          <span className="text-sm font-bold font-display text-foreground">{formatPrice(order.grandTotal)}</span>
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className="flex items-center justify-between border-t border-border/40 pt-3">
        <span className="text-xs text-stone-500">
          Est. Delivery: <strong className="text-foreground">{order.estimatedDeliveryDate}</strong>
        </span>
        <Link href={`/account/orders/${order.id}`}>
          <Button variant="outline" size="sm" className="text-xs font-bold cursor-pointer">
            View Details & Invoice
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default OrderCard;
