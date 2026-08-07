'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/providers/theme-provider';
import { useLayout } from '@/providers/layout-provider';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { ROUTES } from '@/constants/routes';
import { analytics } from '@/lib/analytics';
import { LayoutDashboard } from 'lucide-react';

export function HeaderActions() {
  const { theme, setTheme } = useTheme();
  const { setIsSearchOpen } = useLayout();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    analytics.trackTheme(nextTheme);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    analytics.trackNavigation('Search Trigger', 'Command Palette');
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    }
    if (isAccountOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountOpen]);

  // Close dropdown on ESC
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsAccountOpen(false);
      }
    }
    if (isAccountOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAccountOpen]);

  return (
    <div className="flex items-center gap-2 sm:gap-3 relative">
      {/* 1. "Make Your Own Design" CTA Button */}
      <Link href={ROUTES.CUSTOM_DESIGN} className="shrink-0 cursor-pointer">
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center justify-center px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary text-primary-foreground font-extrabold text-[10px] xs:text-xs sm:text-xs uppercase tracking-wider shadow-md shadow-primary/25 hover:shadow-lg hover:bg-primary/95 transition-all cursor-pointer select-none whitespace-nowrap"
        >
          <span className="hidden sm:inline font-display">Make Your Own Design</span>
          <span className="sm:hidden font-display">Custom Design</span>
        </motion.div>
      </Link>

      {/* 2. Account Dropdown Trigger */}
      <div ref={dropdownRef} className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAccountOpen((prev) => !prev)}
          aria-label="Toggle Account Menu"
          aria-expanded={isAccountOpen}
          className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full text-inherit hover:text-primary hover:bg-stone-500/10 transition-all duration-300 focus-visible:outline-none cursor-pointer flex items-center justify-center p-0 ${
            isAccountOpen ? 'bg-primary/10 text-primary ring-2 ring-primary/40' : ''
          }`}
        >
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-200 flex items-center justify-center font-bold cursor-pointer">
            <Icon name="avatar" className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </div>
        </Button>

        {/* Clean Account Dropdown Popover */}
        <AnimatePresence>
          {isAccountOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-full mt-2 w-52 sm:w-60 rounded-2xl bg-card border border-border shadow-2xl p-2.5 text-foreground z-[110] backdrop-blur-xl flex flex-col gap-1.5"
            >
              {/* Admin Dashboard Link Button */}
              <Link
                href="/dashboard"
                onClick={() => setIsAccountOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0 shadow-xs">
                    <LayoutDashboard className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold">Admin Dashboard</span>
                </div>
                <Icon name="chevronRight" className="h-3.5 w-3.5 text-primary group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Profile Link */}
              <Link
                href={ROUTES.ACCOUNT}
                onClick={() => setIsAccountOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted transition-colors text-foreground font-bold text-xs cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold shrink-0">
                    <Icon name="avatar" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <span className="text-xs">My Profile</span>
                </div>
                <Icon name="chevronRight" className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Wishlist Link */}
              <Link
                href={ROUTES.WISHLIST}
                onClick={() => setIsAccountOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted transition-colors text-foreground font-bold text-xs cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-muted text-primary flex items-center justify-center font-bold shrink-0">
                    <Icon name="heart" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  </div>
                  <span className="text-xs">Wishlist</span>
                </div>
                <Icon name="chevronRight" className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Theme Toggle Switcher */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/60 border border-border text-xs">
                <div className="flex items-center gap-2 font-bold text-foreground">
                  <Icon
                    name={theme === 'dark' ? 'moon' : 'sun'}
                    className="h-4 w-4 text-primary shrink-0"
                  />
                  <span>{theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle light or dark theme"
                  className={`relative inline-flex h-5.5 w-10 sm:h-6 sm:w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-300 focus:outline-none cursor-pointer ${
                    theme === 'dark' ? 'bg-primary/40 border border-primary/40' : 'bg-muted-foreground/30 border border-border'
                  }`}
                >
                  <span
                    className={`inline-flex h-4.5 w-4.5 sm:h-5 sm:w-5 transform rounded-full bg-primary text-primary-foreground shadow-md transition-transform duration-300 items-center justify-center cursor-pointer ${
                      theme === 'dark' ? 'translate-x-4.5 sm:translate-x-5' : 'translate-x-0'
                    }`}
                  >
                    <Icon
                      name={theme === 'dark' ? 'moon' : 'sun'}
                      className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary-foreground"
                    />
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default HeaderActions;
