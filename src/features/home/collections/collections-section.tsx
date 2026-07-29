'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { ROUTES } from '@/constants/routes';

interface CollectionsSectionProps {
  collections?: unknown[];
}

export function CollectionsSection({ collections }: CollectionsSectionProps = {}) {
  return (
    <section className="py-16 lg:py-28 bg-stone-50/50 dark:bg-stone-950/40 border-y border-stone-200/60 dark:border-stone-800/60 select-none">
      <Container variant="wide" className="flex flex-col gap-16 lg:gap-24">

        {/* ========================================================================= */}
        {/* BLOCK 1: HOME POPULAR CHOICE (2 Cards per Row on Mobile)                  */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-8">
          {/* Section Header: Clean Title Only */}
          <div className="flex justify-start text-left">
            <Heading
              level={2}
              className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 dark:text-white tracking-tight"
            >
              Home Popular Choice
            </Heading>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4 lg:gap-6">
            {/* Left Column: 2 Stacked Items (2 Columns on Mobile) */}
            <div className="col-span-2 md:col-span-3 grid grid-cols-2 md:flex md:flex-col gap-3 sm:gap-4 lg:gap-6">
              {/* Item 1 */}
              <Link href={ROUTES.SHOP} className="group relative flex-1 min-h-[220px] sm:min-h-[310px] md:min-h-[320px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/products/oak-cabinet-1.jpg"
                  alt="Dressing Vanity Unit"
                  fill
                  sizes="(max-width: 768px) 50vw, 350px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xs sm:text-base font-bold text-white flex items-center justify-between gap-2">
                    <span>Dressing Vanity Unit</span>
                    <Icon name="arrowRight" className="h-4 w-4 text-white shrink-0" />
                  </h3>
                </div>
              </Link>

              {/* Item 2 */}
              <Link href={ROUTES.SHOP} className="group relative flex-1 min-h-[220px] sm:min-h-[310px] md:min-h-[320px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/categories/living.jpg"
                  alt="Nordic Sectional Sofa"
                  fill
                  sizes="(max-width: 768px) 50vw, 350px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xs sm:text-base font-bold text-white flex items-center justify-between gap-2">
                    <span>Nordic Sectional Sofa</span>
                    <Icon name="arrowRight" className="h-4 w-4 text-white shrink-0" />
                  </h3>
                </div>
              </Link>
            </div>

            {/* Middle Column: 1 Hero Tall Bed Item */}
            <div className="col-span-2 md:col-span-6 flex">
              <Link href={ROUTES.SHOP} className="group relative w-full min-h-[380px] sm:min-h-[520px] md:min-h-[660px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end">
                <Image
                  src="/images/products/walnut-bed-1.jpg"
                  alt="Royal Teakwood Master Bed"
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-5 sm:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg sm:text-2xl font-display font-bold text-white flex items-center justify-between gap-2">
                    <span>Royal Teakwood Master Bed</span>
                    <Icon name="arrowRight" className="h-5 w-5 text-white shrink-0" />
                  </h3>
                </div>
              </Link>
            </div>

            {/* Right Column: 2 Stacked Items (2 Columns on Mobile) */}
            <div className="col-span-2 md:col-span-3 grid grid-cols-2 md:flex md:flex-col gap-3 sm:gap-4 lg:gap-6">
              {/* Item 3 */}
              <Link href={ROUTES.SHOP} className="group relative flex-1 min-h-[220px] sm:min-h-[310px] md:min-h-[320px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/products/teak-dining-1.jpg"
                  alt="Marble & Velvet Dining"
                  fill
                  sizes="(max-width: 768px) 50vw, 350px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xs sm:text-base font-bold text-white flex items-center justify-between gap-2">
                    <span>Marble & Velvet Dining</span>
                    <Icon name="arrowRight" className="h-4 w-4 text-white shrink-0" />
                  </h3>
                </div>
              </Link>

              {/* Item 4 */}
              <Link href={ROUTES.SHOP} className="group relative flex-1 min-h-[220px] sm:min-h-[310px] md:min-h-[320px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/products/oak-cabinet-2.jpg"
                  alt="Open Closet Storage"
                  fill
                  sizes="(max-width: 768px) 50vw, 350px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xs sm:text-base font-bold text-white flex items-center justify-between gap-2">
                    <span>Open Closet Storage</span>
                    <Icon name="arrowRight" className="h-4 w-4 text-white shrink-0" />
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </div>


        {/* ========================================================================= */}
        {/* BLOCK 2: OFFICE POPULAR CHOICE (2 Cards per Row on Mobile)                */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-8">
          {/* Section Header: Clean Title Only */}
          <div className="flex justify-start text-left">
            <Heading
              level={2}
              className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 dark:text-white tracking-tight"
            >
              Office Popular Choice
            </Heading>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4 lg:gap-6">
            {/* Left 2x2 Grid */}
            <div className="col-span-2 md:col-span-6 grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {/* Item 1 */}
              <Link href={ROUTES.SHOP} className="group relative min-h-[220px] sm:min-h-[310px] md:min-h-[320px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/products/ash-chair-1.jpg"
                  alt="Pro Lumbar Task Chair"
                  fill
                  sizes="(max-width: 768px) 50vw, 350px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xs sm:text-base font-bold text-white flex items-center justify-between gap-2">
                    <span>Ergonomic Task Chair</span>
                    <Icon name="arrowRight" className="h-4 w-4 text-white shrink-0" />
                  </h3>
                </div>
              </Link>

              {/* Item 2 */}
              <Link href={ROUTES.SHOP} className="group relative min-h-[220px] sm:min-h-[310px] md:min-h-[320px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/categories/office.jpg"
                  alt="Modular Office Cubicle"
                  fill
                  sizes="(max-width: 768px) 50vw, 350px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xs sm:text-base font-bold text-white flex items-center justify-between gap-2">
                    <span>Modular Team Workstation</span>
                    <Icon name="arrowRight" className="h-4 w-4 text-white shrink-0" />
                  </h3>
                </div>
              </Link>

              {/* Item 3 */}
              <Link href={ROUTES.SHOP} className="group relative min-h-[220px] sm:min-h-[310px] md:min-h-[320px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/products/walnut-desk-1.jpg"
                  alt="Presidential Executive Desk"
                  fill
                  sizes="(max-width: 768px) 50vw, 350px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xs sm:text-base font-bold text-white flex items-center justify-between gap-2">
                    <span>Presidential Executive Desk</span>
                    <Icon name="arrowRight" className="h-4 w-4 text-white shrink-0" />
                  </h3>
                </div>
              </Link>

              {/* Item 4 */}
              <Link href={ROUTES.SHOP} className="group relative min-h-[220px] sm:min-h-[310px] md:min-h-[320px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/collections/walnut.jpg"
                  alt="Minimalist Reception Desk"
                  fill
                  sizes="(max-width: 768px) 50vw, 350px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xs sm:text-base font-bold text-white flex items-center justify-between gap-2">
                    <span>Minimalist Reception Desk</span>
                    <Icon name="arrowRight" className="h-4 w-4 text-white shrink-0" />
                  </h3>
                </div>
              </Link>
            </div>

            {/* Right Column: Hero Desk Item */}
            <div className="col-span-2 md:col-span-6 flex">
              <Link href={ROUTES.SHOP} className="group relative w-full min-h-[380px] sm:min-h-[520px] md:min-h-[660px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end">
                <Image
                  src="/images/products/walnut-desk-2.jpg"
                  alt="Executive Computer WFH Desk"
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-5 sm:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg sm:text-2xl font-display font-bold text-white flex items-center justify-between gap-2">
                    <span>Executive Computer WFH Desk</span>
                    <Icon name="arrowRight" className="h-5 w-5 text-white shrink-0" />
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </div>


        {/* ========================================================================= */}
        {/* BLOCK 3: CHAIR POPULAR CHOICE (2 Cards per Row on Mobile)                 */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-8">
          {/* Section Header: Clean Title Only */}
          <div className="flex justify-start text-left">
            <Heading
              level={2}
              className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 dark:text-white tracking-tight"
            >
              Chair Popular Choice
            </Heading>
          </div>

          {/* 3-Column Collage Grid */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4 lg:gap-6">
            {/* Left Column: 1 Tall Hero Chair */}
            <div className="col-span-2 md:col-span-5 flex">
              <Link href={ROUTES.SHOP} className="group relative w-full min-h-[380px] sm:min-h-[520px] md:min-h-[660px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end">
                <Image
                  src="/images/chairs/chair-2.png"
                  alt="Bouclé Rocking Armchair"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-5 sm:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg sm:text-2xl font-display font-bold text-white flex items-center justify-between gap-2">
                    <span>Bouclé Rocking Armchair</span>
                    <Icon name="arrowRight" className="h-5 w-5 text-white shrink-0" />
                  </h3>
                </div>
              </Link>
            </div>

            {/* Middle Column: 2 Stacked Chair Items (2 Columns on Mobile) */}
            <div className="col-span-2 md:col-span-3 grid grid-cols-2 md:flex md:flex-col gap-3 sm:gap-4 lg:gap-6">
              {/* Item 1 */}
              <Link href={ROUTES.SHOP} className="group relative flex-1 min-h-[220px] sm:min-h-[310px] md:min-h-[320px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/chairs/chair-3.png"
                  alt="Nordic Blue Dining Chair"
                  fill
                  sizes="(max-width: 768px) 50vw, 350px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xs sm:text-base font-bold text-white flex items-center justify-between gap-2">
                    <span>Nordic Blue Dining Chair</span>
                    <Icon name="arrowRight" className="h-4 w-4 text-white shrink-0" />
                  </h3>
                </div>
              </Link>

              {/* Item 2 */}
              <Link href={ROUTES.SHOP} className="group relative flex-1 min-h-[220px] sm:min-h-[310px] md:min-h-[320px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/chairs/chair-1.png"
                  alt="Ergonomic Red Task Chair"
                  fill
                  sizes="(max-width: 768px) 50vw, 350px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xs sm:text-base font-bold text-white flex items-center justify-between gap-2">
                    <span>Ergonomic Red Task Chair</span>
                    <Icon name="arrowRight" className="h-4 w-4 text-white shrink-0" />
                  </h3>
                </div>
              </Link>
            </div>

            {/* Right Column: 2 Stacked Chair Items (2 Columns on Mobile) */}
            <div className="col-span-2 md:col-span-4 grid grid-cols-2 md:flex md:flex-col gap-3 sm:gap-4 lg:gap-6">
              {/* Item 3 */}
              <Link href={ROUTES.SHOP} className="group relative flex-1 min-h-[220px] sm:min-h-[310px] md:min-h-[320px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/chairs/chair-4.png"
                  alt="Pro Grey Swivel Desk Chair"
                  fill
                  sizes="(max-width: 768px) 50vw, 400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xs sm:text-base font-bold text-white flex items-center justify-between gap-2">
                    <span>Pro Grey Swivel Desk Chair</span>
                    <Icon name="arrowRight" className="h-4 w-4 text-white shrink-0" />
                  </h3>
                </div>
              </Link>

              {/* Item 4 */}
              <Link href={ROUTES.SHOP} className="group relative flex-1 min-h-[220px] sm:min-h-[310px] md:min-h-[320px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/chairs/chair-5.png"
                  alt="Racing Ergonomic Gaming Chair"
                  fill
                  sizes="(max-width: 768px) 50vw, 400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xs sm:text-base font-bold text-white flex items-center justify-between gap-2">
                    <span>Racing Ergonomic Gaming Chair</span>
                    <Icon name="arrowRight" className="h-4 w-4 text-white shrink-0" />
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}

export default CollectionsSection;
