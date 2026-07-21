import React from 'react';
import { ProductService } from '@/services/product.service';
import { DetailsGallery, DetailsInfo, DetailsReviews } from '@/features/product-details';
import { ProductCarousel } from '@/features/products';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { notFound } from 'next/navigation';
import { RecentlyViewedTracker } from './tracker';

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductDetailsPageProps) {
  const product = await ProductService.getProductBySlug(params.slug);
  if (!product) return {};

  return {
    title: `${product.title} - Furnixo Premium Woodcrafts`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const product = await ProductService.getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  // Fetch related recommendations concurrently
  const relatedProducts = await ProductService.getRelatedProducts(params.slug);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Client-side recent viewed logger */}
      <RecentlyViewedTracker slug={product.slug} />

      <Container variant="wide" className="py-12 flex flex-col gap-16">
        {/* Gallery + Info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <DetailsGallery images={product.images} />
          <DetailsInfo product={product} />
        </div>

        {/* Reviews panel */}
        <DetailsReviews initialReviews={product.reviews} rating={product.rating} />

        {/* Related products recommendations section */}
        {relatedProducts.length > 0 && (
          <section className="flex flex-col gap-6 border-t border-border/40 pt-12 w-full text-left">
            <div className="flex flex-col gap-1.5">
              <Heading level={2} className="font-display font-bold text-xl sm:text-2xl tracking-tight text-foreground">
                You May Also Like
              </Heading>
              <Text className="text-stone-500 text-xs sm:text-sm">
                Complementary solid wood selections handcrafted by the same design studio.
              </Text>
            </div>
            <ProductCarousel products={relatedProducts} />
          </section>
        )}
      </Container>
    </div>
  );
}
