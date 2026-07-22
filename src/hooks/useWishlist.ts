'use client';

import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/storage';
import { useToast } from '@/components/ui/toast';

const WISHLIST_KEY = 'furnixo_wishlist';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    const stored = storage.get<string[]>(WISHLIST_KEY, []);
    setWishlist(stored);
  }, []);

  const toggleWishlist = useCallback(
    (slug: string, title?: string) => {
      const exists = wishlist.includes(slug);
      const next = exists ? wishlist.filter((item) => item !== slug) : [...wishlist, slug];

      setWishlist(next);
      storage.set(WISHLIST_KEY, next);

      addToast({
        title: exists ? 'Removed from Wishlist' : 'Saved to Wishlist',
        description: title
          ? `"${title}" has been ${exists ? 'removed from' : 'added to'} your saved wishlist.`
          : `Item ${exists ? 'removed from' : 'added to'} wishlist.`,
        variant: exists ? 'info' : 'success',
      });
    },
    [wishlist, addToast]
  );

  const isInWishlist = useCallback(
    (slug: string) => {
      return wishlist.includes(slug);
    },
    [wishlist]
  );

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    storage.remove(WISHLIST_KEY);
    addToast({
      title: 'Wishlist Cleared',
      description: 'All saved items have been cleared from your wishlist.',
      variant: 'info',
    });
  }, [addToast]);

  return { wishlist, toggleWishlist, isInWishlist, clearWishlist, wishlistCount: wishlist.length };
}

export default useWishlist;
