'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types/product';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Container } from '@/components/layout/container';

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="py-8 lg:py-10 bg-background">
      <Container variant="wide" className="flex flex-col gap-8">
        <div className="flex flex-col gap-1.5 max-w-xl text-left">
          <Heading level={2} className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-foreground">
            Shop by Room Category
          </Heading>
          <Text className="text-stone-500 text-xs sm:text-sm">
            Handcrafted solid wood selections tailored for specific spaces inside your home.
          </Text>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/category/${cat.slug}`}
              className="group flex flex-col gap-3 focus-visible:outline-none"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden  bg-muted/20 border border-border/40 shadow-soft">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 200px"
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-stone-900/30 opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-stone-100 flex flex-col gap-0.5">
                  <span className="font-semibold text-[10px] uppercase tracking-wider text-stone-200">
                    {cat.productCount} Items
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-0.5 pl-1">
                <Heading level={4} className="font-display font-semibold text-sm group-hover:text-primary transition-colors text-foreground">
                  {cat.label}
                </Heading>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
export default CategoriesSection;
