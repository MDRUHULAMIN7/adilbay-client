'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useOrders } from '@/hooks/useOrders';
import { useUserReviews } from '@/hooks/useUserReviews';
import { OrderCard } from '@/features/orders/order-card/order-card';
import { formatPrice } from '@/lib/format-price';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

const STATUS_OPTIONS = [
  { id: 'all', label: 'All Order Statuses' },
  { id: 'placed', label: 'Processing' },
  { id: 'shipped', label: 'Out for Delivery' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'cancelled', label: 'Cancelled' },
];

export default function AccountOrdersPage() {
  const { orders, rawOrders, statusFilter, setStatusFilter, searchQuery, setSearchQuery } = useOrders();
  const { addReview } = useUserReviews();
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const [reviewingItem, setReviewingItem] = useState<{
    id: string;
    productId: string;
    title: string;
    image: string;
    productSlug: string;
  } | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40';
      case 'shipped':
      case 'confirmed':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40';
      case 'cancelled':
        return 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/40';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingItem) return;

    addReview({
      productId: reviewingItem.productId,
      productTitle: reviewingItem.title,
      productImage: reviewingItem.image,
      productSlug: reviewingItem.productSlug,
      rating,
      comment,
    });

    setReviewingItem(null);
  };

  return (
    <div className="flex flex-col gap-6 text-left w-full">
      {/* Header with Search Input + Status Dropdown + View Mode Switch */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <Heading level={2} className="font-display text-xl sm:text-2xl font-bold text-foreground">
            Order History Table
          </Heading>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            View detailed order status, date, items breakdown, and submit product reviews ({orders.length} of {rawOrders.length} orders showing)
          </p>
        </div>

        {/* Side-by-Side Aligned Controls Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search Box Input */}
          <div className="relative flex items-center w-full sm:w-60">
            <Icon name="search" className="absolute left-3.5 h-4 w-4 text-stone-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search ID or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-stone-300 dark:border-stone-700 rounded-xl pl-9 pr-8 py-2.5 text-xs font-semibold placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-stone-400 hover:text-foreground cursor-pointer p-0.5"
                title="Clear search"
              >
                <Icon name="close" className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter Dropdown Select */}
          <div className="relative flex items-center w-full sm:w-44">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-background border border-stone-300 dark:border-stone-700 rounded-xl pl-3.5 pr-9 py-2.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground appearance-none cursor-pointer shadow-sm transition-all"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.id} value={option.id} className="bg-background text-foreground">
                  {option.label}
                </option>
              ))}
            </select>
            <Icon name="chevronDown" className="absolute right-3 h-4 w-4 text-stone-400 pointer-events-none" />
          </div>

          {/* View Toggle (Table / Cards Mode) */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl border border-stone-200 dark:border-stone-700 shrink-0">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-stone-400 hover:text-foreground'
              }`}
              title="Table View"
            >
              <Icon name="grid" className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-stone-400 hover:text-foreground'
              }`}
              title="Card View"
            >
              <Icon name="package" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Orders Data View */}
      {orders.length === 0 ? (
        <div className="py-16 text-center flex flex-col items-center justify-center gap-3 p-8 rounded-2xl bg-card border border-stone-200/80 dark:border-stone-800">
          <Icon name="package" className="h-12 w-12 text-stone-300 dark:text-stone-700" />
          <Heading level={3} className="font-display text-base font-bold text-foreground">
            No Orders Found
          </Heading>
          <p className="text-xs text-stone-500 max-w-sm">
            We couldn&apos;t find any orders matching your search query or selected status filter.
          </p>
          {(searchQuery || statusFilter !== 'all') && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
              className="mt-2 text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </Button>
          )}
        </div>
      ) : viewMode === 'table' ? (
        /* Senior UI Data Table Format */
        <div className="w-full rounded-2xl bg-card border border-stone-200/80 dark:border-stone-800 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-900/80 border-b border-stone-200/80 dark:border-stone-800 text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
                  <th className="py-3.5 px-5">Order ID</th>
                  <th className="py-3.5 px-5">Date</th>
                  <th className="py-3.5 px-5">Products</th>
                  <th className="py-3.5 px-5">Total</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/60 dark:divide-stone-800/60 text-xs">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-stone-50/70 dark:hover:bg-stone-800/40 transition-colors"
                  >
                    {/* Order ID */}
                    <td className="py-4 px-5 font-bold font-display text-primary text-sm whitespace-nowrap">
                      <Link href={`/account/orders/${order.id}`} className="hover:underline">
                        {order.id}
                      </Link>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-5 text-stone-600 dark:text-stone-300 font-medium whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Product Thumbnails Stack */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center -space-x-2 overflow-hidden">
                          {order.items.slice(0, 3).map((item) => (
                            <div
                              key={item.id}
                              className="relative h-9 w-9 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 border-2 border-background shrink-0"
                            >
                              {item.image && (
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                  sizes="36px"
                                  unoptimized
                                />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-foreground truncate max-w-[180px]">
                            {order.items[0]?.title}
                          </span>
                          {order.items.length > 1 && (
                            <span className="text-[10px] text-stone-400 font-medium">
                              +{order.items.length - 1} more item{order.items.length > 2 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Grand Total */}
                    <td className="py-4 px-5 font-bold font-display text-foreground text-sm whitespace-nowrap">
                      {formatPrice(order.grandTotal)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full uppercase text-[10px] font-extrabold border ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {order.status}
                      </span>
                    </td>

                    {/* Actions: Write Review & View Details */}
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            const item = order.items[0];
                            if (item) {
                              setReviewingItem({
                                id: item.id,
                                productId: item.productId,
                                title: item.title,
                                image: item.image,
                                productSlug: item.productSlug || 'product',
                              });
                              setRating(5);
                              setComment('');
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer"
                        >
                          <Icon name="star" className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span>Review</span>
                        </button>

                        <Link href={`/account/orders/${order.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs font-bold cursor-pointer rounded-xl hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            Details
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Card View Mode */
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      {/* Write Review Modal from Table View */}
      {reviewingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-card text-card-foreground rounded-2xl p-6 sm:p-8 shadow-2xl border border-stone-200/80 dark:border-stone-800 flex flex-col gap-6 text-left animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
              <Heading level={3} className="font-display text-lg font-bold">
                Write Product Review
              </Heading>
              <button
                onClick={() => setReviewingItem(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="flex flex-col gap-5">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800">
                <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                  <Image
                    src={reviewingItem.image}
                    alt={reviewingItem.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-display font-bold text-xs sm:text-sm text-foreground truncate">
                    {reviewingItem.title}
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                    ✓ Verified Purchased Item
                  </span>
                </div>
              </div>

              {/* Star Rating Select */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-foreground">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Icon
                        name="star"
                        className={`h-6 w-6 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-stone-300 dark:text-stone-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-stone-500 ml-2">
                    {rating} out of 5 Stars
                  </span>
                </div>
              </div>

              {/* Review Comment Textarea */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-foreground">Your Review &amp; Feedback</label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-background border border-stone-300 dark:border-stone-700 rounded-xl p-3.5 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground"
                  placeholder="Describe the wood finish, durability, and comfort of this product..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-stone-200/80 dark:border-stone-800">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setReviewingItem(null)}
                  className="text-xs font-bold cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md shadow-primary/20"
                >
                  Submit Review ⭐
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
