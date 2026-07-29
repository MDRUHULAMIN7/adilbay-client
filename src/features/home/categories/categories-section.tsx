'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types/product';
import { Heading } from '@/components/ui/heading';
import { Container } from '@/components/layout/container';
import { ROUTES } from '@/constants/routes';

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 bg-background select-none">
      <Container variant="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle & Explore Now Action (Left Aligned) */}
          <div className="lg:col-span-4 flex flex-col items-start text-left gap-4 lg:gap-6">
            <Heading
              level={2}
              className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-primary"
            >
              Explore the Best Furniture Collections in Bangladesh
            </Heading>

            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md">
              Handcrafted mature timber room solutions designed for modern luxury homes and commercial spaces.
            </p>

            <Link
              href={ROUTES.SHOP}
              className="inline-block font-display font-bold text-base sm:text-lg text-foreground border-b-2 border-foreground hover:border-primary hover:text-primary transition-colors pb-1 pt-1 w-fit cursor-pointer"
            >
              Explore Now
            </Link>
          </div>

          {/* Right Column: 3-Column x 2-Row Category Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`${ROUTES.SHOP}?category=${cat.slug}`}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-900 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer block"
              >
                {/* Full-Bleed Image Background */}
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                  className="object-cover w-full h-full group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay for Maximum Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity" />

                {/* Category Title inside Card at Bottom Left */}
                <div className="absolute bottom-3.5 left-4 right-4 z-10">
                  <span className="font-display font-bold text-sm sm:text-base text-white drop-shadow-md transition-colors line-clamp-1">
                    {cat.label}
                  </span>
                </div>

                {/* Hover Accent Line at the Bottom of Card (Thinner & Slower Slide) */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left z-20" />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CategoriesSection;
