'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '../header';
import { Footer } from '../footer';
import { SkipNav } from '../../system/skip-nav';
import { ScrollProgress } from '../../system/scroll-progress';
import { ScrollToTop } from '../../system/scroll-to-top';
import { useLayout } from '@/providers/layout-provider';
import dynamic from 'next/dynamic';

import { MobileNav } from '../mobile-nav';

const CommandPalette = dynamic(
  () => import('../command-palette').then((mod) => mod.CommandPalette),
  { ssr: false }
);

const CartDrawer = dynamic(
  () => import('@/features/cart').then((mod) => mod.CartDrawer),
  { ssr: false }
);

const FloatingContactWidget = dynamic(
  () => import('../floating-contact-widget').then((mod) => mod.FloatingContactWidget),
  { ssr: false }
);

export interface AppShellProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showScrollProgress?: boolean;
  showScrollToTop?: boolean;
}

export function AppShell({
  children,
  header,
  footer,
  showHeader = true,
  showFooter = true,
  showScrollProgress = true,
  showScrollToTop = false,
}: AppShellProps) {
  const { isSearchOpen, setIsSearchOpen, isMobileNavOpen, setIsMobileNavOpen } = useLayout();
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (isDashboard) {
    return (
      <div className="relative min-h-screen flex flex-col bg-background text-foreground transition-colors duration-150">
        <SkipNav />
        <main id="main-content" className="flex-1 flex flex-col w-full focus:outline-none" tabIndex={-1}>
          {children}
        </main>
      </div>
    );
  }

  const defaultHeader = <Header />;
  const defaultFooter = <Footer />;

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground transition-colors duration-150">
      <SkipNav />
      {showScrollProgress && <ScrollProgress />}

      {showHeader && (header || defaultHeader)}

      <main id="main-content" className="flex-1 flex flex-col w-full focus:outline-none" tabIndex={-1}>
        {children}
      </main>

      {showFooter && (footer || defaultFooter)}

      {showScrollToTop && <ScrollToTop />}

      {isSearchOpen && (
        <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      )}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
      <CartDrawer />
      <FloatingContactWidget />
    </div>
  );
}
export default AppShell;
