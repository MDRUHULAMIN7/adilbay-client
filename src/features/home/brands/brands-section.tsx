'use client';

import React from 'react';
import { Brand } from '@/types/product';
import { Container } from '@/components/layout/container';

interface BrandsSectionProps {
  brands: Brand[];
}

export function BrandsSection({ brands }: BrandsSectionProps) {
  return (
    <section className="py-5 sm:py-6 bg-background border-b border-border/40 overflow-hidden">
      <Container variant="wide">
        {/* Monochromatic Marquee logo cloud */}
        <div className="relative w-full flex items-center overflow-hidden py-2 select-none">
          <div className="flex gap-20 animate-marquee whitespace-nowrap">
            {/* Triple list to ensure continuous infinite horizontal scrolling */}
            {[...brands, ...brands, ...brands].map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="flex items-center justify-center shrink-0 w-[120px] h-8 relative opacity-45 dark:opacity-35 hover:opacity-100 transition-opacity"
              >
                <span className="font-display font-bold text-sm sm:text-base tracking-widest uppercase text-stone-500 hover:text-primary transition-colors">
                  {brand.label}
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
