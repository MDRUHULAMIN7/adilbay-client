'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { ProductService } from '@/services/product.service';

export function useNewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    ProductService.getNewArrivals()
      .then((data) => {
        if (active) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Failed to fetch new arrivals');
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return { products, loading, error };
}
export default useNewArrivals;
