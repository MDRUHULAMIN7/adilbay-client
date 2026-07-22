'use client';

import React, { useState, useEffect } from 'react';
import { useWishlist } from '@/hooks/useWishlist';
import { ProductService } from '@/services/product.service';
import { Product } from '@/types/product';
import { ProductCard } from '@/features/products/product-card/product-card';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductService.getProducts().then((all) => {
      const filtered = all.filter((p) => wishlist.includes(p.slug));
      setProducts(filtered);
      setLoading(false);
    });
  }, [wishlist]);

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <Heading level={2} className="font-display text-xl font-bold">
          Saved Wishlist ({wishlist.length})
        </Heading>
        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs font-semibold text-stone-400 hover:text-destructive transition-colors cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-stone-500">Loading wishlist items...</div>
      ) : products.length === 0 ? (
        <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
          <span className="text-sm font-bold text-stone-500">Your wishlist is currently empty</span>
          <Link href="/shop">
            <Button variant="primary" size="sm" className="text-xs font-bold uppercase tracking-wider cursor-pointer">
              Explore Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
