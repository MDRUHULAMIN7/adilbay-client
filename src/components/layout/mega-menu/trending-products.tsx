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
    <div className="w-full flex flex-col gap-3 text-left">
      <Heading level={5} className="font-display font-bold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-widest">
        Trending Items
      </Heading>
      <ul className="flex flex-col gap-2">
        {products.map((prod) => (
          <li key={prod.id}>
            <Link
              href={prod.href}
              onClick={onItemClick}
              className="group flex items-start justify-between gap-2 p-2.5 rounded-xl hover:bg-primary/10 dark:hover:bg-amber-400/10 transition-all focus-visible:outline-none border border-transparent hover:border-primary/20 dark:hover:border-amber-400/30"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover:text-primary dark:group-hover:text-amber-300 transition-colors leading-snug">
                  {prod.label}
                </span>
                {prod.price && (
                  <Text className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                    {prod.price}
                  </Text>
                )}
              </div>
              {prod.isHot && (
                <span className="text-[9px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 px-1.5 py-0.5 rounded-full uppercase shrink-0 leading-none self-start mt-0.5">
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
