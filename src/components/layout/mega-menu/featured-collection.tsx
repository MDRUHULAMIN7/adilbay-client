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
    <div className="w-[280px] flex flex-col gap-3 group bg-surface/20 p-3 rounded-card border border-border/40 hover:border-border/80 transition-colors shrink-0">
      <div className="relative h-[140px] w-full overflow-hidden rounded-lg bg-muted/30">
        <Image
          src={featured.image}
          alt={featured.title}
          fill
          sizes="280px"
          className="object-cover group-hover:scale-102 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Heading level={6} className="text-sm font-semibold text-foreground font-display">
          {featured.title}
        </Heading>
        <Text className="text-xs text-muted-foreground leading-normal">
          {featured.description}
        </Text>
        <Link
          href={featured.href}
          onClick={onItemClick}
          className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 mt-1.5 group/btn"
        >
          <span>{featured.ctaText}</span>
          <Icon name="arrowRight" className="h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
export default FeaturedCollection;
