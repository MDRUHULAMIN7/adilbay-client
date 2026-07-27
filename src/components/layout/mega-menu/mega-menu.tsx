'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { NavigationItem } from '@/types/layout';
import { MEGA_MENUS } from '@/config/mega-menu';
import Link from 'next/link';
import { Icon } from '../../ui/icon';
import { CategoryColumn } from './category-column';
import { FeaturedCollection } from './featured-collection';
import { BottomLinks } from './bottom-links';
import { DURATIONS, EASING } from '@/constants/motion';
import { analytics } from '@/lib/analytics';

export interface MegaMenuProps extends BaseComponentProps {
  item: NavigationItem;
  isFirst?: boolean;
}

export function MegaMenu({ className, item, isFirst = false, ...props }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (label: string, href: string) => {
    analytics.trackNavigation(label, href);
    setIsOpen(false);
  };

  const handleFocus = () => setIsOpen(true);
  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  // 1. Simple link (no children)
  if (!item.children && !item.isMega) {
    return (
      <Link
        href={item.href}
        onClick={() => handleLinkClick(item.label, item.href)}
        className={cn(
          'text-sm lg:text-[15px] xl:text-base font-bold text-inherit hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl px-3 py-2 select-none whitespace-nowrap shrink-0',
          className
        )}
        {...props}
      >
        {item.label}
      </Link>
    );
  }

  const megaConfig = item.isMega && item.megaKey ? MEGA_MENUS[item.megaKey] : null;

  return (
    <div
      className="shrink-0"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <button
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          'flex items-center gap-1.5 text-sm lg:text-[15px] xl:text-base font-bold text-inherit hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl px-3 py-2 select-none cursor-pointer whitespace-nowrap shrink-0',
          isOpen && 'text-primary bg-primary/15 dark:bg-primary/25 shadow-xs'
        )}
        {...props}
      >
        <span>{item.label}</span>
        <Icon
          name="chevronDown"
          className={cn('h-4 w-4 transition-transform duration-300 shrink-0', isOpen && 'rotate-180 text-primary')}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {item.isMega && megaConfig ? (
              /* Fully Responsive Mega Menu Panel */
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: DURATIONS.hover, ease: EASING.standard }}
                className={cn(
                  'absolute top-full mt-2 w-[92vw] md:w-[720px] lg:w-[860px] xl:w-[940px] max-w-[calc(100vw-2rem)] bg-background/95 dark:bg-stone-950/95 backdrop-blur-2xl border border-stone-200/90 dark:border-stone-800/90 shadow-2xl rounded-2xl p-5 sm:p-6 lg:p-7 z-50 origin-top-left',
                  isFirst ? 'left-0' : 'left-0 lg:left-1/2 lg:-translate-x-1/2'
                )}
              >
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                  {/* Category Columns */}
                  <div className="w-full lg:flex-1 lg:border-r border-stone-200/80 dark:border-stone-800 lg:pr-8">
                    <CategoryColumn
                      categories={megaConfig.categories}
                      onItemClick={() => setIsOpen(false)}
                    />
                  </div>

                  {/* Featured Showcase Card */}
                  <div className="w-full lg:w-[280px] shrink-0">
                    <FeaturedCollection
                      featured={megaConfig.featured}
                      onItemClick={() => setIsOpen(false)}
                    />
                  </div>
                </div>

                {/* Bottom Links Bar */}
                {megaConfig.bottomLinks && (
                  <div className="mt-5 pt-3.5 border-t border-stone-200/80 dark:border-stone-800">
                    <BottomLinks
                      links={megaConfig.bottomLinks}
                      onItemClick={() => setIsOpen(false)}
                    />
                  </div>
                )}
              </motion.div>
            ) : (
              /* Standard Dropdown */
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: DURATIONS.hover, ease: EASING.standard }}
                className="absolute top-full left-0 mt-2 w-[280px] bg-background/95 dark:bg-stone-950/95 backdrop-blur-xl border border-border shadow-overlay rounded-card p-4 z-50 origin-top-left"
              >
                <div className="flex flex-col gap-1">
                  {item.children?.map((child) => (
                    <Link
                      key={child.id}
                      href={child.href}
                      onClick={() => handleLinkClick(child.label, child.href)}
                      className="group flex flex-col gap-0.5 p-2 rounded-lg hover:bg-surface/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="flex items-center gap-1.5 font-semibold text-xs text-foreground group-hover:text-primary transition-colors">
                        <span>{child.label}</span>
                        {child.badge && (
                          <span className="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.2 rounded-full uppercase leading-none">
                            {child.badge}
                          </span>
                        )}
                      </div>
                      {child.description && (
                        <span className="text-[10px] text-muted-foreground leading-normal">
                          {child.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
export default MegaMenu;
