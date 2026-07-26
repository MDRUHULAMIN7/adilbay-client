'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Drawer } from '../../ui/drawer';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { MAIN_NAVIGATION } from '@/config/navigation';
import { Logo } from '../logo';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import Link from 'next/link';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Only close drawer when navigating to a new route
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} anchor="left">
      <div className="flex flex-col h-full bg-background text-foreground select-none p-1">
        {/* 1. Header: Logo & Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <Logo variant="full" size="md" />

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close menu drawer"
            className="h-9 w-9 rounded-full bg-muted/50 hover:bg-muted text-foreground flex items-center justify-center cursor-pointer transition-colors"
          >
            <Icon name="x" className="h-4 w-4" />
          </Button>
        </div>

        {/* 2. Main Navigation List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-1 custom-scrollbar">
          <Accordion type="multiple" className="border-none space-y-1">
            {MAIN_NAVIGATION.map((item) => {
              const hasChildren = item.children && item.children.length > 0;

              if (!hasChildren) {
                return (
                  <div key={item.id} className="py-0.5">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between px-3 py-3 rounded-xl font-semibold text-base text-foreground hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <Icon name="chevronRight" className="h-4 w-4 text-muted-foreground/60" />
                    </Link>
                  </div>
                );
              }

              return (
                <AccordionItem key={item.id} value={item.id} className="border-none py-0.5">
                  <AccordionTrigger className="px-3 py-3 rounded-xl text-base font-semibold text-foreground hover:bg-primary/10 hover:text-primary hover:no-underline transition-all">
                    <span>{item.label}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2 pt-1 pl-4 space-y-1">
                    {item.children?.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href}
                        onClick={onClose}
                        className="flex flex-col gap-0.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/40 transition-colors block w-full"
                      >
                        <span className="font-semibold text-foreground">{child.label}</span>
                        {child.description && (
                          <span className="text-xs text-muted-foreground/80 line-clamp-1">
                            {child.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </Drawer>
  );
}

export default MobileNav;
