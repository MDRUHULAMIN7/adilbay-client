'use client';

import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Container } from '@/components/layout/container';

export function WhyChooseUsSection() {
  const cards = [
    {
      id: 'materials',
      title: 'Premium Hardwoods',
      description: 'Handcrafted exclusively from Burmese Teak, American Walnut, and European Oak. Fully seasoned lumber.',
      icon: 'shieldCheck',
    },
    {
      id: 'delivery',
      title: 'White Glove Delivery',
      description: 'Professional assembly and placing in your rooms of choice inside major BD cities.',
      icon: 'truck',
    },
    {
      id: 'payment',
      title: 'Secure Payments',
      description: 'Support for cash on delivery, secure bKash, and credit card transactions with EMI plans.',
      icon: 'creditCard',
    },
    {
      id: 'support',
      title: 'Lifetime Guidance',
      description: 'Material care recommendations and joint repair supports for the lifetime of your product.',
      icon: 'avatar',
    },
  ];

  return (
    <section className="py-8 lg:py-10 bg-background">
      <Container variant="wide" className="flex flex-col gap-8">
        <div className="flex flex-col gap-1.5 max-w-xl text-left">
          <Heading level={2} className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-foreground">
            Why Furnixo Woodcrafts
          </Heading>
          <Text className="text-stone-500 text-xs sm:text-sm">
            We prioritize heritage-grade material durability and client satisfaction above all else.
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col gap-4 p-6  border border-border/40 bg-surface/20 hover:border-border/80 transition-colors"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit">
                <Icon name={card.icon as any} className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Heading level={4} className="font-display font-semibold text-base text-foreground tracking-tight">
                  {card.title}
                </Heading>
                <Text className="text-stone-500 text-xs leading-relaxed">
                  {card.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
export default WhyChooseUsSection;
