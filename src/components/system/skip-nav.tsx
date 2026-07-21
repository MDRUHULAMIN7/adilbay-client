'use client';

import React from 'react';

export function SkipNav() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-toast focus:rounded-md focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-flat focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none"
    >
      Skip to content
    </a>
  );
}
