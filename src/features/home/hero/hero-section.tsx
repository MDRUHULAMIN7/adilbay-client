'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSlide, TrustSignal } from '@/types/product';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Container } from '@/components/layout/container';

interface HeroSectionProps {
  slides: HeroSlide[];
  trustSignals: TrustSignal[];
}

export function HeroSection({ slides, trustSignals }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [handleNext, isHovered]);

  if (!slides || slides.length === 0) return null;

  const activeSlide = slides[current];

  // Variants for direction-aware smooth slide animation
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 60 : -60,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-stone-100/90 via-stone-50 to-background dark:from-stone-950 dark:via-stone-900/60 dark:to-background border-b border-border/40 pt-2 pb-3 lg:pt-3 lg:pb-5 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle Background Glow Accent */}
      {/* <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" /> */}

      <Container variant="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch py-4 md:py-8 lg:py-10">
          {/* Left Text Column - order-2 on mobile, order-1 on desktop */}
          <div className="lg:col-span-6 flex flex-col relative z-10 order-2 lg:order-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeSlide.id}
                custom={direction}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between h-full gap-5 lg:gap-6"
              >
                {/* Top Text Group */}
                <div className="flex flex-col gap-4">
                  {/* Glassmorphic Pill Tag */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide backdrop-blur-md self-start">
                    <Icon name="star" className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span>{activeSlide.badgeText}</span>
                  </div>

                  {/* Main Headline */}
                  <Heading
                    level={1}
                    variant="display"
                    className="text-stone-900 dark:text-stone-50 font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[52px] leading-[1.08] tracking-tight"
                  >
                    {activeSlide.title}
                  </Heading>

                  {/* Subtitle */}
                  <Text
                    variant="large"
                    className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl"
                  >
                    {activeSlide.subtitle}
                  </Text>
                </div>

                {/* Feature Highlights Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2.5 text-xs font-medium text-stone-700 dark:text-stone-300 bg-background/60 dark:bg-stone-900/60 backdrop-blur-xs px-3 py-2 rounded-xl border border-border/50">
                    <Icon name="truck" className="h-4 w-4 text-primary shrink-0" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-medium text-stone-700 dark:text-stone-300 bg-background/60 dark:bg-stone-900/60 backdrop-blur-xs px-3 py-2 rounded-xl border border-border/50">
                    <Icon name="shieldCheck" className="h-4 w-4 text-primary shrink-0" />
                    <span>10-Yr Warranty</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-medium text-stone-700 dark:text-stone-300 bg-background/60 dark:bg-stone-900/60 backdrop-blur-xs px-3 py-2 rounded-xl border border-border/50">
                    <Icon name="leaf" className="h-4 w-4 text-primary shrink-0" />
                    <span>Certified Timber</span>
                  </div>
                </div>

                {/* Call To Actions */}
                <div className="flex flex-wrap gap-4 pt-1">
                  <Link href={activeSlide.ctaLink}>
                    <button className="group font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3.5 shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300 flex items-center gap-2 cursor-pointer focus-visible:outline-none">
                      <span>{activeSlide.ctaText}</span>
                      <Icon
                        name="arrowRight"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </Link>
                  <Link href="/shop">
                    <button className="font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-stone-300 dark:border-stone-700 bg-background/50 backdrop-blur-md hover:bg-stone-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-stone-950 px-6 py-3.5 transition-all duration-300 cursor-pointer focus-visible:outline-none">
                      Explore Catalog
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Image Showcase Column - order-1 on mobile, order-2 on desktop */}
          <div className="lg:col-span-6 flex flex-col h-full order-1 lg:order-2">
            <div className="relative w-full h-[320px] sm:h-[390px] lg:h-full lg:min-h-[420px] rounded-[2rem] overflow-hidden shadow-2xl border border-stone-200/80 dark:border-stone-800 group bg-stone-900">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeSlide.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Gradient Shadow Overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Spotlight Card over Image */}
              {activeSlide.featuredTitle && activeSlide.featuredPrice && (
                <motion.div
                  key={`card-${activeSlide.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-stone-950/85 dark:bg-stone-900/90 backdrop-blur-xl border border-white/15 p-2.5 sm:p-4 rounded-2xl shadow-xl flex items-center justify-between gap-2.5 sm:gap-3 text-white z-20"
                >
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="text-xs sm:text-sm font-bold text-stone-100 truncate" title={activeSlide.featuredTitle}>
                      {activeSlide.featuredTitle}
                    </span>
                    <span className="text-xs font-semibold text-amber-400 shrink-0">
                      {activeSlide.featuredPrice}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <Link href="/shop">
                      <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-transform hover:scale-105 flex items-center gap-1.5 cursor-pointer shrink-0">
                        <span className="hidden xs:inline">Quick Shop</span>
                        <span className="xs:hidden">Shop</span>
                        <Icon name="arrowRight" className="h-3.5 w-3.5 shrink-0" />
                      </button>
                    </Link>
                    <div className="flex items-center gap-1 border-l border-white/20 pl-1.5 sm:pl-2">
                      <button
                        onClick={handlePrev}
                        className="h-7 w-7 sm:h-8 sm:w-8 rounded-xl bg-white/10 hover:bg-primary hover:text-primary-foreground text-white flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none shrink-0"
                        aria-label="Previous slide"
                      >
                        <Icon name="chevronLeft" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="h-7 w-7 sm:h-8 sm:w-8 rounded-xl bg-white/10 hover:bg-primary hover:text-primary-foreground text-white flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none shrink-0"
                        aria-label="Next slide"
                      >
                        <Icon name="chevronRight" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
