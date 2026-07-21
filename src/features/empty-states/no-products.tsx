'use client';

import React from 'react';
import { Illustration } from '@/components/ui/illustration';
import { Button } from '@/components/ui/button';

interface NoProductsProps {
  onReset?: () => void;
}

export function NoProducts({ onReset }: NoProductsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center w-full">
      <Illustration
        variant="search"
        title="No Products Found"
        description="We couldn't find any furniture matches in our seasoned solid wood catalog matching your parameters."
      />
      {onReset && (
        <Button variant="outline" size="sm" onClick={onReset} className="mt-5 rounded-lg cursor-pointer">
          Reset All Filters
        </Button>
      )}
    </div>
  );
}
export default NoProducts;
