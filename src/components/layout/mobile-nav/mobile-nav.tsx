'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Drawer } from '../../ui/drawer';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { MAIN_NAVIGATION } from '@/config/navigation';
import { SOCIAL_NAVIGATION } from '@/config/footer';
import { Logo } from '../logo';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { useTheme } from '@/providers/theme-provider';
import { useLayout } from '@/providers/layout-provider';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { setIsSearchOpen } = useLayout();
  const [lang, setLang] = useState<'EN' | 'BN'>('EN');
  const [curr, setCurr] = useState<'BDT' | 'USD'>('BDT');

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSearchClick = () => {
    onClose();
    setIsSearchOpen(true);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} anchor="left">
      <div className="flex flex-col gap-6 h-full pb-4">
        {/* Top: Logo & Search */}
        <div className="flex flex-col gap-4">
          <div className="pl-1">
            <Logo variant="full" size="md" />
          </div>
          <div className="relative" onClick={handleSearchClick}>
            <Input
              type="text"
              placeholder="Search wood products..."
              className="bg-muted/30 border-border/80 text-xs pr-10 cursor-pointer rounded-lg"
              prefix={<Icon name="search" className="h-3.5 w-3.5" />}
              readOnly
            />
          </div>
        </div>

        <div className="h-px bg-border/60" />

        {/* Middle Navigation Accordions */}
        <div className="flex-1 overflow-y-auto pr-1">
          <Accordion type="multiple" className="border-none">
            {MAIN_NAVIGATION.map((item) => {
              const hasChildren = item.children && item.children.length > 0;

              if (!hasChildren) {
                return (
                  <div key={item.id} className="border-b border-border/40 py-2.5">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors block w-full"
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              }

              return (
                <AccordionItem key={item.id} value={item.id} className="border-b border-border/40">
                  <AccordionTrigger className="py-2.5 text-sm font-semibold hover:no-underline">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-2.5 pl-4 flex flex-col gap-2">
                    {item.children?.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href}
                        onClick={onClose}
                        className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-primary transition-colors block w-full py-1"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        <div className="h-px bg-border/60" />

        {/* Bottom Preferences, Settings & Social Links */}
        <div className="flex flex-col gap-4.5 mt-auto">
          {/* Preferences Selector bar */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            {/* Theme Toggle Button */}
            <Button
              variant="outline"
              size="xs"
              onClick={toggleTheme}
              className="flex items-center justify-center gap-1 py-2 rounded-lg text-xs"
              aria-label="Toggle system theme"
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-3.5 w-3.5" />
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </Button>

            {/* Language Selection */}
            <Button
              variant="outline"
              size="xs"
              onClick={() => setLang(lang === 'EN' ? 'BN' : 'EN')}
              className="flex items-center justify-center py-2 rounded-lg text-xs"
            >
              <span>{lang === 'EN' ? 'English' : 'বাংলা'}</span>
            </Button>

            {/* Currency Selection */}
            <Button
              variant="outline"
              size="xs"
              onClick={() => setCurr(curr === 'BDT' ? 'USD' : 'BDT')}
              className="flex items-center justify-center py-2 rounded-lg text-xs"
            >
              <span>{curr === 'BDT' ? 'BDT (Tk)' : 'USD ($)'}</span>
            </Button>
          </div>

          {/* Counts, User Account Profile */}
          <div className="flex flex-col gap-2.5">
            <Link
              href={ROUTES.WISHLIST}
              onClick={onClose}
              className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 hover:text-primary transition-colors py-1 pl-1"
            >
              <div className="flex items-center gap-2">
                <Icon name="heart" className="h-4 w-4" />
                <span className="font-medium">My Wishlist</span>
              </div>
              <span className="bg-muted px-2 py-0.5 rounded-full text-[10px] font-bold text-foreground">
                0
              </span>
            </Link>

            <Link
              href={ROUTES.CART}
              onClick={onClose}
              className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 hover:text-primary transition-colors py-1 pl-1"
            >
              <div className="flex items-center gap-2">
                <Icon name="cart" className="h-4 w-4" />
                <span className="font-medium">My Cart</span>
              </div>
              <span className="bg-primary/10 px-2 py-0.5 rounded-full text-[10px] font-bold text-primary">
                0
              </span>
            </Link>

            <Link
              href={ROUTES.ACCOUNT}
              onClick={onClose}
              className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400 hover:text-primary transition-colors py-1 pl-1"
            >
              <Icon name="avatar" className="h-4 w-4" />
              <span className="font-medium">Account Details</span>
            </Link>
          </div>

          <div className="h-px bg-border/40" />

          {/* Social Network list */}
          <div className="flex items-center gap-4 pl-1">
            {SOCIAL_NAVIGATION.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-450 hover:text-primary transition-colors"
                aria-label={`Follow us on ${social.label}`}
              >
                <Icon name={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
}
export default MobileNav;
