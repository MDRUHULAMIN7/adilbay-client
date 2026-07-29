'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Order, OrderItem } from '@/types/order';
import { formatPrice } from '@/lib/format-price';
import { useUserReviews } from '@/hooks/useUserReviews';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const { addReview } = useUserReviews();
  const [reviewingItem, setReviewingItem] = useState<OrderItem | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  const handleOpenReview = (item: OrderItem) => {
    setReviewingItem(item);
    setRating(5);
    setComment('');
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingItem) return;

    addReview({
      productId: reviewingItem.productId,
      productTitle: reviewingItem.title,
      productImage: reviewingItem.image,
      productSlug: reviewingItem.productSlug || 'product',
      rating,
      comment,
    });

    setReviewingItem(null);
  };

  return (
    <div className="p-6 rounded-2xl bg-card border border-stone-200/80 dark:border-stone-800 shadow-soft flex flex-col gap-4 text-left">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200/60 dark:border-stone-800 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold font-display text-primary text-sm">{order.id}</span>
          <span className="text-stone-400">&bull;</span>
          <span className="text-stone-500">
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
        <span className="font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase text-[10px]">
          {order.status}
        </span>
      </div>

      {/* Item Thumbnails & Write Review Buttons */}
      <div className="flex flex-col gap-3 py-1">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/60"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative h-12 w-12 rounded-lg bg-stone-200 dark:bg-stone-800 overflow-hidden border border-stone-300 dark:border-stone-700 shrink-0">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                    unoptimized
                  />
                )}
              </div>
              <div className="flex flex-col min-w-0 text-xs">
                <span className="font-bold text-foreground font-display truncate">{item.title}</span>
                <span className="text-[11px] text-stone-400">
                  Qty: {item.quantity} &bull; {formatPrice(item.unitPrice)}
                </span>
              </div>
            </div>

            {/* Write Product Review Button */}
            <button
              onClick={() => handleOpenReview(item)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-xs font-bold transition-all shrink-0 cursor-pointer"
            >
              <Icon name="star" className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>Write Review</span>
            </button>
          </div>
        ))}
      </div>

      {/* Footer Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-200/60 dark:border-stone-800 pt-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-stone-500">
            Grand Total: <strong className="text-foreground text-sm font-display">{formatPrice(order.grandTotal)}</strong>
          </span>
        </div>

        <Link href={`/account/orders/${order.id}`}>
          <Button variant="outline" size="sm" className="text-xs font-bold cursor-pointer rounded-xl">
            View Details &amp; Invoice
          </Button>
        </Link>
      </div>

      {/* Write Review Modal */}
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

export default OrderCard;
