import React from 'react';
import Link from 'next/link';
import { MegaMenuCategory } from '@/types/layout';
import { Heading } from '../../ui/heading';

interface CategoryColumnProps {
  categories: MegaMenuCategory[];
  onItemClick?: () => void;
}

export function CategoryColumn({ categories, onItemClick }: CategoryColumnProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {categories.map((cat) => (
        <div key={cat.id} className="flex flex-col gap-2.5 text-left">
          <Link
            href={cat.href}
            onClick={onItemClick}
            className="group hover:text-primary transition-colors focus-visible:outline-none rounded inline-block"
          >
            <Heading level={5} className="font-display font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 tracking-tight group-hover:text-primary transition-colors uppercase">
              {cat.label}
            </Heading>
          </Link>
          <ul className="flex flex-col gap-1 text-xs text-stone-600 dark:text-stone-300">
            {cat.items.map((sub) => (
              <li key={sub.id}>
                <Link
                  href={sub.href}
                  onClick={onItemClick}
                  className="hover:text-primary hover:bg-primary/10 px-2 py-1 -mx-2 rounded-lg transition-all block focus-visible:outline-none whitespace-normal leading-relaxed font-semibold text-stone-600 dark:text-stone-300"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span>{sub.label}</span>
                    {sub.isNew && (
                      <span className="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full uppercase leading-none">
                        New
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
export default CategoryColumn;
