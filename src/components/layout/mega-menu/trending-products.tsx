import React from 'react';
import Link from 'next/link';
import { MegaMenuProduct } from '@/types/layout';
import { Heading } from '../../ui/heading';
import { Text } from '../../ui/text';

interface TrendingProductsProps {
  products: MegaMenuProduct[];
  onItemClick?: () => void;
}

export function TrendingProducts({ products, onItemClick }: TrendingProductsProps) {
  return (
    <div className="w-[240px] flex flex-col gap-3 shrink-0 border-l border-border/60 pl-6">
      <Heading level={5} className="font-display font-semibold text-xs text-foreground uppercase tracking-wider">
        Trending Items
      </Heading>
      <ul className="flex flex-col gap-2">
        {products.map((prod) => (
          <li key={prod.id}>
            <Link
              href={prod.href}
              onClick={onItemClick}
              className="group flex items-start justify-between gap-2 p-2 rounded-lg hover:bg-surface/30 transition-all focus-visible:outline-none"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 group-hover:text-primary transition-colors leading-tight">
                  {prod.label}
                </span>
                {prod.price && (
                  <Text className="text-[10px] text-muted-foreground font-medium">
                    {prod.price}
                  </Text>
                )}
              </div>
              {prod.isHot && (
                <span className="text-[8px] font-bold bg-destructive/15 text-destructive px-1.5 py-0.5 rounded-full uppercase shrink-0 leading-none self-start mt-0.5">
                  Hot
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TrendingProducts;
