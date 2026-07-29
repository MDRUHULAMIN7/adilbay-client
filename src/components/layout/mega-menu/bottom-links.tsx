import React from 'react';
import Link from 'next/link';
import { Icon } from '../../ui/icon';

interface BottomLinksProps {
  links: { label: string; href: string }[];
  onItemClick?: () => void;
}

export function BottomLinks({ links, onItemClick }: BottomLinksProps) {
  return (
    <div className="border-t border-stone-200/80 dark:border-stone-800 pt-4 mt-5 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-stone-500 dark:text-stone-400">
      <div className="flex items-center gap-5 flex-wrap">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={onItemClick}
            className="hover:text-primary dark:hover:text-amber-300 hover:bg-primary/10 dark:hover:bg-amber-400/10 px-2 py-1 rounded-lg transition-all flex items-center gap-1.5 focus-visible:outline-none"
          >
            <Icon name="check" className="h-3.5 w-3.5 text-primary dark:text-amber-400" />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
      <span className="text-[11px] text-stone-400 dark:text-stone-500 select-none font-medium">
        Furnixo Heritage Craftsmanship Guarantee
      </span>
    </div>
  );
}
export default BottomLinks;
