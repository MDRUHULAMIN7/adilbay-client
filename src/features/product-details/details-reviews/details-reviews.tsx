'use client';

import React, { useState } from 'react';
import { Review } from '@/types/product';
import { ProductRating } from '@/features/products/product-rating';
import { NoReviews } from '@/features/empty-states';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/cn';

interface DetailsReviewsProps {
  initialReviews: Review[];
  rating: number;
}

export function DetailsReviews({ initialReviews, rating }: DetailsReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [city, setCity] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || !city.trim()) {
      toast({
        type: 'error',
        title: 'Form Incomplete',
        message: 'Please fill in all the feedback fields before submitting.',
      });
      return;
    }

    const newRev: Review = {
      id: `rev-new-${Date.now()}`,
      rating: userRating,
      comment,
      userName: name,
      date: new Date().toISOString().split('T')[0],
      country: city,
    };

    setReviews([newRev, ...reviews]);
    setName('');
    setComment('');
    setCity('');
    setUserRating(5);
    setIsOpen(false);

    toast({
      type: 'success',
      title: 'Review Submitted',
      message: 'Thank you for your valuable woodcraft feedback!',
    });
  };

  return (
    <div className="flex flex-col gap-6 text-left w-full mt-10">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <Heading level={3} className="font-display font-bold text-lg text-foreground tracking-tight">
          Customer Feedbacks ({reviews.length})
        </Heading>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5"
        >
          <Icon name="plus" className="h-3.5 w-3.5" />
          <span>Write a Review</span>
        </Button>
      </div>

      {/* Review Modal/Form */}
      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-5 rounded-card border border-primary/20 bg-primary/5/10"
        >
          <Heading level={4} className="font-display font-bold text-sm text-foreground">
            Share Your Experience
          </Heading>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase text-stone-400">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background border border-border/80 text-foreground py-2 px-3 rounded-lg text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="e.g. Adnan Sami"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase text-stone-400">City / District</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-background border border-border/80 text-foreground py-2 px-3 rounded-lg text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="e.g. Dhaka"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase text-stone-400">Rating Stars</label>
            <div className="flex gap-1.5 text-amber-500">
              {Array.from({ length: 5 }).map((_, idx) => {
                const score = idx + 1;
                const active = score <= userRating;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setUserRating(score)}
                    className="cursor-pointer focus-visible:outline-none"
                  >
                    <Icon
                      name="star"
                      className={cn(
                        'h-5 w-5',
                        active ? 'fill-amber-550 text-amber-550' : 'text-stone-300 dark:text-stone-700'
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase text-stone-400">Comments</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-background border border-border/80 text-foreground py-2 px-3 rounded-lg text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="Detail your experience with Furnixo's materials finish..."
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="rounded-lg text-xs cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="brand"
              size="sm"
              className="rounded-lg text-xs cursor-pointer font-bold px-4"
            >
              Submit Review
            </Button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <NoReviews />
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="flex flex-col gap-2.5 p-5 border border-border/40 bg-surface/5 rounded-card">
              <div className="flex items-center justify-between">
                <ProductRating rating={rev.rating} showText={false} />
                <span className="text-[10px] text-stone-400 font-semibold">{rev.date}</span>
              </div>
              <Text className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm italic">"{rev.comment}"</Text>
              <div className="text-[10px] font-bold text-stone-500 flex items-center gap-1.5 uppercase tracking-wide">
                <span>{rev.userName}</span>
                <span>&bull;</span>
                <span className="text-primary">{rev.country}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default DetailsReviews;
