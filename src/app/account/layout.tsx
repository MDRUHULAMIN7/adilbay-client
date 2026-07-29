'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';
import { useWishlist } from '@/hooks/useWishlist';
import { useOrders } from '@/hooks/useOrders';
import { useUserReviews } from '@/hooks/useUserReviews';
import { Container } from '@/components/layout/container';
import { Icon } from '@/components/ui/icon';

const ACCOUNT_NAV_ITEMS = [
  { label: 'Overview', href: '/account', icon: 'grid' },
  { label: 'My Orders', href: '/account/orders', icon: 'package' },
  { label: 'Saved Addresses', href: '/account/addresses', icon: 'mapPin' },
  { label: 'Wishlist', href: '/account/wishlist', icon: 'heart' },
  { label: 'My Reviews', href: '/account/reviews', icon: 'messageSquare' },
  { label: 'Profile Details', href: '/account/profile', icon: 'user' },
  { label: 'Settings', href: '/account/settings', icon: 'settings' },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile, updateProfile } = useProfile();
  const { wishlistCount } = useWishlist();
  const { rawOrders } = useOrders();
  const { reviews } = useUserReviews();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updateProfile({ avatar: result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <Container variant="wide" className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 flex flex-col gap-8 text-left w-full">
        {/* Theme-matching Minimalist Profile Header Banner */}
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-card text-foreground shadow-soft border border-stone-200/90 dark:border-stone-800">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* User Profile Avatar & Upload Button */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Interactive Avatar Frame with Camera Upload Trigger */}
              <div className="relative group shrink-0">
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-md flex items-center justify-center">
                  {profile.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt={profile.fullName}
                      fill
                      className="object-cover"
                      sizes="80px"
                      unoptimized
                    />
                  ) : (
                    <span className="font-display font-extrabold text-xl sm:text-2xl text-primary uppercase">
                      {profile.fullName.slice(0, 2)}
                    </span>
                  )}
                </div>

                {/* Camera Upload Badge Button */}
                <label
                  title="Upload profile photo"
                  className="absolute -bottom-1 -right-1 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-background"
                >
                  <Icon name="camera" className="h-3.5 w-3.5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-foreground truncate">
                    {profile.fullName}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2.5 py-0.5 rounded-full border border-stone-200 dark:border-stone-700">
                    <Icon name="shieldCheck" className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    Verified Member
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-medium truncate">
                  {profile.email} &bull; Member since {profile.memberSince}
                </p>
              </div>
            </div>

            {/* Live Quick Counter Chips (Theme Matching) */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap border-t md:border-t-0 border-stone-200/60 dark:border-stone-800 pt-4 md:pt-0">
              <div className="flex flex-col items-center px-4 py-2 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 min-w-[80px]">
                <span className="text-lg font-bold font-display text-foreground">{rawOrders.length}</span>
                <span className="text-[10px] uppercase font-bold text-stone-400">Orders</span>
              </div>
              <div className="flex flex-col items-center px-4 py-2 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 min-w-[80px]">
                <span className="text-lg font-bold font-display text-rose-600 dark:text-rose-400">{wishlistCount}</span>
                <span className="text-[10px] uppercase font-bold text-stone-400">Wishlist</span>
              </div>
              <div className="flex flex-col items-center px-4 py-2 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 min-w-[80px]">
                <span className="text-lg font-bold font-display text-emerald-600 dark:text-emerald-400">{reviews.length}</span>
                <span className="text-[10px] uppercase font-bold text-stone-400">Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid Layout: Navigation Sidebar + Content Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Senior UI Nav Sidebar */}
          <aside className="lg:col-span-3 flex flex-col gap-1.5 p-3 rounded-3xl bg-card border border-stone-200/80 dark:border-stone-800 shadow-soft w-full">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1.5">
              Account Menu
            </span>
            {ACCOUNT_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              let badgeCount: number | null = null;
              if (item.href === '/account/orders') badgeCount = rawOrders.length;
              if (item.href === '/account/wishlist') badgeCount = wishlistCount;
              if (item.href === '/account/reviews') badgeCount = reviews.length;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.01]'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/60 hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon name={item.icon} className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {badgeCount !== null && badgeCount > 0 && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {badgeCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </aside>

          {/* Main Account Content Workspace */}
          <main className="lg:col-span-9 w-full min-h-[500px]">
            {children}
          </main>
        </div>
      </Container>
    </div>
  );
}
