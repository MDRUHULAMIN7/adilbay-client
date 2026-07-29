'use client';

import React from 'react';
import { Brand } from '@/types/product';
import { Container } from '@/components/layout/container';

interface BrandsSectionProps {
  brands: Brand[];
}

export function BrandsSection({ brands }: BrandsSectionProps) {
  if (!brands || brands.length === 0) return null;

  return (
    <section className="py-5 sm:py-6.5 bg-stone-100/80 dark:bg-stone-900/60 border-y border-stone-200/80 dark:border-stone-800/80 overflow-hidden select-none">
      <Container variant="wide" className="relative">
        {/* Edge Gradient Fade Masks for Smooth Infinite Flow */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-stone-100/90 dark:from-stone-900/90 via-stone-100/50 dark:via-stone-900/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-stone-100/90 dark:from-stone-900/90 via-stone-100/50 dark:via-stone-900/50 to-transparent z-10 pointer-events-none" />

        {/* Continuous Smooth Infinite Marquee Slider */}
        <div className="relative w-full flex items-center overflow-hidden py-1">
          <div className="animate-marquee-brand flex items-center gap-10 sm:gap-16 whitespace-nowrap">
            {[...brands, ...brands, ...brands, ...brands].map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="flex items-center gap-10 sm:gap-16 shrink-0 group cursor-pointer"
              >
                <span className="font-display font-extrabold text-base sm:text-lg md:text-xl tracking-[0.2em] uppercase text-stone-800 dark:text-stone-200 group-hover:text-primary transition-all duration-300 transform group-hover:scale-105 drop-shadow-sm">
                  {brand.label}
                </span>
                <span className="text-stone-400 dark:text-stone-600 text-xs sm:text-sm select-none">
                  ✦
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default BrandsSection;
