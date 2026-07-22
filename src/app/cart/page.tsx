'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { CartList } from '@/features/cart/cart-list/cart-list';
import { CartSummary } from '@/features/cart/cart-summary/cart-summary';
import { EmptyCart } from '@/features/cart/empty-cart/empty-cart';
import { Container } from '@/components/layout/container';

export default function CartPage() {
  const { items } = useCart();

  return (
    <Container variant="wide" className="py-8 sm:py-12 flex flex-col gap-6 text-left min-h-[70vh]">
      {/* Title matching Screenshot 2 */}
      <h1 className="text-3xl font-bold font-display text-foreground border-b border-border/40 pb-4">
        Shopping Cart
      </h1>

      {/* Main Cart Content */}
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          <div className="lg:col-span-8">
            <CartList />
          </div>
          <div className="lg:col-span-4">
            <CartSummary />
          </div>
        </div>
      )}
    </Container>
  );
}
