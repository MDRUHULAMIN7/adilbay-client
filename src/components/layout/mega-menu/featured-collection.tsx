import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MegaMenuFeatured } from '@/types/layout';
import { Heading } from '../../ui/heading';
import { Text } from '../../ui/text';
import { Icon } from '../../ui/icon';

interface FeaturedCollectionProps {
  featured: MegaMenuFeatured;
  onItemClick?: () => void;
}

export function FeaturedCollection({ featured, onItemClick }: FeaturedCollectionProps) {
  return (
    <div className="w-full flex flex-col gap-3 group bg-stone-100/70 dark:bg-stone-900/70 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-primary/40 transition-all">
      <div className="relative h-[150px] w-full overflow-hidden rounded-xl bg-stone-200 dark:bg-stone-800">
        <Image
          src={featured.image}
          alt={featured.title}
          fill
          sizes="300px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Heading level={6} className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display">
          {featured.title}
        </Heading>
        <Text className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2">
          {featured.description}
        </Text>
        <Link
          href={featured.href}
          onClick={onItemClick}
          className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1.5 mt-2 group/btn"
        >
          <span>{featured.ctaText}</span>
          <Icon name="arrowRight" className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
export default FeaturedCollection;
