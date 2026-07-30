import React from 'react';
import { ProductService } from '@/services/product.service';
import { DetailsGallery, DetailsInfo, DetailsTabs, DetailsReviews, TrustBadges } from '@/features/product-details';
import { ProductCarousel } from '@/features/products';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { notFound } from 'next/navigation';
import { RecentlyViewedTracker } from './tracker';

import { PageHeader } from '@/components/layout/page-header';

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = await ProductService.getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.title} - Furnixo Premium Woodcrafts`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = await ProductService.getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  // Fetch related recommendations concurrently
  const relatedProducts = await ProductService.getRelatedProducts(slug);

  const breadcrumbItems = [
    { label: 'Shop', href: '/shop' },
    { label: product.category, href: '/shop' },
    { label: product.title },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Client-side recent viewed logger */}
      <RecentlyViewedTracker slug={product.slug} />

      {/* Senior UI/UX PageHeader with Furniture Overlay Image & Breadcrumb Navigation */}
      <PageHeader
        title={product.title}
        badge={`${product.category} Woodcraft`}
        description={product.description || 'Handcrafted solid wood furniture built with precision seasoning and lifetime structural durability.'}
        backgroundImage={product.images?.[0] || '/images/auth-bg.jpg'}
        items={breadcrumbItems}
      />

      <Container variant="wide" className="py-8 sm:py-12 lg:py-16 flex flex-col gap-12 sm:gap-16 lg:gap-20 w-full">

        {/* Gallery + Info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6">
            <DetailsGallery images={product.images} />
          </div>
          <div className="lg:col-span-6">
            <DetailsInfo product={product} />
          </div>
        </div>

        {/* Product Guarantee & Shipping Highlights */}
        <TrustBadges />

        {/* Extended Product Description & Technical Specifications Tabs */}
        <DetailsTabs product={product} />

        {/* Reviews panel */}
        <DetailsReviews initialReviews={product.reviews} rating={product.rating} />

        {/* Related products recommendations section */}
        {relatedProducts.length > 0 && (
          <section className="flex flex-col gap-6 border-t border-border/40 pt-10 sm:pt-14 w-full text-left">
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
