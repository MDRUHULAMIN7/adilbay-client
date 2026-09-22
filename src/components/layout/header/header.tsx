'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { Logo } from '../logo';
import { DesktopNavigation } from './desktop-navigation';
import { HeaderActions } from './header-actions';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { useLayout } from '@/providers/layout-provider';
import { Container } from '../container';
import { ErrorBoundary } from '../../system/error-boundary';

export interface HeaderProps extends BaseComponentProps {
  transparent?: boolean;
}

export function Header({ className, transparent = false, ...props }: HeaderProps) {
  const { setIsMobileNavOpen } = useLayout();

  return (
    <div
      className={cn(
        'fixed top-0 inset-x-0 z-[100] w-full select-none text-stone-900 dark:text-stone-900 transition-colors duration-300'
      )}
    >
      {/* Persistent light background keeps the brand logo and navigation readable. */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-lg shadow-black/10"
      />

      {/* 2. Main Header Content Container */}
      <header
        role="banner"
        className={cn(
          'relative z-10 flex items-center w-full h-14 sm:h-16 md:h-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          className
        )}
        {...props}
      >
        <Container variant="fluid" className="w-full flex items-center justify-between px-3 sm:px-6 lg:px-10 max-w-none">
          {/* Logo & Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open mobile navigation drawer"
              className="xl:hidden h-9 w-9 sm:h-10 sm:w-10 -ml-1 text-inherit hover:text-primary transition-colors duration-500 cursor-pointer"
            >
              <Icon name="menu" className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <Logo variant="full" size="md" themeMode="system" />
          </div>

          {/* Desktop Navigation wrapped in ErrorBoundary */}
          <ErrorBoundary fallback={<div className="text-xs text-destructive font-medium">Nav load error</div>}>
            <DesktopNavigation />
          </ErrorBoundary>

          {/* Header Action Utilities */}
          <HeaderActions />
        </Container>
      </header>
    </div>
  );
}

export default Header;
