'use client';

import React from 'react';
import Link from 'next/link';
import { useOrders } from '@/hooks/useOrders';
import { useAddresses } from '@/hooks/useAddresses';
import { useWishlist } from '@/hooks/useWishlist';
import { useUserReviews } from '@/hooks/useUserReviews';
import { formatPrice } from '@/lib/format-price';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

export default function AccountDashboardPage() {
  const { rawOrders } = useOrders();
  const { addresses } = useAddresses();
  const { wishlistCount } = useWishlist();
  const { reviews } = useUserReviews();

  const recentOrder = rawOrders[0];
  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];

  return (
    <div className="flex flex-col gap-6 text-left w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <Heading level={2} className="font-display text-xl sm:text-2xl font-bold text-foreground">
            Account Dashboard
          </Heading>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Welcome back! Here is a summary of your recent activity and saved preferences.
          </p>
        </div>
      </div>

      {/* 4 Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/account/orders" className="group">
          <div className="p-5 rounded-2xl bg-card border border-stone-200/80 dark:border-stone-800 shadow-soft group-hover:border-primary/50 group-hover:shadow-md transition-all flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-stone-400">Total Orders</span>
              <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon name="package" className="h-4 w-4" />
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-bold font-display text-foreground">{rawOrders.length}</span>
          </div>
        </Link>

        <Link href="/account/wishlist" className="group">
          <div className="p-5 rounded-2xl bg-card border border-stone-200/80 dark:border-stone-800 shadow-soft group-hover:border-rose-500/50 group-hover:shadow-md transition-all flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-stone-400">Saved Wishlist</span>
              <div className="h-8 w-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <Icon name="heart" className="h-4 w-4" />
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-bold font-display text-rose-600 dark:text-rose-400">{wishlistCount}</span>
          </div>
        </Link>

        <Link href="/account/reviews" className="group">
          <div className="p-5 rounded-2xl bg-card border border-stone-200/80 dark:border-stone-800 shadow-soft group-hover:border-emerald-500/50 group-hover:shadow-md transition-all flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-stone-400">My Reviews</span>
              <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Icon name="messageSquare" className="h-4 w-4" />
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-bold font-display text-emerald-600 dark:text-emerald-400">{reviews.length}</span>
          </div>
        </Link>

        <Link href="/account/addresses" className="group">
          <div className="p-5 rounded-2xl bg-card border border-stone-200/80 dark:border-stone-800 shadow-soft group-hover:border-amber-500/50 group-hover:shadow-md transition-all flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-stone-400">Addresses</span>
              <div className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Icon name="mapPin" className="h-4 w-4" />
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-bold font-display text-foreground">{addresses.length}</span>
          </div>
        </Link>
      </div>

      {/* Recent Order Preview */}
      <div className="p-6 rounded-2xl bg-card border border-stone-200/80 dark:border-stone-800 shadow-soft flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-stone-200/60 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <Icon name="package" className="h-4 w-4 text-primary" />
            <Heading level={3} className="font-display text-base font-bold">
              Recent Order
            </Heading>
          </div>
          <Link href="/account/orders">
            <span className="text-xs font-semibold text-primary hover:underline cursor-pointer">View All Orders</span>
          </Link>
        </div>

        {recentOrder ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-primary font-display text-sm">{recentOrder.id}</span>
              <span className="text-stone-500 font-medium">
                {recentOrder.items.length} items &bull; {formatPrice(recentOrder.grandTotal)}
              </span>
              <span className="text-[11px] text-stone-400">
                Placed on {new Date(recentOrder.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase text-[10px]">
                {recentOrder.status}
              </span>
              <Link href={`/account/orders/${recentOrder.id}`}>
                <Button variant="outline" size="sm" className="text-xs font-bold cursor-pointer">
                  Details
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-stone-500">
            No orders placed yet.
          </div>
        )}
      </div>

      {/* Default Shipping Address & Recent Review Shortcut Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address Card */}
        <div className="p-6 rounded-2xl bg-card border border-stone-200/80 dark:border-stone-800 shadow-soft flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between border-b border-stone-200/60 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Icon name="mapPin" className="h-4 w-4 text-amber-500" />
              <Heading level={3} className="font-display text-base font-bold">
                Default Address
              </Heading>
            </div>
            <Link href="/account/addresses">
              <span className="text-xs font-semibold text-primary hover:underline cursor-pointer">Manage</span>
            </Link>
          </div>

          {defaultAddress ? (
            <div className="flex flex-col text-xs gap-1">
              <span className="font-bold text-foreground text-sm">{defaultAddress.fullName}</span>
              <span className="text-stone-500">{defaultAddress.addressLine1}</span>
              <span className="text-stone-500">{defaultAddress.district}, {defaultAddress.division} - {defaultAddress.postalCode}</span>
              <span className="text-stone-500 pt-1 font-semibold">{defaultAddress.phone}</span>
            </div>
          ) : (
            <div className="py-4 text-center text-xs text-stone-500">
              No default address set.
            </div>
          )}
        </div>

        {/* Reviews Shortcut Card */}
        <div className="p-6 rounded-2xl bg-card border border-stone-200/80 dark:border-stone-800 shadow-soft flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between border-b border-stone-200/60 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Icon name="messageSquare" className="h-4 w-4 text-emerald-500" />
              <Heading level={3} className="font-display text-base font-bold">
                My Reviews &amp; Ratings
              </Heading>
            </div>
            <Link href="/account/reviews">
              <span className="text-xs font-semibold text-primary hover:underline cursor-pointer">View All</span>
            </Link>
          </div>

          {reviews.length > 0 ? (
            <div className="flex flex-col text-xs gap-1.5">
              <span className="font-bold text-foreground truncate">{reviews[0].productTitle}</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    name="star"
                    className={`h-3.5 w-3.5 ${
                      star <= reviews[0].rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-stone-300 dark:text-stone-700'
                    }`}
                  />
                ))}
                <span className="text-[11px] text-stone-400 ml-1.5">{reviews[0].createdAt}</span>
              </div>
              <p className="text-stone-500 line-clamp-2 text-[11px]">
                &ldquo;{reviews[0].comment}&rdquo;
              </p>
            </div>
          ) : (
            <div className="py-4 text-center text-xs text-stone-500">
              No reviews written yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
