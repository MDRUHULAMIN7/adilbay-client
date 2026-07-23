'use client';

import Link from 'next/link';
import { useOrders } from '@/hooks/useOrders';
import { useAddresses } from '@/hooks/useAddresses';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPrice } from '@/lib/format-price';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';

export default function AccountDashboardPage() {
  const { rawOrders } = useOrders();
  const { addresses } = useAddresses();
  const { wishlistCount } = useWishlist();

  const recentOrder = rawOrders[0];
  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];

  return (
    <div className="flex flex-col gap-6 text-left">
      <Heading level={2} className="font-display text-xl font-bold">
        Account Overview
      </Heading>

      {/* Quick Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-soft flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-stone-400">Total Orders</span>
          <span className="text-2xl font-bold font-display text-foreground">{rawOrders.length}</span>
        </div>
        <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-soft flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-stone-400">Saved Wishlist</span>
          <span className="text-2xl font-bold font-display text-primary">{wishlistCount} items</span>
        </div>
        <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-soft flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-stone-400">Address Book</span>
          <span className="text-2xl font-bold font-display text-foreground">{addresses.length} addresses</span>
        </div>
      </div>

      {/* Recent Order Preview */}
      <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-soft flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <Heading level={3} className="font-display text-base font-bold">
            Recent Order
          </Heading>
          <Link href="/account/orders">
            <span className="text-xs font-semibold text-primary hover:underline cursor-pointer">View All Orders</span>
          </Link>
        </div>

        {recentOrder ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-primary font-display text-sm">{recentOrder.id}</span>
              <span className="text-stone-500">{recentOrder.items.length} items • {formatPrice(recentOrder.grandTotal)}</span>
              <span className="text-[11px] text-stone-400">{new Date(recentOrder.createdAt).toLocaleDateString()}</span>
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

      {/* Default Shipping Address Preview */}
      <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-soft flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <Heading level={3} className="font-display text-base font-bold">
            Default Delivery Address
          </Heading>
          <Link href="/account/addresses">
            <span className="text-xs font-semibold text-primary hover:underline cursor-pointer">Manage Addresses</span>
          </Link>
        </div>

        {defaultAddress ? (
          <div className="flex flex-col text-xs gap-1">
            <span className="font-bold text-foreground">{defaultAddress.fullName}</span>
            <span className="text-stone-500">{defaultAddress.addressLine1}</span>
            <span className="text-stone-500">{defaultAddress.district}, {defaultAddress.division} - {defaultAddress.postalCode}</span>
            <span className="text-stone-500 pt-1">{defaultAddress.phone}</span>
          </div>
        ) : (
          <div className="py-4 text-center text-xs text-stone-500">
            No default address set.
          </div>
        )}
      </div>
    </div>
  );
}
