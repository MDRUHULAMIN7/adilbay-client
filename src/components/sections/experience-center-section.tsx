'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Icon } from '@/components/ui/icon';

export interface ExperienceCenterSectionProps {
  className?: string;
}

export function ExperienceCenterSection({ className = '' }: ExperienceCenterSectionProps) {
  return (
    <section className={`py-12 sm:py-16 bg-background text-foreground text-left ${className}`}>
      <Container variant="wide" className="flex flex-col gap-8 sm:gap-10">
        {/* Section Header (Left Aligned) */}
        <div className="flex flex-col items-start text-left gap-2 max-w-2xl">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-foreground tracking-tight">
            Visit Our <span className="relative inline-block text-primary">
              Experience Center
              <span className="absolute left-0 right-0 -bottom-1 h-1 bg-primary rounded-full" />
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-medium mt-1">
            Experience premium seasoned woodcraft furniture directly at our Bangladesh Head Office &amp; Outlet.
          </p>
        </div>

        {/* Experience Center Card Grid (Taller Height + Theme Color Matching) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 dark:border-stone-800 bg-card">
          {/* Left Column: Dark Info Card matching Theme Colors & Elevated Height */}
          <div className="lg:col-span-5 bg-stone-900 dark:bg-stone-950 text-white p-8 sm:p-11 flex flex-col justify-between gap-10 relative border-l-4 border-primary min-h-[480px] sm:min-h-[540px]">
            <div className="flex flex-col gap-8">
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                Serving Dhaka &amp; All of <span className="text-primary">Bangladesh</span>
              </h3>

              <div className="flex flex-col gap-7 text-left">
                {/* Item 1: Address */}
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary border border-primary/25 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon name="mapPin" className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col text-xs sm:text-sm gap-0.5">
                    <span className="font-extrabold text-primary uppercase tracking-widest text-[10px]">
                      ADDRESS
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

            {/* Action Buttons Row: Get Directions + Support Button Linked to /contact */}
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

              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <Icon name="messageSquare" className="h-4 w-4 text-primary" />
                <span>Contact Support</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Increased Height Google Maps Embed */}
          <div className="lg:col-span-7 relative min-h-[480px] sm:min-h-[540px] bg-stone-100 dark:bg-stone-900">
            {/* Open in Maps Floating Badge */}
            <a
              href="https://maps.google.com/maps?q=Road+-7,+Block+-+A,+Mirpur+-+1,+Dhaka,+Bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 left-4 z-10 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-primary font-bold text-xs border border-stone-200 dark:border-stone-700 shadow-md hover:bg-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Open in Maps</span>
              <Icon name="externalLink" className="h-3.5 w-3.5" />
            </a>

            {/* Interactive Google Maps Iframe */}
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
