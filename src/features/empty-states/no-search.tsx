'use client';

import React from 'react';
import { Illustration } from '@/components/ui/illustration';

export function NoSearch() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center w-full">
      <Illustration
        variant="search"
        title="No Results Match Query"
        description="Try searching for general keywords like walnut, teak, bedroom, table, or sideboard."
      />
    </div>
  );
}
export default NoSearch;
