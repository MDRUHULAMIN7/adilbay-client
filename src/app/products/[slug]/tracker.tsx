'use client';

import { useEffect } from 'react';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';

export function RecentlyViewedTracker({ slug }: { slug: string }) {
  const { addRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    addRecentlyViewed(slug);
  }, [slug, addRecentlyViewed]);

  return null;
}
export default RecentlyViewedTracker;
