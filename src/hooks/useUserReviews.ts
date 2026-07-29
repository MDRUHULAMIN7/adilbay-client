'use client';

import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { useToast } from '@/components/ui/toast';

export interface UserReview {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  productSlug: string;
  rating: number;
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
}

const REVIEWS_STORAGE_KEY = 'furnixo_user_reviews';

const defaultReviews: UserReview[] = [
  {
    id: 'rev-101',
    productId: 'prod-1',
    productTitle: 'Royal Solid Teak Sofa Set',
    productImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=300',
    productSlug: 'royal-solid-teak-sofa-set',
    rating: 5,
    comment: 'The solid teak wood seasoning and craftsmanship are beyond expectations! Truly an heirloom piece in our living room.',
    createdAt: '2026-06-15',
    verifiedPurchase: true,
  },
  {
    id: 'rev-102',
    productId: 'prod-2',
    productTitle: 'Minimalist Dining Table (6 Seater)',
    productImage: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=300',
    productSlug: 'minimalist-dining-table',
    rating: 4,
    comment: 'Sleek design with warm matte lacquer finish. Assembly service was prompt and professional.',
    createdAt: '2026-07-02',
    verifiedPurchase: true,
  },
  {
    id: 'rev-103',
    productId: 'prod-3',
    productTitle: 'Nordic Oak Lounge Chair',
    productImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=300',
    productSlug: 'nordic-oak-lounge-chair',
    rating: 5,
    comment: 'Extremely comfortable ergonomic seating with premium linen upholstery. Highly recommended!',
    createdAt: '2026-07-20',
    verifiedPurchase: true,
  },
];

export function useUserReviews() {
  const [reviews, setReviews] = useState<UserReview[]>(defaultReviews);
  const { addToast } = useToast();

  useEffect(() => {
    const stored = storage.get<UserReview[]>(REVIEWS_STORAGE_KEY, defaultReviews);
    setReviews(stored);
  }, []);

  const saveReviews = (next: UserReview[]) => {
    setReviews(next);
    storage.set(REVIEWS_STORAGE_KEY, next);
  };

  const addReview = (reviewData: Omit<UserReview, 'id' | 'createdAt' | 'verifiedPurchase'>) => {
    const newReview: UserReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      verifiedPurchase: true,
    };
    const next = [newReview, ...reviews];
    saveReviews(next);
    addToast({
      title: 'Review Submitted ⭐',
      description: `Thank you for reviewing "${reviewData.productTitle}"! Your review is now live under My Reviews.`,
      variant: 'success',
    });
  };

  const updateReview = (id: string, updated: Partial<UserReview>) => {
    const next = reviews.map((r) => (r.id === id ? { ...r, ...updated } : r));
    saveReviews(next);
    addToast({
      title: 'Review Updated',
      description: 'Your product review feedback has been successfully modified.',
      variant: 'success',
    });
  };

  const deleteReview = (id: string) => {
    const target = reviews.find((r) => r.id === id);
    const next = reviews.filter((r) => r.id !== id);
    saveReviews(next);
    addToast({
      title: 'Review Deleted',
      description: `Review for "${target?.productTitle || 'item'}" has been removed.`,
      variant: 'info',
    });
  };

  return {
    reviews,
    addReview,
    updateReview,
    deleteReview,
  };
}

export default useUserReviews;
