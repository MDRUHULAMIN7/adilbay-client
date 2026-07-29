import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';

import { PageHeader } from '@/components/layout/page-header';

export const metadata = {
  title: 'About Us - Furnixo Woodcraft Studio',
  description:
    'Discover the story behind Furnixo solid wood furniture. Seasoned Burmese teak, American walnut, and sustainable craftsmanship built for generations.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      {/* Senior UI/UX PageHeader with Furniture Overlay Image & Breadcrumb Navigation */}
      <PageHeader
        title="Sculpting Pure Solid Timber for Contemporary Homes"
        badge="Master Craftsmen Since 2012"
        description="At Furnixo, we believe furniture isn’t disposable. We season raw Burmese Teak, American Walnut, and Nordic Ash to create solid wood creations engineered to outlast generations."
        backgroundImage="/images/auth-bg.jpg"
        items={[
          { label: 'About Us' },
        ]}
      />

      {/* Stats Counter Section */}
      <section className="py-10 bg-card border-b border-border/40">
        <Container variant="wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col gap-1">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-primary">12+</span>
              <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">Years of Crafting</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-primary">15,000+</span>
              <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">Homes Furnished</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-primary">100%</span>
              <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">Seasoned Wood</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-primary">10-Yr</span>
              <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">Timber Warranty</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Craftsmanship & Sustainability Values */}
      <section className="py-16">
        <Container variant="wide" className="flex flex-col gap-12 text-left">
          <div className="flex flex-col gap-2 max-w-2xl">
            <Heading level={2} className="font-display font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
              Our Core Crafting Philosophy
            </Heading>
            <Text className="text-stone-500 text-sm">
              We merge traditional Japanese joinery with modern Scandinavian minimal architecture.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-card border border-border/60 shadow-soft flex flex-col gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon name="tree" className="h-6 w-6" />
              </div>
              <Heading level={3} className="font-display font-bold text-lg text-foreground">
                Sustainably Sourced Timber
              </Heading>
              <Text className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                Every log of wood used in our workshop originates from certified sustainable plantation forests with zero illegal logging.
              </Text>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-card border border-border/60 shadow-soft flex flex-col gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon name="flame" className="h-6 w-6" />
              </div>
              <Heading level={3} className="font-display font-bold text-lg text-foreground">
                Kiln-Dry Seasoning
              </Heading>
              <Text className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                Our timber undergoes 45 days of computer-monitored kiln drying to ensure 8-12% moisture retention, preventing warping or cracking.
              </Text>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-card border border-border/60 shadow-soft flex flex-col gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon name="shieldCheck" className="h-6 w-6" />
              </div>
              <Heading level={3} className="font-display font-bold text-lg text-foreground">
                Eco-Friendly Natural Polish
              </Heading>
              <Text className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                We finish our solid wood with non-toxic Italian lacquer and natural beeswax oils safe for children and pets.
              </Text>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-stone-900 text-white text-center border-t border-border/40">
        <Container variant="wide" className="flex flex-col items-center gap-6 max-w-2xl">
          <Heading level={2} className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight">
            Ready to Upgrade Your Living Space?
          </Heading>
          <Text className="text-stone-300 text-sm leading-relaxed">
            Browse our complete catalog of solid Burmese teak and walnut furniture or visit our flagship Dhaka showroom.
          </Text>
          <div className="flex gap-4 pt-2">
            <Link href="/shop">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer">
                Explore Catalog
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-white/30 hover:bg-white hover:text-stone-900 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all cursor-pointer">
                Visit Showroom
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
