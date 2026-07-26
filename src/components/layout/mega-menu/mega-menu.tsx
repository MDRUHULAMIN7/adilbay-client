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
import { TrendingProducts } from './trending-products';
import { BottomLinks } from './bottom-links';
import { DURATIONS, EASING } from '@/constants/motion';
import { analytics } from '@/lib/analytics';

export interface MegaMenuProps extends BaseComponentProps {
  item: NavigationItem;
}

export function MegaMenu({ className, item, ...props }: MegaMenuProps) {
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
          'text-[15px] sm:text-base font-semibold text-inherit hover:text-primary transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-3 py-1.5 select-none nav-link-underline',
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
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <button
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          'flex items-center gap-1.5 text-[15px] sm:text-base font-semibold text-inherit hover:text-primary transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-3 py-1.5 select-none cursor-pointer',
          isOpen && 'text-primary'
        )}
        {...props}
      >
        <span>{item.label}</span>
        <Icon
          name="chevronDown"
          className={cn('h-4 w-4 transition-transform duration-300', isOpen && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {item.isMega && megaConfig ? (
              /* Mega Menu - Full Width Panel */
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: DURATIONS.hover, ease: EASING.standard }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[800px] lg:w-[940px] bg-background/95 backdrop-blur-xl border border-border shadow-overlay rounded-card p-6 z-dropdown origin-top"
              >
                <div className="flex gap-6">
                  {/* Category Columns */}
                  <CategoryColumn
                    categories={megaConfig.categories}
                    onItemClick={() => setIsOpen(false)}
                  />

                  {/* Featured Card */}
                  <FeaturedCollection
                    featured={megaConfig.featured}
                    onItemClick={() => setIsOpen(false)}
                  />

                  {/* Trending Products */}
                  {megaConfig.trending && (
                    <TrendingProducts
                      products={megaConfig.trending}
                      onItemClick={() => setIsOpen(false)}
                    />
                  )}
                </div>

                {/* Bottom Links */}
                {megaConfig.bottomLinks && (
                  <BottomLinks
                    links={megaConfig.bottomLinks}
                    onItemClick={() => setIsOpen(false)}
                  />
                )}
              </motion.div>
            ) : (
              /* Standard Dropdown */
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: DURATIONS.hover, ease: EASING.standard }}
                className="absolute top-full left-0 mt-1 w-[280px] bg-background/95 backdrop-blur-xl border border-border shadow-overlay rounded-card p-4 z-dropdown origin-top"
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
