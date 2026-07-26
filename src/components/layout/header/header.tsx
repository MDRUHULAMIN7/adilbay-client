'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { Logo } from '../logo';
import { DesktopNavigation } from './desktop-navigation';
import { HeaderActions } from './header-actions';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { useLayout } from '@/providers/layout-provider';
import { useHeaderState } from '@/hooks/useHeaderState';
import { Container } from '../container';
import { ErrorBoundary } from '../../system/error-boundary';
import { FEATURE_FLAGS } from '@/config/features';

export interface HeaderProps extends BaseComponentProps {
  transparent?: boolean;
}

export function Header({ className, transparent = false, ...props }: HeaderProps) {
  const { isScrolled, isHidden } = useHeaderState();
  const { setIsMobileNavOpen } = useLayout();
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';
  // On home page, maintain transparent navbar while inside the hero section (scrollY < 550px)
  const isTransparentMode = isHomePage ? scrollY < 550 : (!isScrolled && transparent);

  return (
    <div
      className={cn(
        'z-header flex flex-col w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isTransparentMode ? 'absolute top-0 inset-x-0' : 'sticky top-0 shadow-flat bg-background/95 backdrop-blur-xl text-foreground',
        isHidden && '-translate-y-full'
      )}
    >
      {/* Main Header Container with Transparent Unscrolled State & Glassmorphic Hover Blur Reveal */}
      <header
        role="banner"
        className={cn(
          'group flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-full h-20 select-none border-b-0',
          isTransparentMode
            ? 'bg-transparent hover:bg-black/20 hover:backdrop-blur-2xl text-white hover:text-white'
            : 'bg-background/95 backdrop-blur-xl text-foreground',
          className
        )}
        {...props}
      >
        <Container variant="wide" className="w-full flex items-center justify-between">
          {/* Logo & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open mobile navigation drawer"
              className="lg:hidden h-11 w-11 -ml-2 text-inherit hover:text-primary transition-colors duration-500 cursor-pointer"
            >
              <Icon name="menu" className="h-6 w-6" />
            </Button>
            <Logo variant="full" size="md" />
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
