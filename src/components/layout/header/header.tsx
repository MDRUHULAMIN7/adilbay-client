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
import { Container } from '../container';
import { ErrorBoundary } from '../../system/error-boundary';

export interface HeaderProps extends BaseComponentProps {
  transparent?: boolean;
}

export function Header({ className, transparent = false, ...props }: HeaderProps) {
  const { setIsMobileNavOpen } = useLayout();
  const [scrollY, setScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
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
  const isScrolled = scrollY > 20;

  // Glass backdrop active state (activates on scroll down OR on hover for home page)
  const isBgActive = isHomePage ? isScrolled || isHovered : true;

  return (
    <div
      className={cn(
        'fixed top-0 inset-x-0 z-[100] w-full select-none transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isHomePage ? 'text-white' : 'text-foreground'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Animated Glass Backdrop Curtain (Slides smoothly down from top & retracts back up) */}
      <div
        className={cn(
          'absolute inset-0 z-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform origin-top pointer-events-none',
          isBgActive
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0',
          isHomePage
            ? 'bg-black/35 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/10'
            : 'bg-background/85 backdrop-blur-md border-b border-border/40 shadow-xs'
        )}
      />

      {/* 2. Main Header Content Container */}
      <header
        role="banner"
        className={cn(
          'relative z-10 flex items-center w-full h-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
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
