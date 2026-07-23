import React from 'react';
import { ProductService } from '@/services/product.service';
import { DetailsGallery, DetailsInfo, DetailsReviews, } from '@/features/product-details';
import { ProductCarousel } from '@/features/products';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { notFound } from 'next/navigation';
import { RecentlyViewedTracker } from './tracker';

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

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Client-side recent viewed logger */}
      <RecentlyViewedTracker slug={product.slug} />

      <Container variant="wide" className="py-8 sm:py-12 flex flex-col gap-12 w-full">
        {/* Breadcrumb line */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold text-left">
          <span>Home</span>
          <Icon name="chevronRight" className="h-3 w-3" />
          <span>Shop</span>
          <Icon name="chevronRight" className="h-3 w-3" />
          <span className="text-foreground truncate">{product.title}</span>
        </div>

        {/* Gallery + Info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-6">
            <DetailsGallery images={product.images} />
          </div>
          <div className="lg:col-span-6">
            <DetailsInfo product={product} />
          </div>
        </div>

        {/* Product Guarantee & Shipping Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-border/40 py-6 text-left">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-surface/5 border border-border/40">
            <Icon name="truck" className="h-5 w-5 text-primary shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold text-xs text-foreground">Countrywide Delivery</span>
              <span className="text-[11px] text-stone-500">Free delivery on orders above 50,000 Tk</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-surface/5 border border-border/40">
            <Icon name="shieldCheck" className="h-5 w-5 text-primary shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold text-xs text-foreground">10-Year Warranty</span>
              <span className="text-[11px] text-stone-500">Covers structural seasoning defects</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-surface/5 border border-border/40">
            <Icon name="rotateCcw" className="h-5 w-5 text-primary shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold text-xs text-foreground">7-Day Easy Return</span>
              <span className="text-[11px] text-stone-500">Hassle-free replacement policy</span>
            </div>
          </div>
        </div>

        {/* Reviews panel */}
        <DetailsReviews initialReviews={product.reviews} rating={product.rating} />

        {/* Related products recommendations section */}
        {relatedProducts.length > 0 && (
          <section className="flex flex-col gap-6 border-t border-border/40 pt-10 w-full text-left">
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
