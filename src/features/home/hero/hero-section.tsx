'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSlide, TrustSignal } from '@/types/product';
import { Icon } from '@/components/ui/icon';
import { Container } from '@/components/layout/container';

interface HeroSectionProps {
  slides: HeroSlide[];
  trustSignals?: TrustSignal[];
}

export function HeroSection({ slides }: HeroSectionProps) {
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
    }, 6000);
    return () => clearInterval(timer);
  }, [handleNext, isHovered]);

  if (!slides || slides.length === 0) return null;

  const activeSlide = slides[current];

  return (
    <>
      <section
        className="relative w-full h-[340px] min-[425px]:h-[380px] sm:h-[460px] md:h-screen lg:h-screen min-h-[340px] max-h-[1080px] overflow-hidden select-none bg-stone-950 text-white pt-16 sm:pt-20 lg:pt-24 flex flex-col justify-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 1. Background Slider Images with Seamless Cross-Dissolve (Zero Black Flash) */}
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center transform transition-transform duration-10000 ease-out"
            />

            {/* Luxury Ambient Dark Vignette Overlays for Maximum Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-stone-950/60 pointer-events-none" />
            <div className="absolute inset-0 bg-stone-950/20 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* 2. Main Content Container - Flush Left Alignment */}
        <Container variant="wide" className="relative z-20 h-full flex flex-col justify-between pt-4 sm:pt-8 lg:pt-14 pb-2 sm:pb-3 lg:pb-4 my-auto w-full">
          {/* Center Typography Overlay */}
          <div className="my-auto w-full max-w-none text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${activeSlide.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2 sm:gap-4 text-left w-full"
              >
                {/* Primary Headline - Enhanced Font Sizes for 425px & Mobile */}
                <h1 className="font-display font-bold text-2xl min-[425px]:text-3xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[64px] 2xl:text-[72px] leading-[1.08] sm:leading-[1.05] tracking-tight text-white drop-shadow-xl text-left w-full">
                  {activeSlide.title}
                </h1>

                {/* Subtitle - Enhanced Font Sizes for 425px & Mobile */}
                <div className="flex items-center gap-2 sm:gap-4 mt-0.5 sm:mt-1.5 text-left">
                  <div className="hidden sm:block w-8 sm:w-14 md:w-20 lg:w-28 h-[1.5px] bg-white/70 shadow-sm shrink-0" />
                  <span className="font-sans font-light text-stone-200 text-base min-[425px]:text-lg sm:text-2xl md:text-3xl lg:text-[36px] xl:text-[42px] tracking-wide leading-tight drop-shadow-md">
                    {activeSlide.subtitle}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. Bottom Controls Bar Baseline: Phone (Left - Hidden on Mobile <= 640px) | Pagination Dots (Center) */}
          <div className="w-full flex items-end justify-between gap-4 mt-auto pb-1 sm:pb-2 lg:pb-3 z-30">
            {/* Bottom Left: Phone Call Icon & Hotline Number (Hidden on Mobile screens <= 640px) */}
            <div className="hidden sm:flex items-center z-30">
              <a
                href="tel:09678777777"
                className="group flex flex-col items-start gap-0.5 text-white/90 hover:text-white transition-colors cursor-pointer"
                aria-label="Call Customer Hotline"
              >
                <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-300 shadow-md shrink-0">
                  <Icon name="phone" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white shrink-0" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-white tracking-wider font-mono">09 678 7777 77</span>
              </a>
            </div>

            {/* Bottom Center: Pagination Slide Indicators (Centered on Mobile) */}
            <div className="flex items-center gap-2 sm:gap-2.5 bg-black/40 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/15 z-30 mx-auto sm:mx-0 sm:ml-auto sm:mr-auto">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setDirection(idx > current ? 1 : -1);
                    setCurrent(idx);
                  }}
                  className={`transition-all duration-300 cursor-pointer focus:outline-none ${
                    idx === current
                      ? 'w-6 sm:w-8 h-1.5 sm:h-2.5 rounded-full bg-white shadow-md shadow-white/40'
                      : 'w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Floating Live Chat FAB Outside Slider (Popping Out to Very Bottom Right of Screen in Primary Theme Color) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <button
          onClick={() => {
            alert('Connecting to Furnixo Live Support...');
          }}
          className="relative group h-11 w-11 sm:h-13 sm:w-13 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 transition-all duration-300 cursor-pointer focus-visible:outline-none border-2 border-white/20"
          aria-label="Open Live Support Chat"
        >
          <Icon name="messageCircle" className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:rotate-12 text-primary-foreground" />
          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-stone-950 animate-pulse" />
        </button>
      </div>
    </>
  );
}

export default HeroSection;
