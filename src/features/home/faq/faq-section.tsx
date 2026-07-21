'use client';

import React from 'react';
import { FAQItem } from '@/data/home/faq';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Container } from '@/components/layout/container';

interface FaqSectionProps {
  faqs: FAQItem[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  return (
    <section className="py-16 bg-background">
      <Container variant="wide" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-5 flex flex-col gap-2.5 text-left">
          <Heading level={2} className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-foreground">
            Frequently Asked Queries
          </Heading>
          <Text className="text-stone-500 text-xs sm:text-sm leading-relaxed">
            Everything you need to know about our premium solid wood crafting procedures, durability warranties, and shipping timelines.
          </Text>
        </div>

        <div className="lg:col-span-7 w-full">
          <Accordion type="single" className="w-full border-none">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b border-border/40">
                <AccordionTrigger className="py-4 text-sm font-semibold hover:no-underline text-foreground text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-xs sm:text-sm text-stone-500 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
export default FaqSection;
