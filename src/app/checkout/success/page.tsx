'use client';

import React from 'react';
import Link from 'next/link';
import { useCheckout } from '@/hooks/useCheckout';
import { Container } from '@/components/layout/container';

export default function CheckoutSuccessPage() {
  const { placedOrder } = useCheckout();

  const orderId = placedOrder?.id || '#123456';
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="w-full bg-background py-16 sm:py-24 min-h-[80vh] flex items-center justify-center">
      <Container variant="narrow" className="flex flex-col items-center justify-center text-center max-w-xl">
        {/* Circle Cart Icon with Theme Colors */}
        <div className="relative mb-6">
          {/* Sparkle stars in theme primary color */}
          <span className="absolute -top-3 left-0 text-primary text-sm">✦</span>
          <span className="absolute top-1 -left-4 text-primary text-base">✦</span>
          <span className="absolute -top-4 right-1 text-primary text-base">✦</span>
          <span className="absolute top-2 -right-3 text-primary text-xs">✦</span>

          {/* Theme Primary Circle Cart Icon */}
          <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/25">
            <svg
              className="h-10 w-10 fill-none stroke-current stroke-[2.5]"
              viewBox="0 0 24 24"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
        </div>

        {/* Large Headline */}
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-foreground tracking-tight mb-4 uppercase">
          Thank you for your order!
        </h1>

        {/* Subtext with Order # and expected courier timeline */}
        <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed mb-8 max-w-md">
          Your order <strong className="text-primary font-display">{orderId}</strong> accepted and will be processed shortly. Expect our courier today (<strong className="text-foreground">{todayFormatted}</strong>) at 12:00 - 14:00 .
        </p>

        {/* Theme Primary Button */}
        <Link href="/shop" className="w-full max-w-xs">
          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-colors cursor-pointer shadow-md shadow-primary/20">
            Continue Shopping
          </button>
        </Link>
      </Container>
    </div>
  );
}
