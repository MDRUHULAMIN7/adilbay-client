'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { ROUTES } from '@/constants/routes';

const REEL_FRAMES = [
  {
    id: 1,
    title: 'Scandinavian Studio Chair',
    image: '/images/gallery/shorts-1.png',
    category: 'Study & Office',
  },
  {
    id: 2,
    title: 'Nordic Sunlit Armchair',
    image: '/images/gallery/shorts-2.png',
    category: 'Living Lounge',
  },
  {
    id: 3,
    title: 'Mid-Century Timber Desk',
    image: '/images/gallery/shorts-3.png',
    category: 'Home Office',
  },
  {
    id: 4,
    title: 'Sunset Velvet Accent Chair',
    image: '/images/gallery/shorts-4.png',
    category: 'Accent Lounge',
  },
  {
    id: 5,
    title: 'Teal Luxury Living Suite',
    image: '/images/gallery/shorts-5.png',
    category: 'Living Room',
  },
];

export function NewArrivalsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Visible cards per view on desktop is 3. Max index is 5 - 3 = 2 so no empty screen appears!
  const maxIndex = Math.max(0, REEL_FRAMES.length - 3);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="py-12 lg:py-16 bg-background select-none overflow-hidden">
      <Container variant="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Perfectly Left-Aligned Heading & Subtitle matching left container edge */}
          <div className="lg:col-span-4 flex flex-col items-start text-left gap-3 lg:gap-4">
            <Heading
              level={2}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-foreground text-left"
            >
              Latest Furnixo shorts
            </Heading>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-sm leading-relaxed text-left">
              Take a glance and grab ideas from the artistic frames of Furnixo.
            </p>

            <Link
              href={ROUTES.SHOP}
              className="inline-block text-sm sm:text-base text-foreground font-medium text-left mt-1 hover:text-primary transition-colors cursor-pointer"
            >
              Explore to view more interior{' '}
              <span className="border-b-2 border-foreground hover:border-primary pb-0.5 font-bold transition-colors">
                ideas
              </span>
            </Link>
          </div>

          {/* Right Column: Swiper-Style 60fps Hardware-Accelerated translate3d Slide Track */}
          <div className="lg:col-span-8 relative">
            {/* Floating Left Circular Arrow Button */}
            <button
              onClick={prevSlide}
              aria-label="Previous interior slide"
              className="absolute left-2 sm:-left-4 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-white shadow-2xl border border-stone-200/80 dark:border-stone-800 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
            >
              <Icon name="chevronLeft" className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Floating Right Circular Arrow Button */}
            <button
              onClick={nextSlide}
              aria-label="Next interior slide"
              className="absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-white shadow-2xl border border-stone-200/80 dark:border-stone-800 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
            >
              <Icon name="chevronRight" className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Continuous Swiper-Style Horizontal Slide Track */}
            <div className="w-full overflow-hidden py-1">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  transform: `translate3d(-${(currentIndex * 100) / 3}%, 0px, 0px)`,
                }}
              >
                {REEL_FRAMES.map((frame) => (
                  <div
                    key={frame.id}
                    className="w-1/2 sm:w-1/3 shrink-0 px-1.5 sm:px-2"
                  >
                    <div className="relative aspect-[3/5] w-full overflow-hidden rounded-lg bg-stone-900 shadow-md cursor-pointer">
                      {/* Image without hover zoom distortion */}
                      <Image
                        src={frame.image}
                        alt={frame.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />

                      {/* Dark Vignette Overlay for Crisp Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80" />

                      {/* Bottom Frame Label */}
                      <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-stone-300 block mb-0.5">
                          {frame.category}
                        </span>
                        <h3 className="font-display font-bold text-xs sm:text-sm text-white line-clamp-1">
                          {frame.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default NewArrivalsSection;
