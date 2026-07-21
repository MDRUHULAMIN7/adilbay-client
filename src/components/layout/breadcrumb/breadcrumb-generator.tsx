'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb';

export function BreadcrumbGenerator() {
  const pathname = usePathname();

  if (!pathname || pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  const items: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: 'Home' as any },
  ];

  let accumulatedPath = '';

  segments.forEach((segment) => {
    accumulatedPath += `/${segment}`;
    
    const label = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    items.push({
      label,
      href: accumulatedPath,
    });
  });

  return <Breadcrumb items={items} />;
}
