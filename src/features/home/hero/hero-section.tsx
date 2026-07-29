'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSlide, TrustSignal } from '@/types/product';
import { Container } from '@/components/layout/container';
import { FloatingContactWidget } from '@/components/layout/floating-contact-widget';

interface HeroSectionProps {
  slides: HeroSlide[];
  trustSignals?: TrustSignal[];
}

export function HeroSection({ slides }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
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
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [handleNext, slides.length]);

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
      x: dir > 0 ? '8%' : '-8%',
      opacity: 0,
      scale: 1.06,
    }),
    center: {
      x: '0%',
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '8%' : '-8%',
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <>
      <section
        className="relative w-full h-[42vh] min-h-[290px] min-[425px]:h-[48vh] min-[425px]:min-h-[330px] sm:h-[75vh] sm:min-h-[520px] md:h-[85vh] lg:h-screen lg:min-h-[680px] bg-stone-950 overflow-hidden select-none"
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
              x: { duration: 0.9, ease: [0.25, 1, 0.5, 1] },
              opacity: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
              scale: { duration: 1.0, ease: [0.25, 1, 0.5, 1] },
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

        {/* 2. Hero Overlay Text Content */}
        <Container variant="wide" className="relative h-full flex flex-col justify-between py-6 sm:py-12 lg:py-16 z-20">
          <div className="my-auto max-w-2xl text-left z-20 pt-8 sm:pt-0 pb-2 sm:pb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2 sm:gap-4 text-left w-full"
              >
                {/* Primary Headline */}
                <h1 className="font-display font-bold text-2xl min-[375px]:text-3xl min-[425px]:text-4xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[64px] 2xl:text-[72px] leading-[1.1] sm:leading-[1.05] tracking-tight text-white drop-shadow-xl text-left w-full">
                  {activeSlide.title}
                </h1>

                {/* Subtitle */}
                <div className="flex items-center gap-2 sm:gap-4 mt-0.5 sm:mt-1 text-left">
                  <div className="hidden sm:block w-8 sm:w-14 md:w-20 lg:w-28 h-[1.5px] bg-white/70 shadow-sm shrink-0" />
                  <span className="font-sans font-light text-stone-200 text-sm min-[375px]:text-base min-[425px]:text-lg sm:text-2xl md:text-3xl lg:text-[36px] xl:text-[42px] tracking-wide leading-tight drop-shadow-md">
                    {activeSlide.subtitle}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. Bottom Controls Bar: Pagination Slide Indicators (Centered) */}
          <div className="w-full flex items-end justify-center gap-4 mt-auto pb-0.5 sm:pb-2 lg:pb-3 z-30">
            <div className="flex items-center gap-1.5 sm:gap-2.5 bg-black/40 backdrop-blur-md px-2.5 sm:px-4 py-1 sm:py-2 rounded-full border border-white/15 z-30">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setDirection(idx > current ? 1 : -1);
                    setCurrent(idx);
                  }}
                  className={`transition-all duration-300 cursor-pointer focus:outline-none ${
                    idx === current
                      ? 'w-5 sm:w-8 h-1 sm:h-2.5 rounded-full bg-white shadow-md shadow-white/40'
                      : 'w-1 sm:w-2.5 h-1 sm:h-2.5 rounded-full bg-white/40 hover:bg-white/70'
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
