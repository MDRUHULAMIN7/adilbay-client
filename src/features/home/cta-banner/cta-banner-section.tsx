'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { Icon } from '@/components/ui/icon';
import { ROUTES } from '@/constants/routes';

export function CtaBannerSection() {
  return (
    <section className="py-12 lg:py-20 bg-background select-none overflow-hidden">
      <Container variant="wide">
        <div className="relative rounded-3xl overflow-hidden bg-[#FAF8F6] dark:bg-stone-950 text-stone-900 dark:text-white border border-stone-200/90 dark:border-stone-800 shadow-xl dark:shadow-2xl transition-colors duration-300">
          {/* Background High-Res Image with Adaptive Light/Dark Gradient Vignette */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/auth-bg.jpg"
              alt="Furnixo Luxury Woodcraft Studio"
              fill
              className="object-cover object-center opacity-45 dark:opacity-35 scale-105 transition-transform duration-1000"
              loading="lazy"
            />
            {/* Light Mode vs Dark Mode Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F6]/95 via-[#FAF8F6]/80 to-[#FAF8F6]/30 dark:from-stone-950 dark:via-stone-950/90 dark:to-stone-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F6]/90 via-transparent to-[#FAF8F6]/50 dark:from-stone-950 dark:via-transparent dark:to-stone-950/60" />
            
            {/* Primary Accent Ambient Warm Glow */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/15 dark:bg-primary/25 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Banner Content Container */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col gap-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Left Column: Pre-Title Badge, Headline & Description */}
              <div className="flex flex-col gap-4 max-w-2xl text-left">
                {/* Pre-Title Micro Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/30 dark:border-primary/40 text-primary text-xs font-mono font-bold tracking-wider uppercase w-fit">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Bespoke Woodcraft Services
                </div>

                <Heading
                  level={2}
                  className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-white tracking-tight leading-tight"
                >
                  Design Your Heritage Space With Us
                </Heading>

                <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  Schedule a personal consultation with our master woodcraft artisans to customize dimensions, solid timber species, and handcrafted finishes tailored to fit your architectural space.
                </p>
              </div>

              {/* Right Column: CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
                <Link href={ROUTES.SHOP} className="w-full sm:w-auto">
                  <Button
                    variant="brand"
                    size="lg"
                    rightIcon={<Icon name="arrowRight" className="h-5 w-5 shrink-0" />}
                    className="w-full sm:w-auto rounded-xl font-bold text-base px-8 py-4 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
                  >
                    Shop Furnixo Collection
                  </Button>
                </Link>

                <Link href={ROUTES.CONTACT} className="w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full sm:w-auto rounded-xl font-semibold text-base px-6 py-4 bg-stone-200/80 hover:bg-stone-300/90 text-stone-900 border border-stone-300/80 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/20 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </div>

            {/* Bottom Trust Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-stone-200/80 dark:border-white/10 text-left">
              <div className="flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/25 dark:border-primary/30 flex items-center justify-center text-primary shrink-0">
                  <Icon name="shieldCheck" className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm text-stone-900 dark:text-white">100% Solid Seasoned Timber</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">Zero artificial veneers or particle boards</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/25 dark:border-primary/30 flex items-center justify-center text-primary shrink-0">
                  <Icon name="star" className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm text-stone-900 dark:text-white">10-Year Craft Warranty</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">Guaranteed structural integrity</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/25 dark:border-primary/30 flex items-center justify-center text-primary shrink-0">
                  <Icon name="truck" className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm text-stone-900 dark:text-white">White-Glove Delivery</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">Professional setup in your home</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CtaBannerSection;
