import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { IconName } from '@/constants/icons';
import { Icon } from './icon';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: IconName;
}

export interface BreadcrumbProps extends BaseComponentProps, React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, separator, ...props }, ref) => {
    const defaultSeparator = (
      <Icon name="chevronRight" className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500 shrink-0" aria-hidden="true" />
    );
    const activeSeparator = separator || defaultSeparator;

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('flex items-center text-xs font-semibold select-none', className)}
        {...props}
      >
        <ol className="flex items-center gap-1.5 flex-wrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && <span className="flex items-center select-none">{activeSeparator}</span>}

                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-stone-600 dark:text-stone-300 hover:text-primary bg-stone-100/80 dark:bg-stone-900/80 hover:bg-primary/10 border border-stone-200/80 dark:border-stone-800 transition-all cursor-pointer font-bold"
                  >
                    {item.icon && (
                      <Icon name={item.icon} className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    )}
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary border border-primary/25 dark:border-primary/40 font-bold shadow-xs"
                  >
                    {item.icon && (
                      <Icon name={item.icon} className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    )}
                    <span>{item.label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';
