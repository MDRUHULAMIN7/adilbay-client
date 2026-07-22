'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/format-price';
import { CartItem } from '../cart-item/cart-item';
import { EmptyCart } from '../empty-cart/empty-cart';
import { Drawer } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Heading } from '@/components/ui/heading';

export function CartDrawer() {
  const { isCartOpen, closeCart, items, summary, itemCount } = useCart();

  return (
    <Drawer isOpen={isCartOpen} onClose={closeCart} title="Shopping Cart" anchor="right">
      <div className="flex flex-col h-full justify-between">
        {/* Drawer Header Info */}
        <div className="flex items-center justify-between pb-3 border-b border-border/40 mb-2">
          <Heading level={3} className="font-display text-base font-bold">
            Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </Heading>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto pr-1 scrollbar-theme">
          {items.length === 0 ? (
            <EmptyCart onActionClick={closeCart} isMini />
          ) : (
            <div className="flex flex-col divide-y divide-border/30">
              {items.map((item) => (
                <CartItem key={item.id} item={item} isCompact />
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-border/60 pt-4 mt-2 flex flex-col gap-3 bg-background">
            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">{formatPrice(summary.subtotal)}</span>
              </div>
              {summary.discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span className="font-semibold">-{formatPrice(summary.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-500">
                <span>Est. Shipping</span>
                <span className="font-semibold text-foreground">
                  {summary.shippingEstimate > 0 ? formatPrice(summary.shippingEstimate) : 'Free'}
                </span>
              </div>
              <div className="flex justify-between font-bold text-sm text-foreground pt-2 border-t border-border/40">
                <span>Grand Total</span>
                <span className="text-primary font-display text-base">{formatPrice(summary.grandTotal)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link href="/cart" onClick={closeCart}>
                <Button variant="outline" size="sm" className="w-full text-xs font-semibold cursor-pointer">
                  View Cart
                </Button>
              </Link>
              <Link href="/checkout" onClick={closeCart}>
                <Button variant="primary" size="sm" className="w-full text-xs font-semibold cursor-pointer">
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}

export default CartDrawer;
