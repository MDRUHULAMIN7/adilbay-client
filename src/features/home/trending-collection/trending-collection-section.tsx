'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { formatPrice } from '@/lib/format-price';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/components/ui/icon';

interface TrendingCollectionSectionProps {
  products: Product[];
}

export function TrendingCollectionSection({ products }: TrendingCollectionSectionProps) {
  if (!products || products.length === 0) return null;

  // Split products into 2 balanced rows
  const half = Math.ceil(products.length / 2);
  const row1Products = products.slice(0, half);
  const row2Products = products.slice(half);

  // Duplicate items in each row for seamless infinite scrolling loop
  const row1Items = [...row1Products, ...row1Products, ...row1Products, ...row1Products];
  const row2Items = [...row2Products, ...row2Products, ...row2Products, ...row2Products];

  return (
    <section className="py-10 sm:py-14 bg-background overflow-hidden border-y border-border/40 select-none">
      <Container variant="wide" className="flex flex-col gap-6 w-full">
        {/* Section Header: Left Title + Subtitle & Right View All Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 w-full">
          <div className="flex flex-col text-left gap-1 max-w-xl">
            <Heading level={2} className="font-display font-bold text-2xl sm:text-4xl tracking-tight text-foreground">
              Trending Collection
            </Heading>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-medium">
              Explore our top-selling, handcrafted solid timber architectural pieces.
            </p>
          </div>

          <Link
            href={ROUTES.SHOP}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline transition-all group shrink-0 self-start sm:self-auto"
          >
            <span>View All</span>
            <Icon name="chevronRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 2-Row Infinite Marquee Container */}
        <div className="w-full flex flex-col gap-5 sm:gap-6 overflow-hidden py-2">
          {/* Row 1: Leftward Infinite Marquee */}
          <div className="w-full overflow-hidden flex">
            <div className="animate-marquee-left flex gap-4 sm:gap-6 hover:[animation-play-state:paused] cursor-pointer">
              {row1Items.map((product, idx) => (
                <Link
                  key={`row1-${product.id}-${idx}`}
                  href={`/products/${product.slug}`}
                  className="group flex flex-col w-[210px] sm:w-[250px] shrink-0 bg-[#f4f4f6] dark:bg-stone-900/90 hover:bg-white dark:hover:bg-stone-800 rounded-2xl p-3 shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Image Container directly on Card Background */}
                  <div className="relative h-52 sm:h-60 w-full rounded-xl p-2 flex items-center justify-center overflow-hidden">
                    <Image
                      src={product.images[0] || '/images/products/placeholder.jpg'}
                      alt={product.title}
                      fill
                      sizes="250px"
                      className="object-cover p-1 group-hover:scale-108 transition-transform duration-500 rounded-lg"
                    />
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-primary text-primary-foreground shadow-xs z-10">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Tight Title & Price (No Empty Gap) */}
                  <div className="flex flex-col gap-1 mt-2.5 text-center px-1">
                    <h3 className="font-display font-bold text-xs sm:text-sm text-foreground text-center line-clamp-1 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <span className="font-mono font-bold text-xs sm:text-sm text-stone-700 dark:text-stone-300 text-center">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Row 2: Rightward Infinite Marquee */}
          <div className="w-full overflow-hidden flex">
            <div className="animate-marquee-right flex gap-4 sm:gap-6 hover:[animation-play-state:paused] cursor-pointer">
              {row2Items.map((product, idx) => (
                <Link
                  key={`row2-${product.id}-${idx}`}
                  href={`/products/${product.slug}`}
                  className="group flex flex-col w-[210px] sm:w-[250px] shrink-0 bg-[#f4f4f6] dark:bg-stone-900/90 hover:bg-white dark:hover:bg-stone-800 rounded-2xl p-3 shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Image Container directly on Card Background */}
                  <div className="relative h-52 sm:h-60 w-full rounded-xl p-2 flex items-center justify-center overflow-hidden">
                    <Image
                      src={product.images[0] || '/images/products/placeholder.jpg'}
                      alt={product.title}
                      fill
                      sizes="250px"
                      className="object-cover p-1 group-hover:scale-108 transition-transform duration-500 rounded-lg"
                    />
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-primary text-primary-foreground shadow-xs z-10">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Tight Title & Price (No Empty Gap) */}
                  <div className="flex flex-col gap-1 mt-2.5 text-center px-1">
                    <h3 className="font-display font-bold text-xs sm:text-sm text-foreground text-center line-clamp-1 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <span className="font-mono font-bold text-xs sm:text-sm text-stone-700 dark:text-stone-300 text-center">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TrendingCollectionSection;
