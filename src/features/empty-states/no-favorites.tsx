'use client';

import React from 'react';
import { Illustration } from '@/components/ui/illustration';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function NoFavorites() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center w-full">
      <Illustration
        variant="empty"
        title="Your Wishlist is Empty"
        description="Tap the heart icon on any premium furniture card while browsing to save it to your favorites."
      />
      <Link href="/shop" className="mt-5">
        <Button variant="brand" size="sm" className="rounded-lg cursor-pointer">
          Browse Furniture Catalog
        </Button>
      </Link>
    </div>
  );
}
export default NoFavorites;
