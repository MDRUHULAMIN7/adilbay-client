import React from 'react';
import { ShopView } from '@/features/shop';
import { notFound } from 'next/navigation';
import { SHOP_FILTERS } from '@/config/shop-filters';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = SHOP_FILTERS.categories.find((c) => c.value === slug);
  if (!category) return {};

  return {
    title: `${category.label} Collection - Furnixo`,
    description: `Shop premium solid wood ${category.label.toLowerCase()} furniture pieces.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = SHOP_FILTERS.categories.find((c) => c.value === slug);
  if (!category) {
    notFound();
  }

  return (
    <ShopView
      initialCategory={slug}
      title={`${category.label} Collection`}
      description={`Browse our premium handcrafted solid wood selections optimized for ${category.label.toLowerCase()} layouts.`}
    />
  );
}
