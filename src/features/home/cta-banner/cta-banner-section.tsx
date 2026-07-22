'use client';

import React from 'react';
import Link from 'next/link';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';

export function CtaBannerSection() {
  return (
    <section className="py-8 lg:py-10 bg-stone-900 text-stone-100 border-t border-stone-850">
      <Container variant="wide">
        <div className="bg-stone-850/40  border border-stone-800 p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-left relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none select-none opacity-20">
            <div className="absolute -top-1/2 -right-1/4 w-[400px] h-[400px] rounded-full bg-primary/20 blur-3xl" />
          </div>

          <div className="flex flex-col gap-3 max-w-2xl relative z-10">
            <Heading level={2} className="font-display font-bold text-2xl sm:text-3xl text-stone-50 tracking-tight leading-tight">
              Design Your Heritage Space With Us
            </Heading>
            <Text className="text-stone-405 text-xs sm:text-sm leading-relaxed">
              Schedule a consultation with our experienced woodcraft consultants to customize shapes, materials, and sizing guidelines tailored to fit your residential project.
            </Text>
          </div>

          <div className="flex gap-4 shrink-0 relative z-10">
            <Link href="/shop">
              <Button variant="brand" className="rounded-lg font-semibold text-sm px-6 py-3 cursor-pointer">
                Shop Furnixo Collection
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
export default CtaBannerSection;
