import React from 'react';
import { ShopView } from '@/features/shop';

interface BrandPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { slug } = await params;
  // Convert slug to readable name e.g. cb2 -> CB2, west-elm -> West Elm
  const brandName = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${brandName} Furniture - Furnixo`,
    description: `Shop premium solid wood products crafted by ${brandName}.`,
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brandName = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <ShopView
      initialBrand={slug}
      title={`${brandName} Collection`}
      description={`Explore modern woodcraft masterpieces custom-tailored by ${brandName}.`}
    />
  );
}
