'use client';

import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';

const MAX_RECENT_ITEMS = 10;

export function useRecentlyViewed() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    const list = storage.get<string[]>('recently-viewed', []);
    setRecent(list);
  }, []);

  const addRecentlyViewed = (slug: string) => {
    const filtered = recent.filter((item) => item !== slug);
    const next = [...filtered, slug];

    if (next.length > MAX_RECENT_ITEMS) {
      next.shift();
    }

    setRecent(next);
    storage.set<string[]>('recently-viewed', next);
  };

  const clearRecentlyViewed = () => {
    setRecent([]);
    storage.remove('recently-viewed');
  };

  return { recent, addRecentlyViewed, clearRecentlyViewed };
}
export default useRecentlyViewed;
