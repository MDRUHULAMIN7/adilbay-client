'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

const navigation = [
  { name: 'Overview', href: '/playground' },
  { name: 'Header System', href: '/playground/header' },
  { name: 'Mega Menu', href: '/playground/mega-menu' },
  { name: 'Mobile Drawer', href: '/playground/drawer' },
  { name: 'Footer System', href: '/playground/footer' },
  { name: 'Semantic Themes', href: '/playground/themes' },
  { name: 'Motion Presets', href: '/playground/motion' },
  { name: 'Responsive Grid', href: '/playground/responsive' },
  { name: 'Accessibility (a11y)', href: '/playground/accessibility' },
];

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-stone-50/50 dark:bg-stone-950/20">
      <aside className="w-64 border-r border-border/80 bg-background p-6 flex flex-col gap-6 shrink-0 sticky top-0 h-screen">
        <div className="flex flex-col gap-1">
          <Link href="/playground" className="flex items-center gap-2">
            <span className="h-7 w-7 rounded bg-primary flex items-center justify-center text-primary-foreground font-display font-semibold select-none">
              F
            </span>
            <Heading level={4} className="font-display font-bold">
              Furnixo UX
            </Heading>
          </Link>
          <Text variant="caption" className="text-muted-foreground select-none">
            Layout Polish Sandbox (v2.5)
          </Text>
        </div>

        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto pr-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-xs font-semibold transition-all select-none cursor-pointer',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-flat'
                    : 'text-stone-650 hover:bg-muted hover:text-foreground dark:text-stone-400'
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border pt-4 text-[10px] text-muted-foreground flex flex-col gap-0.5">
          <span>Enterprise Starter Template</span>
          <span>BD Woodcraft Market Focus</span>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          {children}
        </div>
      </main>
    </div>
  );
}
