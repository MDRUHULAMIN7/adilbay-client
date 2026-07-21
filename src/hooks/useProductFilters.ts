'use client';

import { useState, useEffect, useMemo } from 'react';
import { Product } from '@/types/product';
import { ProductService } from '@/services/product.service';

interface FilterState {
  categories: string[];
  materials: string[];
  colors: string[];
  availability: string[];
  priceRange: { min: number; max: number } | null;
}

const initialFilters: FilterState = {
  categories: [],
  materials: [],
  colors: [],
  availability: [],
  priceRange: null,
};

export function useProductFilters(initialCategory?: string, initialBrand?: string) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    ...initialFilters,
    categories: initialCategory ? [initialCategory] : [],
  });
  const [sort, setSort] = useState<string>('featured');
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const limit = 8; // PRODUCTS_PER_PAGE

  useEffect(() => {
    ProductService.getProducts()
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const toggleCategory = (val: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(val)
        ? prev.categories.filter((c) => c !== val)
        : [...prev.categories, val],
    }));
    setPage(1);
  };

  const toggleMaterial = (val: string) => {
    setFilters((prev) => ({
      ...prev,
      materials: prev.materials.includes(val)
        ? prev.materials.filter((m) => m !== val)
        : [...prev.materials, val],
    }));
    setPage(1);
  };

  const toggleColor = (val: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(val)
        ? prev.colors.filter((c) => c !== val)
        : [...prev.colors, val],
    }));
    setPage(1);
  };

  const toggleAvailability = (val: string) => {
    setFilters((prev) => ({
      ...prev,
      availability: prev.availability.includes(val)
        ? prev.availability.filter((a) => a !== val)
        : [...prev.availability, val],
    }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSort('featured');
    setSearchQuery('');
    setPage(1);
  };

  // Filtered and sorted products memoization
  const processedProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by Brand if initialBrand is specified
    if (initialBrand) {
      result = result.filter((p) => p.brand.toLowerCase() === initialBrand.toLowerCase());
    }

    // Filter by Category
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Filter by Material
    if (filters.materials.length > 0) {
      result = result.filter((p) =>
        p.materials.some((m) => filters.materials.includes(m))
      );
    }

    // Filter by Color
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) =>
          filters.colors.map((col) => col.toLowerCase()).includes(c.name.toLowerCase())
        )
      );
    }

    // Filter by Availability
    if (filters.availability.length > 0) {
      result = result.filter((p) => filters.availability.includes(p.stockStatus));
    }

    // Filter by Price Range
    if (filters.priceRange) {
      result = result.filter(
        (p) => p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [allProducts, filters, sort, searchQuery, initialBrand]);

  // Paginated subset
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * limit;
    return processedProducts.slice(start, start + limit);
  }, [processedProducts, page, limit]);

  const totalPages = Math.ceil(processedProducts.length / limit);

  return {
    products: paginatedProducts,
    totalCount: processedProducts.length,
    totalPages,
    page,
    setPage,
    loading,
    filters,
    toggleCategory,
    toggleMaterial,
    toggleColor,
    toggleAvailability,
    setPriceRange: (range: { min: number; max: number } | null) => {
      setFilters((prev) => ({ ...prev, priceRange: range }));
      setPage(1);
    },
    sort,
    setSort: (val: string) => {
      setSort(val);
      setPage(1);
    },
    searchQuery,
    setSearchQuery,
    resetFilters,
  };
}
export default useProductFilters;
