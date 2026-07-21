'use client';

import React from 'react';
import Image from 'next/image';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Container } from '@/components/layout/container';

export function InstagramGallerySection() {
  const images = [
    { id: 'ig-1', image: '/images/gallery/ig-1.jpg', alt: 'Teak dining room showcase' },
    { id: 'ig-2', image: '/images/gallery/ig-2.jpg', alt: 'Minimal oak bed frame style' },
    { id: 'ig-3', image: '/images/gallery/ig-3.jpg', alt: 'Burmese walnut coffee table detail' },
    { id: 'ig-4', image: '/images/gallery/ig-4.jpg', alt: 'Leather sofa oak armrest configuration' },
    { id: 'ig-5', image: '/images/gallery/ig-5.jpg', alt: 'Home study walnut shelf sets' },
    { id: 'ig-6', image: '/images/gallery/ig-6.jpg', alt: 'Outdoor teak chair design' },
  ];

  return (
    <section className="py-16 bg-background">
      <Container variant="wide" className="flex flex-col gap-8">
        <div className="flex flex-col gap-1.5 max-w-xl text-left">
          <Heading level={2} className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-foreground">
            Inspired Living on Instagram
          </Heading>
          <Text className="text-stone-500 text-xs sm:text-sm">
            Tag us with <strong>#FurnixoHome</strong> to get featured in our editorial gallery streams.
          </Text>
        </div>

        {/* Responsive Grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square w-full overflow-hidden rounded-card bg-muted/20 border border-border/40 shadow-soft group cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 200px"
                className="object-cover group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />
              {/* Hover overlay with Instagram logo */}
              <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-stone-50">
                <Icon name="instagram" className="h-6 w-6" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
export default InstagramGallerySection;
