import React from 'react';
import { ShopView } from '@/features/shop';

interface BrandPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BrandPageProps) {
  // Convert slug to readable name e.g. cb2 -> CB2, west-elm -> West Elm
  const brandName = params.slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${brandName} Furniture - Furnixo`,
    description: `Shop premium solid wood products crafted by ${brandName}.`,
  };
}

export default function BrandPage({ params }: BrandPageProps) {
  const brandName = params.slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <ShopView
      initialBrand={params.slug}
      title={`${brandName} Collection`}
      description={`Explore modern woodcraft masterpieces custom-tailored by ${brandName}.`}
    />
  );
}
