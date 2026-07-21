import React from 'react';
import Link from 'next/link';
import { Icon } from '../../ui/icon';

interface BottomLinksProps {
  links: { label: string; href: string }[];
  onItemClick?: () => void;
}

export function BottomLinks({ links, onItemClick }: BottomLinksProps) {
  return (
    <div className="border-t border-border/50 pt-4.5 mt-5 flex items-center justify-between gap-4 text-[11px] text-muted-foreground">
      <div className="flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={onItemClick}
            className="hover:text-primary transition-colors flex items-center gap-1.5 focus-visible:outline-none rounded"
          >
            <Icon name="check" className="h-3.5 w-3.5 text-primary/80" />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
      <span className="text-[10px] text-muted-foreground/50 select-none font-medium">
        Furnixo Craftsmanship Guarantee
      </span>
    </div>
  );
}
export default BottomLinks;
