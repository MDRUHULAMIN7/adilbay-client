import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';

const RECENT_SEARCHES_KEY = 'furnixo_recent_searches';
const MAX_RECENT_ITEMS = 5;

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    const raw = storage.get(RECENT_SEARCHES_KEY);
    if (raw) {
      try {
        setSearches(JSON.parse(raw));
      } catch (e) {
        setSearches([]);
      }
    }
  }, []);

  const addSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, MAX_RECENT_ITEMS);
      storage.set(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeSearch = (term: string) => {
    setSearches((prev) => {
      const updated = prev.filter((item) => item !== term);
      storage.set(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearSearches = () => {
    setSearches([]);
    storage.remove(RECENT_SEARCHES_KEY);
  };

  return { searches, addSearch, removeSearch, clearSearches };
}
