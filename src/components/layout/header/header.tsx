'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { Logo } from '../logo';
import { DesktopNavigation } from './desktop-navigation';
import { HeaderActions } from './header-actions';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { useLayout } from '@/providers/layout-provider';
import { useHeaderState } from '@/hooks/useHeaderState';
import { ErrorBoundary } from '../../system/error-boundary';
import { FEATURE_FLAGS } from '@/config/features';

export interface HeaderProps extends BaseComponentProps {
  transparent?: boolean;
}

export function Header({ className, transparent = false, ...props }: HeaderProps) {
  const { isScrolled, isHidden } = useHeaderState();
  const { setIsMobileNavOpen } = useLayout();
  const [isAnnouncementDismissed, setIsAnnouncementDismissed] = useState(false);

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-header flex flex-col w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isHidden && '-translate-y-full'
      )}
    >
      {/* Smooth Collapsible Announcement Bar */}
      {FEATURE_FLAGS.announcementBar && !isAnnouncementDismissed && (
        <div
          className={cn(
            'bg-primary text-primary-foreground text-center text-xs font-semibold select-none w-full tracking-wide relative flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden',
            isScrolled ? 'max-h-0 py-0 opacity-0 border-none' : 'max-h-10 py-2 px-8 opacity-100'
          )}
        >
          <span>Enjoy Free Delivery countrywide on orders above Tk 50,000!</span>
          <button
            onClick={() => setIsAnnouncementDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity cursor-pointer p-1 focus:outline-none"
            aria-label="Dismiss announcement"
          >
            <Icon name="close" className="h-3.5 w-3.5 text-primary-foreground" />
          </button>
        </div>
      )}

      {/* Main Header Container with Stable 72px (h-18) Height */}
      <header
        role="banner"
        className={cn(
          'flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-full border-b bg-background/90 backdrop-blur-xl h-18 shadow-xs',
          isScrolled ? 'border-border/80 shadow-flat' : 'border-border/40',
          transparent && !isScrolled && 'bg-transparent border-transparent backdrop-blur-none shadow-none',
          className
        )}
        {...props}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          {/* Logo & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open mobile navigation drawer"
              className="lg:hidden h-10 w-10 -ml-2 text-stone-600 dark:text-stone-300 cursor-pointer"
            >
              <Icon name="menu" className="h-5 w-5" />
            </Button>
            <Logo variant="full" size="sm" />
          </div>

          {/* Desktop Navigation wrapped in ErrorBoundary */}
          <ErrorBoundary fallback={<div className="text-xs text-destructive font-medium">Nav load error</div>}>
            <DesktopNavigation />
          </ErrorBoundary>

          {/* Header Action Utilities */}
          <HeaderActions />
        </div>
      </header>
    </div>
  );
}
export default Header;
