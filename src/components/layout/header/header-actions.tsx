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
      {/* 1. Search Icon Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSearchClick}
        aria-label="Open search dialog"
        className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-xl text-inherit hover:text-primary hover:bg-stone-500/10 transition-all duration-300 focus-visible:outline-none cursor-pointer"
      >
        <Icon name="search" className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
      </Button>

      {/* 2. Extra Highlighted "Make Your Own Design" CTA Button */}
      <Link href={ROUTES.CUSTOM_DESIGN}>
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-primary via-amber-600 to-primary text-primary-foreground font-extrabold text-xs sm:text-xs uppercase tracking-wider shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 border border-white/20 transition-all cursor-pointer select-none"
        >
          <Icon name="star" className="h-3.5 w-3.5 fill-current text-primary-foreground animate-pulse" />
          <span className="hidden sm:inline font-display">Make Your Own Design</span>
          <span className="sm:hidden font-display">Custom Design</span>
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300"></span>
          </span>
        </motion.div>
      </Link>

      {/* 3. Account Dropdown Trigger */}
      <div ref={dropdownRef} className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAccountOpen((prev) => !prev)}
          aria-label="Toggle Account Menu"
          aria-expanded={isAccountOpen}
          className={`h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-xl text-inherit hover:text-primary hover:bg-stone-500/10 transition-all duration-300 focus-visible:outline-none cursor-pointer ${
            isAccountOpen ? 'bg-primary/10 text-primary ring-2 ring-primary/40' : ''
          }`}
        >
          <Icon name="avatar" className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
        </Button>

        {/* Clean Account Dropdown Popover: Just Profile & Theme Toggle */}
        <AnimatePresence>
          {isAccountOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-full mt-2 w-60 rounded-2xl bg-card border border-stone-200/90 dark:border-stone-800 shadow-2xl p-3 text-foreground z-[110] backdrop-blur-xl flex flex-col gap-2"
            >
              {/* Profile Link */}
              <Link
                href={ROUTES.ACCOUNT}
                onClick={() => setIsAccountOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 transition-colors text-stone-800 dark:text-stone-100 font-bold text-xs group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold">
                    <Icon name="avatar" className="h-4 w-4" />
                  </div>
                  <span>My Profile</span>
                </div>
                <Icon name="chevronRight" className="h-4 w-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Theme Toggle Switcher */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 text-xs">
                <div className="flex items-center gap-2.5 font-bold text-stone-700 dark:text-stone-200">
                  <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-4 w-4 text-primary" />
                  <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle light or dark theme"
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-stone-300 dark:bg-stone-700 p-0.5 transition-colors duration-300 focus:outline-none cursor-pointer"
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-primary text-primary-foreground shadow-md transition-transform duration-300 flex items-center justify-center ${
                      theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  >
                    <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-3 w-3" />
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
