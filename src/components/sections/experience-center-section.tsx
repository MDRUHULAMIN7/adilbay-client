'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { Icon } from '@/components/ui/icon';

export interface ExperienceCenterSectionProps {
  className?: string;
}

export function ExperienceCenterSection({ className = '' }: ExperienceCenterSectionProps) {
  return (
    <section className={`py-14 sm:py-20 bg-background text-foreground text-left ${className}`}>
      <Container variant="wide" className="flex flex-col gap-12">
        {/* About Furnixo Brand Story Card */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 dark:bg-stone-950 text-white p-8 sm:p-12 lg:p-16 border border-stone-800 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-[11px] font-extrabold uppercase tracking-widest w-fit">
                <Icon name="star" className="h-3.5 w-3.5 text-primary fill-primary" />
                About Furnixo Heritage &amp; Craft
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-stone-100 tracking-tight leading-tight">
                Crafting Timeless <span className="text-primary italic">Solid Teak Wood</span> For Modern Homes
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                Furnixo is Bangladesh&apos;s premier timber woodcraft studio. We specialize in 100% seasoned Segun (Teak) wood furniture handcrafted by master artisans. Every piece is kiln-dried, termite-resistant, and built with precision to last generations.
              </p>

              {/* 3 Value Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1 text-center">
                  <span className="font-display font-extrabold text-lg sm:text-2xl text-primary">100%</span>
                  <span className="text-[10px] sm:text-xs text-stone-400 font-medium uppercase tracking-wider">Seasoned Teak</span>
                </div>
                <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1 text-center">
                  <span className="font-display font-extrabold text-lg sm:text-2xl text-primary">10 Yrs</span>
                  <span className="text-[10px] sm:text-xs text-stone-400 font-medium uppercase tracking-wider">Timber Warranty</span>
                </div>
                <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1 text-center">
                  <span className="font-display font-extrabold text-lg sm:text-2xl text-primary">15k+</span>
                  <span className="text-[10px] sm:text-xs text-stone-400 font-medium uppercase tracking-wider">Happy Homes</span>
                </div>
              </div>
            </div>

            {/* Right Artisan Showcase Image */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-xl group">
              <Image
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800"
                alt="Furnixo Artisan Craftsmanship Studio"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-stone-900/90 backdrop-blur-md border border-stone-700/60 text-xs text-stone-200">
                <span className="font-bold text-primary block">Master Artisan Workshop &bull; Mirpur, Dhaka</span>
                <span className="text-[10px] text-stone-400">Directly visit our flagship showroom to feel wood textures in person.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Center Showcase Header */}
        <div className="flex flex-col items-start text-left gap-2 max-w-2xl">
          <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-foreground tracking-tight">
            Visit Our <span className="relative inline-block text-primary">
              Experience Center
              <span className="absolute left-0 right-0 -bottom-1 h-1 bg-primary rounded-full" />
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-medium mt-1">
            Experience our premium seasoned furniture range directly at our Mirpur 1 Head Office &amp; Flagship Outlet.
          </p>
        </div>

        {/* Experience Center Location & Map Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 dark:border-stone-800 bg-card">
          {/* Left Info Column */}
          <div className="lg:col-span-5 bg-stone-900 dark:bg-stone-950 text-white p-8 sm:p-11 flex flex-col justify-between gap-10 relative border-l-4 border-primary min-h-[480px] sm:min-h-[540px]">
            <div className="flex flex-col gap-8">
              <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                Serving Dhaka &amp; All of <span className="text-primary">Bangladesh</span>
              </h4>

              <div className="flex flex-col gap-7 text-left">
                {/* Item 1: Address */}
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary border border-primary/25 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon name="mapPin" className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col text-xs sm:text-sm gap-0.5">
                    <span className="font-extrabold text-primary uppercase tracking-widest text-[10px]">
                      FLAGSHIP ADDRESS
                    </span>
                    <span className="text-stone-200 font-semibold leading-relaxed">
                      Road -7, Block - A, Mirpur - 1, Dhaka, Bangladesh
                    </span>
                  </div>
                </div>

                {/* Item 2: Contact */}
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary border border-primary/25 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon name="phone" className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col text-xs sm:text-sm gap-0.5">
                    <span className="font-extrabold text-primary uppercase tracking-widest text-[10px]">
                      CONTACT HOTLINES
                    </span>
                    <span className="text-stone-200 font-semibold font-mono">
                      +880 1742-643763 / +880 9611 330265
                    </span>
                  </div>
                </div>

                {/* Item 3: Opening Hours */}
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary border border-primary/25 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon name="clock" className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col text-xs sm:text-sm gap-0.5">
                    <span className="font-extrabold text-primary uppercase tracking-widest text-[10px]">
                      OPENING HOURS
                    </span>
                    <span className="text-stone-200 font-semibold">
                      Daily: 10:00 AM &ndash; 10:00 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-3.5 flex-wrap pt-4 border-t border-white/10">
              <a
                href="https://maps.google.com/maps?q=Road+-7,+Block+-+A,+Mirpur+-+1,+Dhaka,+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all hover:scale-105 cursor-pointer"
              >
                <span>Get Directions</span>
                <Icon name="externalLink" className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://wa.me/8801742643763?text=Hi%20Furnixo!%20I%20would%20like%20to%20book%20a%20visit%20to%20your%20Mirpur%20Experience%20Center."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all hover:scale-105 cursor-pointer"
              >
                <Icon name="messageSquare" className="h-4 w-4" />
                <span>Book Showroom Visit</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-7 relative min-h-[480px] sm:min-h-[540px] bg-stone-100 dark:bg-stone-900">
            <a
              href="https://maps.google.com/maps?q=Road+-7,+Block+-+A,+Mirpur+-+1,+Dhaka,+Bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 left-4 z-10 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-primary font-bold text-xs border border-stone-200 dark:border-stone-700 shadow-md hover:bg-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Open in Maps</span>
              <Icon name="externalLink" className="h-3.5 w-3.5" />
            </a>

            <iframe
              title="Furnixo Mirpur Dhaka Experience Center Location"
              src="https://maps.google.com/maps?q=Road+-7,+Block+-+A,+Mirpur+-+1,+Dhaka,+Bangladesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 min-h-[480px] sm:min-h-[540px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ExperienceCenterSection;
