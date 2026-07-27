'use client';

import React from 'react';
import Image from 'next/image';
import { Review } from '@/types/product';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Container } from '@/components/layout/container';

interface TestimonialsSectionProps {
  testimonials: Review[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-12 lg:py-16 bg-stone-50/70 dark:bg-stone-950/20 border-y border-stone-200/60 dark:border-stone-800/60 select-none">
      <Container variant="wide" className="flex flex-col gap-8 lg:gap-10">
        {/* Section Title */}
        <div className="flex flex-col gap-1.5 max-w-xl text-left">
          <Heading level={2} className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-foreground">
            Client Testimonials
          </Heading>
          <Text className="text-stone-500 text-xs sm:text-sm">
            Read verified reviews from architects, homeowners, and interior designers who chose Furnixo.
          </Text>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="flex flex-col gap-5 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-background shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Star Rating */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Icon key={i} name="star" className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase">
                  Verified Order
                </span>
              </div>

              {/* Review Commentary */}
              <Text className="text-stone-700 dark:text-stone-300 text-sm italic leading-relaxed flex-1">
                "{test.comment}"
              </Text>

              {/* Reviewer Profile Avatar & Details */}
              <div className="flex items-center gap-3.5 pt-3 border-t border-stone-200/60 dark:border-stone-800/60">
                <div className="relative h-11 w-11 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-primary/30 shrink-0 shadow-xs">
                  <Image
                    src={test.avatar || '/images/placeholders/avatar.jpg'}
                    alt={test.userName}
                    fill
                    sizes="44px"
                    className="object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-0.5 text-left">
                  <Heading level={5} className="font-display font-bold text-sm text-foreground leading-tight">
                    {test.userName}
                  </Heading>
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    {test.country} &bull; {test.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TestimonialsSection;
