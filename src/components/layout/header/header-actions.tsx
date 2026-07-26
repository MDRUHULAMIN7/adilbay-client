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
    <div className="flex items-center gap-1.5 sm:gap-2">
      {/* Search Trigger */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSearchClick}
        aria-label="Open search dialog"
        className="h-11 w-11 rounded-xl text-inherit hover:text-primary hover:bg-stone-500/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none cursor-pointer"
      >
        <Icon name="search" className="h-5 w-5" />
      </Button>

      {/* Theme Toggling */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        aria-label="Toggle system theme"
        className="h-11 w-11 rounded-xl text-inherit hover:text-primary hover:bg-stone-500/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none cursor-pointer"
      >
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-5 w-5" />
      </Button>

      {/* Wishlist Link - Config Enabled */}
      {FEATURE_FLAGS.wishlist && (
        <Link href={ROUTES.WISHLIST}>
          <Button
            variant="ghost"
            size="sm"
            aria-label="View wishlist items"
            className="hidden sm:inline-flex h-11 w-11 rounded-xl text-inherit hover:text-primary hover:bg-stone-500/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none cursor-pointer"
          >
            <Icon name="heart" className="h-5 w-5" />
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
        className="relative h-11 w-11 rounded-xl text-inherit hover:text-primary hover:bg-stone-500/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none cursor-pointer"
      >
        <Icon name="cart" className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-primary text-[9px] font-bold text-primary-foreground flex items-center justify-center border border-background select-none animate-pulse">
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
          className="hidden sm:inline-flex h-11 w-11 rounded-xl text-inherit hover:text-primary hover:bg-stone-500/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none cursor-pointer"
        >
          <Icon name="avatar" className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}
export default HeaderActions;
