import { ShopView } from '@/features/shop';
import { notFound } from 'next/navigation';
import { ProductService } from '@/services/product.service';

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collections = await ProductService.getCollections();
  const collection = collections.find((c) => c.href.includes(slug));
  if (!collection) return {};

  return {
    title: `${collection.title} - Furnixo`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collections = await ProductService.getCollections();
  const collection = collections.find((c) => c.href.includes(slug));
  if (!collection) {
    notFound();
  }

  return <ShopView title={collection.title} description={collection.description} />;
}
