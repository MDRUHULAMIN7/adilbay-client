'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Collection } from '@/types/product';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { Icon } from '@/components/ui/icon';

interface CollectionsSectionProps {
  collections: Collection[];
}

export function CollectionsSection({ collections }: CollectionsSectionProps) {
  return (
    <section className="py-8 lg:py-10 bg-stone-50 dark:bg-stone-950/10 border-y border-border/40">
      <Container variant="wide" className="flex flex-col">
        <div className="flex flex-col gap-1.5 max-w-xl text-left">
          <Heading level={2} className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-foreground">
            Curated Collections
          </Heading>
          <Text className="text-stone-500 text-xs sm:text-sm">
            Curated furniture collections inspired by worldwide interior layout styles.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
          {collections.map((col) => (
            <div
              key={col.id}
              className="flex flex-col gap-4 group bg-background  transition-all"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted/20">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover group-hover:scale-101 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-3 flex-1 justify-between pt-1">
                <div className="flex flex-col gap-1.5">
                  <Heading level={3} className="font-display font-bold text-lg text-foreground tracking-tight">
                    {col.title}
                  </Heading>
                  <Text className="text-stone-500 text-xs leading-relaxed">
                    {col.description}
                  </Text>
                </div>
                <Link href={col.href} className="inline-flex mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    rightIcon={
                      <Icon
                        name="arrowRight"
                        className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform"
                      />
                    }
                    className="text-xs font-bold text-primary hover:bg-transparent -ml-3 cursor-pointer"
                  >
                    {col.ctaText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
export default CollectionsSection;
