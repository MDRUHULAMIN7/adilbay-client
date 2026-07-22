'use client';

import React from 'react';
import Link from 'next/link';
import { useOrders } from '@/hooks/useOrders';
import { OrderCard } from '@/features/orders/order-card/order-card';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';

const STATUS_TABS = [
  { id: 'all', label: 'All Orders' },
  { id: 'placed', label: 'Processing' },
  { id: 'shipped', label: 'Out for Delivery' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'cancelled', label: 'Cancelled' },
];

export default function AccountOrdersPage() {
  const { orders, rawOrders, statusFilter, setStatusFilter, searchQuery, setSearchQuery } = useOrders();

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <Heading level={2} className="font-display text-xl font-bold">
          Order History ({rawOrders.length})
        </Heading>

        {/* Search Filter */}
        <input
          type="text"
          placeholder="Search by order ID or product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-background border border-border/80 rounded-lg px-3 py-1.5 text-xs font-semibold placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-64"
        />
      </div>

      {/* Status Tabs Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-border/40 scrollbar-none">
        {STATUS_TABS.map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-flat'
                  : 'text-stone-500 hover:text-foreground hover:bg-muted'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Orders Cards List */}
      {orders.length === 0 ? (
        <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
          <span className="text-sm font-bold text-stone-500">No orders found matching status</span>
          <Link href="/shop">
            <Button variant="primary" size="sm" className="text-xs font-bold uppercase tracking-wider cursor-pointer">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
