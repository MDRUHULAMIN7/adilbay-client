'use client';

import { useState, useEffect } from 'react';
import { useRecentSearches } from './useRecentSearches';
import { ProductService } from '@/services/product.service';
import { Product } from '@/types/product';
import { analytics } from '@/lib/analytics';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { searches, addSearch, removeSearch, clearSearches } = useRecentSearches();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const delayDebounce = setTimeout(() => {
      ProductService.getProducts()
        .then((products) => {
          const q = query.toLowerCase();
          const matched = products.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              p.category.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q)
          );
          setResults(matched);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const executeSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    addSearch(searchTerm);
    analytics.trackSearch(searchTerm);
  };

  return {
    query,
    setQuery,
    results,
    loading,
    recentSearches: searches,
    addRecentSearch: addSearch,
    removeRecentSearch: removeSearch,
    clearRecentSearches: clearSearches,
    executeSearch,
  };
}
export default useSearch;
