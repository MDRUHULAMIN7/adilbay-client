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
      <Icon name="ChevronRight" className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
    );
    const activeSeparator = separator || defaultSeparator;

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('flex items-center text-sm font-medium', className)}
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
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.icon && (
                      <Icon name={item.icon} className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className="flex items-center gap-1 text-foreground font-semibold"
                  >
                    {item.icon && (
                      <Icon name={item.icon} className="h-3.5 w-3.5" aria-hidden="true" />
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
