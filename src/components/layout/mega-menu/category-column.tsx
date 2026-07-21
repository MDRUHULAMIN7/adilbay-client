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
    <div className="grid grid-cols-3 gap-6 flex-1">
      {categories.map((cat) => (
        <div key={cat.id} className="flex flex-col gap-3">
          <Link
            href={cat.href}
            onClick={onItemClick}
            className="hover:text-primary transition-colors focus-visible:outline-none rounded"
          >
            <Heading level={5} className="font-display font-semibold text-sm text-foreground tracking-tight">
              {cat.label}
            </Heading>
          </Link>
          <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
            {cat.items.map((sub) => (
              <li key={sub.id}>
                <Link
                  href={sub.href}
                  onClick={onItemClick}
                  className="hover:text-primary hover:translate-x-0.5 transition-all block py-0.5 focus-visible:outline-none rounded"
                >
                  <span className="flex items-center gap-1.5">
                    <span>{sub.label}</span>
                    {sub.isNew && (
                      <span className="text-[9px] font-bold bg-primary/10 text-primary px-1 py-0.2 rounded-full uppercase scale-90">
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
