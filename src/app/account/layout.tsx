'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';

const ACCOUNT_NAV_ITEMS = [
  { label: 'Overview', href: '/account', icon: 'grid' },
  { label: 'My Orders', href: '/account/orders', icon: 'package' },
  { label: 'Saved Addresses', href: '/account/addresses', icon: 'mapPin' },
  { label: 'Wishlist', href: '/account/wishlist', icon: 'heart' },
  { label: 'Profile Details', href: '/account/profile', icon: 'user' },
  { label: 'Settings', href: '/account/settings', icon: 'settings' },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile } = useProfile();

  return (
    <Container variant="wide" className="py-8 sm:py-12 flex flex-col gap-8 text-left min-h-[75vh]">
      {/* Account User Header Banner */}
      <div className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border/60 shadow-soft">
        <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl uppercase font-display border border-primary/20 shrink-0">
          {profile.fullName.slice(0, 2)}
        </div>
        <div className="flex flex-col min-w-0">
          <Heading level={2} className="text-lg sm:text-xl font-bold font-display text-foreground truncate">
            {profile.fullName}
          </Heading>
          <span className="text-xs text-stone-500">{profile.email} • Member since {profile.memberSince}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 flex flex-col gap-1 p-2 rounded-2xl bg-card border border-border/60 shadow-soft w-full">
          {ACCOUNT_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-flat'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon name={item.icon} className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </aside>

        {/* Content View */}
        <main className="lg:col-span-9 w-full">
          {children}
        </main>
      </div>
    </Container>
  );
}
