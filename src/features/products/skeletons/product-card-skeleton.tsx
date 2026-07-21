'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden border border-border/40 bg-card shadow-soft flex flex-col h-full animate-pulse select-none">
      <div className="relative aspect-square w-full bg-muted/30" />
      <CardContent className="flex flex-col gap-2.5 p-4 flex-1 justify-between text-left">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}
export default ProductCardSkeleton;
