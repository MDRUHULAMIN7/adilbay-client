import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';

const RECENT_SEARCHES_KEY = 'furnixo_recent_searches';
const MAX_RECENT_ITEMS = 5;

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    const list = storage.get<string[]>(RECENT_SEARCHES_KEY, []);
    setSearches(list);
  }, []);

  const addSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, MAX_RECENT_ITEMS);
      storage.set<string[]>(RECENT_SEARCHES_KEY, updated);
      return updated;
    });
  };

  const removeSearch = (term: string) => {
    setSearches((prev) => {
      const updated = prev.filter((item) => item !== term);
      storage.set<string[]>(RECENT_SEARCHES_KEY, updated);
      return updated;
    });
  };

  const clearSearches = () => {
    setSearches([]);
    storage.remove(RECENT_SEARCHES_KEY);
  };

  return { searches, addSearch, removeSearch, clearSearches };
}
