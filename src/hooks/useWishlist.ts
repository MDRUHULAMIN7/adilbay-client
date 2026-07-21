'use client';

import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const raw = storage.get('wishlist');
    if (raw) {
      try {
        setWishlist(JSON.parse(raw));
      } catch (e) {
        setWishlist([]);
      }
    }
  }, []);

  const toggleWishlist = (slug: string) => {
    const next = wishlist.includes(slug)
      ? wishlist.filter((item) => item !== slug)
      : [...wishlist, slug];
    setWishlist(next);
    storage.set('wishlist', JSON.stringify(next));
  };

  const isInWishlist = (slug: string) => {
    return wishlist.includes(slug);
  };

  const clearWishlist = () => {
    setWishlist([]);
    storage.remove('wishlist');
  };

  return { wishlist, toggleWishlist, isInWishlist, clearWishlist };
}
export default useWishlist;
