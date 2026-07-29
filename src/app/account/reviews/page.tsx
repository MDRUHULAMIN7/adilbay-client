'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUserReviews, UserReview } from '@/hooks/useUserReviews';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

export default function UserReviewsPage() {
  const { reviews, updateReview, deleteReview } = useUserReviews();
  const [editingReview, setEditingReview] = useState<UserReview | null>(null);
  const [editRating, setEditRating] = useState<number>(5);
  const [editComment, setEditComment] = useState<string>('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleOpenEdit = (review: UserReview) => {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    updateReview(editingReview.id, {
      rating: editRating,
      comment: editComment,
    });
    setEditingReview(null);
  };

  const handleConfirmDelete = (id: string) => {
    deleteReview(id);
    setDeletingId(null);
  };

  return (
    <div className="flex flex-col gap-6 text-left w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <Heading level={2} className="font-display text-xl sm:text-2xl font-bold text-foreground">
            My Product Reviews
          </Heading>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Manage, edit, or delete your verified woodcraft ratings and customer feedback.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold w-fit">
          <Icon name="messageSquare" className="h-4 w-4" />
          <span>{reviews.length} Submitted Reviews</span>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-5 sm:p-6 rounded-2xl bg-card border border-stone-200/80 dark:border-stone-800 shadow-soft hover:shadow-md transition-all flex flex-col gap-4 text-left"
            >
              {/* Product Info & Action Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-stone-200/50 dark:border-stone-800/60">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 border border-stone-200/60 dark:border-stone-700">
                    <Image
                      src={review.productImage}
                      alt={review.productTitle}
                      fill
                      className="object-cover"
                      sizes="56px"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <Link
                      href={`/products/${review.productSlug}`}
                      className="font-display font-bold text-sm sm:text-base text-foreground hover:text-primary transition-colors truncate"
                    >
                      {review.productTitle}
                    </Link>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-stone-400">{review.createdAt}</span>
                      {review.verifiedPurchase && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                          <Icon name="shieldCheck" className="h-3 w-3" />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rating Stars & Action Buttons */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        name="star"
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-stone-300 dark:text-stone-700'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="h-4 w-[1px] bg-stone-200 dark:bg-stone-800" />

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(review)}
                      className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-primary hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer"
                      title="Edit Review"
                      aria-label="Edit Review"
                    >
                      <Icon name="edit" className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => setDeletingId(review.id)}
                      className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all cursor-pointer"
                      title="Delete Review"
                      aria-label="Delete Review"
                    >
                      <Icon name="trash" className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Review Comment Body */}
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-normal leading-relaxed">
                &ldquo;{review.comment}&rdquo;
              </p>

              {/* Delete Confirmation Modal / Prompt inline */}
              {deletingId === review.id && (
                <div className="mt-2 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
                  <span className="text-red-700 dark:text-red-300 font-semibold">
                    Are you sure you want to delete this review?
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletingId(null)}
                      className="text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConfirmDelete(review.id)}
                      className="bg-red-600 hover:bg-red-700 text-white border-none text-xs font-bold cursor-pointer"
                    >
                      Yes, Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center flex flex-col items-center justify-center gap-3 p-8 rounded-2xl bg-card border border-stone-200/80 dark:border-stone-800">
          <Icon name="messageSquare" className="h-12 w-12 text-stone-300 dark:text-stone-700" />
          <Heading level={3} className="font-display text-base font-bold text-foreground">
            No Product Reviews Found
          </Heading>
          <p className="text-xs text-stone-500 max-w-sm">
            You haven&apos;t written any reviews yet. Share your experience on delivered furniture pieces to help fellow buyers!
          </p>
          <Link href="/account/orders" className="mt-2">
            <Button variant="primary" size="sm" className="font-bold text-xs uppercase tracking-wider cursor-pointer">
              View Delivered Orders
            </Button>
          </Link>
        </div>
      )}

      {/* Edit Review Modal */}
      {editingReview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-card text-card-foreground rounded-2xl p-6 sm:p-8 shadow-2xl border border-stone-200/80 dark:border-stone-800 flex flex-col gap-6 text-left animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
              <Heading level={3} className="font-display text-lg font-bold">
                Edit Product Review
              </Heading>
              <button
                onClick={() => setEditingReview(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="flex flex-col gap-5">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800">
                <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                  <Image
                    src={editingReview.productImage}
                    alt={editingReview.productTitle}
                    fill
                    className="object-cover"
                    sizes="48px"
                    unoptimized
                  />
                </div>
                <span className="font-display font-bold text-xs sm:text-sm text-foreground truncate">
                  {editingReview.productTitle}
                </span>
              </div>

              {/* Star Rating Select */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-foreground">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Icon
                        name="star"
                        className={`h-6 w-6 ${
                          star <= editRating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-stone-300 dark:text-stone-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-stone-500 ml-2">
                    {editRating} out of 5 Stars
                  </span>
                </div>
              </div>

              {/* Review Textarea */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-foreground">Review Feedback</label>
                <textarea
                  required
                  rows={4}
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  className="w-full bg-background border border-stone-300 dark:border-stone-700 rounded-xl p-3.5 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground"
                  placeholder="Write your updated feedback..."
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-stone-200/80 dark:border-stone-800">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setEditingReview(null)}
                  className="text-xs font-bold cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
