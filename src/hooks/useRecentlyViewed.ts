'use client';

import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';

const MAX_RECENT_ITEMS = 10;

export function useRecentlyViewed() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    const raw = storage.get('recently-viewed');
    if (raw) {
      try {
        setRecent(JSON.parse(raw));
      } catch (e) {
        setRecent([]);
      }
    }
  }, []);

  const addRecentlyViewed = (slug: string) => {
    // Filter out item if it already exists to place it at the end (most recent)
    const filtered = recent.filter((item) => item !== slug);
    const next = [...filtered, slug];

    // Shift oldest item if we exceed the limit of 10 items
    if (next.length > MAX_RECENT_ITEMS) {
      next.shift();
    }

    setRecent(next);
    storage.set('recently-viewed', JSON.stringify(next));
  };

  const clearRecentlyViewed = () => {
    setRecent([]);
    storage.remove('recently-viewed');
  };

  return { recent, addRecentlyViewed, clearRecentlyViewed };
}
export default useRecentlyViewed;
