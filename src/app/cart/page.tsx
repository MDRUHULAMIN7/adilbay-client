'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { CartList } from '@/features/cart/cart-list/cart-list';
import { CartSummary } from '@/features/cart/cart-summary/cart-summary';
import { EmptyCart } from '@/features/cart/empty-cart/empty-cart';
import { Container } from '@/components/layout/container';
import { PageHeader } from '@/components/layout/page-header';

export default function CartPage() {
  const { items, itemCount } = useCart();

  return (
    <div className="flex flex-col w-full min-h-screen">
      <PageHeader
        title="Shopping Cart"
        badge={`${itemCount || items.length} Items Selected`}
        description="Review your chosen solid wood furniture pieces before proceeding to secure checkout."
        backgroundImage="/images/auth-bg.jpg"
        items={[
          { label: 'Shop', href: '/shop' },
          { label: 'Shopping Cart' },
        ]}
      />

      <Container variant="wide" className="py-10 sm:py-14 flex flex-col gap-6 text-left min-h-[50vh] w-full">
        {/* Main Cart Content */}
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <CartList />
            </div>
            <div className="lg:col-span-4">
              <CartSummary />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
