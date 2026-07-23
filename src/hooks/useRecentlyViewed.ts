'use client';

import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/storage';

const MAX_RECENT_ITEMS = 10;

export function useRecentlyViewed() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    const list = storage.get<string[]>('recently-viewed', []);
    setRecent(list);
  }, []);

  const addRecentlyViewed = useCallback((slug: string) => {
    if (!slug) return;
    setRecent((prev) => {
      if (prev[prev.length - 1] === slug) {
        return prev;
      }
      const filtered = prev.filter((item) => item !== slug);
      const next = [...filtered, slug];

      if (next.length > MAX_RECENT_ITEMS) {
        next.shift();
      }

      storage.set<string[]>('recently-viewed', next);
      return next;
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecent([]);
    storage.remove('recently-viewed');
  }, []);

  return { recent, addRecentlyViewed, clearRecentlyViewed };
}
export default useRecentlyViewed;
