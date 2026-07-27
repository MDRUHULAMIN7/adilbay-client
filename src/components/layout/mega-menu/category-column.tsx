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
        <div key={cat.id} className="flex flex-col gap-2.5">
          <Link
            href={cat.href}
            onClick={onItemClick}
            className="hover:text-primary transition-colors focus-visible:outline-none rounded inline-block"
          >
            <Heading level={5} className="font-display font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 tracking-tight hover:text-primary transition-colors uppercase">
              {cat.label}
            </Heading>
          </Link>
          <ul className="flex flex-col gap-1.5 text-xs text-stone-600 dark:text-stone-400">
            {cat.items.map((sub) => (
              <li key={sub.id}>
                <Link
                  href={sub.href}
                  onClick={onItemClick}
                  className="hover:text-primary transition-colors block py-0.5 focus-visible:outline-none rounded whitespace-normal leading-relaxed"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span className="hover:underline">{sub.label}</span>
                    {sub.isNew && (
                      <span className="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.2 rounded-full uppercase leading-none">
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
