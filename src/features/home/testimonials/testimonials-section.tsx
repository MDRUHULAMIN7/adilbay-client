'use client';

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
    <section className="py-8 lg:py-10 bg-stone-50 dark:bg-stone-950/10 border-y border-border/40">
      <Container variant="wide" className="flex flex-col gap-8">
        <div className="flex flex-col gap-1.5 max-w-xl text-left">
          <Heading level={2} className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-foreground">
            Client Testimonials
          </Heading>
          <Text className="text-stone-500 text-xs sm:text-sm">
            Read verified reviews from architects, homeowners, and interior designers who chose Furnixo.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="flex flex-col gap-5 p-6 border border-border/40 bg-background shadow-soft hover:shadow-raised transition-all"
            >
              {/* Star Rating */}
              <div className="flex gap-1 text-primary">
                {Array.from({ length: test.rating }).map((_, i) => (
                  <Icon key={i} name="star" className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Review Commentary */}
              <Text className="text-stone-700 dark:text-stone-300 text-xs italic leading-relaxed flex-1">
                "{test.comment}"
              </Text>

              {/* Reviewer Profile */}
              <div className="flex items-center gap-3 pt-2 border-t border-border/40">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-850 border border-border shrink-0">
                  <Image
                    src={test.avatar || '/images/placeholders/avatar.jpg'}
                    alt={test.userName}
                    fill
                    sizes="40px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <Heading level={5} className="font-display font-semibold text-xs text-foreground leading-tight">
                    {test.userName}
                  </Heading>
                  <span className="text-[10px] text-stone-450 font-medium">
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
