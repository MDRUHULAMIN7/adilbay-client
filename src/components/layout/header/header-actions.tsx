'use client';

import React from 'react';
import { useTheme } from '@/providers/theme-provider';
import { useLayout } from '@/providers/layout-provider';
import { FEATURE_FLAGS } from '@/config/features';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { ROUTES } from '@/constants/routes';
import { analytics } from '@/lib/analytics';
import Link from 'next/link';

import { useCart } from '@/hooks/useCart';

export function HeaderActions() {
  const { theme, setTheme } = useTheme();
  const { setIsSearchOpen } = useLayout();
  const { openCart, itemCount } = useCart();

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    analytics.trackTheme(nextTheme);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    analytics.trackNavigation('Search Trigger', 'Command Palette');
  };

  return (
    <div className="flex items-center gap-1">
      {/* Search Trigger */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSearchClick}
        aria-label="Open search dialog"
        className="h-10 w-10 text-stone-600 dark:text-stone-300 hover:text-primary transition-colors focus-visible:outline-none cursor-pointer"
      >
        <Icon name="search" className="h-4 w-4" />
      </Button>

      {/* Theme Toggling */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        aria-label="Toggle system theme"
        className="h-10 w-10 text-stone-600 dark:text-stone-300 hover:text-primary transition-colors focus-visible:outline-none cursor-pointer"
      >
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-4 w-4" />
      </Button>

      {/* Wishlist Link - Config Enabled */}
      {FEATURE_FLAGS.wishlist && (
        <Link href={ROUTES.WISHLIST}>
          <Button
            variant="ghost"
            size="sm"
            aria-label="View wishlist items"
            className="hidden sm:inline-flex h-10 w-10 text-stone-600 dark:text-stone-300 hover:text-primary transition-colors focus-visible:outline-none cursor-pointer"
          >
            <Icon name="heart" className="h-4 w-4" />
          </Button>
        </Link>
      )}

      {/* Cart Drawer hook */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          openCart();
          analytics.trackNavigation('Cart Trigger', 'Cart Sidebar');
        }}
        aria-label="Open shopping cart"
        className="relative h-10 w-10 text-stone-600 dark:text-stone-300 hover:text-primary transition-colors focus-visible:outline-none cursor-pointer"
      >
        <Icon name="cart" className="h-4 w-4" />
        {itemCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-primary text-[9px] font-bold text-stone-50 flex items-center justify-center border border-background select-none animate-pulse">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </Button>

      {/* Account Settings Page */}
      <Link href={ROUTES.ACCOUNT}>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Account details"
          className="hidden sm:inline-flex h-10 w-10 text-stone-600 dark:text-stone-300 hover:text-primary transition-colors focus-visible:outline-none cursor-pointer"
        >
          <Icon name="avatar" className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
export default HeaderActions;
