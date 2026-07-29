'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSlide, TrustSignal } from '@/types/product';
import { Icon } from '@/components/ui/icon';
import { Container } from '@/components/layout/container';
import { FloatingContactWidget } from '@/components/layout/floating-contact-widget';

interface HeroSectionProps {
  slides: HeroSlide[];
  trustSignals?: TrustSignal[];
}

export function HeroSection({ slides }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isHovered || slides.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [handleNext, isHovered, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  if (!slides || slides.length === 0) return null;

  const activeSlide = slides[current];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <>
      <section
        className="relative w-full h-[75vh] min-h-[500px] sm:h-[80vh] sm:min-h-[580px] lg:h-[85vh] lg:min-h-[640px] max-h-[900px] bg-stone-950 overflow-hidden select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label="Hero Showcase Carousel"
      >
        {/* 1. Background Image Carousel */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 260, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.title}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/30 z-10" />
          </motion.div>
        </AnimatePresence>

        {/* Left / Right Chevron Controls (Visible on hover on desktop) */}
        <div className="absolute inset-0 z-30 flex items-center justify-between px-3 sm:px-6 pointer-events-none">
          <button
            onClick={handlePrev}
            className="pointer-events-auto h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-70 hover:opacity-100 transition-all duration-200 hover:scale-110 focus:outline-none"
            aria-label="Previous Slide"
          >
            <Icon name="chevronLeft" className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={handleNext}
            className="pointer-events-auto h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-70 hover:opacity-100 transition-all duration-200 hover:scale-110 focus:outline-none"
            aria-label="Next Slide"
          >
            <Icon name="chevronRight" className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* 2. Hero Overlay Text Content */}
        <Container variant="wide" className="relative h-full flex flex-col justify-between py-8 sm:py-12 lg:py-16 z-20">
          <div className="my-auto max-w-2xl text-left z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2 sm:gap-4 text-left w-full"
              >
                {/* Primary Headline */}
                <h1 className="font-display font-bold text-2xl min-[425px]:text-3xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[64px] 2xl:text-[72px] leading-[1.08] sm:leading-[1.05] tracking-tight text-white drop-shadow-xl text-left w-full">
                  {activeSlide.title}
                </h1>

                {/* Subtitle */}
                <div className="flex items-center gap-2 sm:gap-4 mt-0.5 sm:mt-1.5 text-left">
                  <div className="hidden sm:block w-8 sm:w-14 md:w-20 lg:w-28 h-[1.5px] bg-white/70 shadow-sm shrink-0" />
                  <span className="font-sans font-light text-stone-200 text-base min-[425px]:text-lg sm:text-2xl md:text-3xl lg:text-[36px] xl:text-[42px] tracking-wide leading-tight drop-shadow-md">
                    {activeSlide.subtitle}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. Bottom Controls Bar: Pagination Slide Indicators (Centered) */}
          <div className="w-full flex items-end justify-center gap-4 mt-auto pb-1 sm:pb-2 lg:pb-3 z-30">
            <div className="flex items-center gap-2 sm:gap-2.5 bg-black/40 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/15 z-30">
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

      {/* 4. Interactive Floating Contact Widget */}
      <FloatingContactWidget />
    </>
  );
}

export default HeroSection;
