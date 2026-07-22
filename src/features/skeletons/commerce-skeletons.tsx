'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function CartSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full animate-pulse">
      <div className="lg:col-span-8 flex flex-col gap-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
      <div className="lg:col-span-4">
        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    </div>
  );
}

export function OrderListSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full animate-pulse">
      <Skeleton className="h-32 w-full rounded-2xl" />
      <Skeleton className="h-32 w-full rounded-2xl" />
    </div>
  );
}
