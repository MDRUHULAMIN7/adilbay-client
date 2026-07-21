import React from 'react';
import { ShopView } from '@/features/shop';
import { notFound } from 'next/navigation';
import { ProductService } from '@/services/product.service';

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const collections = await ProductService.getCollections();
  const collection = collections.find((c) => c.href.includes(params.slug));
  if (!collection) return {};

  return {
    title: `${collection.title} - Furnixo`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const collections = await ProductService.getCollections();
  const collection = collections.find((c) => c.href.includes(params.slug));
  if (!collection) {
    notFound();
  }

  return <ShopView title={collection.title} description={collection.description} />;
}
