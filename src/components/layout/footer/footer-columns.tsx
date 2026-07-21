import React from 'react';
import { FOOTER_COLUMNS } from '@/config/footer';
import { Heading } from '../../ui/heading';
import Link from 'next/link';

export function FooterColumns() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-3">
      {FOOTER_COLUMNS.map((column) => (
        <div key={column.title} className="flex flex-col gap-4">
          <Heading level={4} className="text-stone-50 text-xs font-bold uppercase tracking-wider font-display">
            {column.title}
          </Heading>
          <ul className="flex flex-col gap-2.5 text-sm text-stone-400">
            {column.items.map((item) => (
              <li key={item.label}>
                {item.href.startsWith('http') ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-stone-100 transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className="hover:text-stone-100 transition-colors">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
export default FooterColumns;
