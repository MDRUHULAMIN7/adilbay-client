import React from 'react';
import { ProductService } from '@/services/product.service';
import { HeroSection } from '@/features/home/hero';
import { CategoriesSection } from '@/features/home/categories';
import { CollectionsSection } from '@/features/home/collections';
import { WhyChooseUsSection } from '@/features/home/why-choose-us';
import { TestimonialsSection } from '@/features/home/testimonials';
import { BrandsSection } from '@/features/home/brands';
import { FaqSection } from '@/features/home/faq';
import { CtaBannerSection } from '@/features/home/cta-banner';
import { InstagramGallerySection } from '@/features/home/instagram-gallery';
import { ProductCarousel } from '@/features/products';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export default async function HomePage() {
  // Fetch mock data asynchronously and concurrently via RSC Promise adapters
  const [
    heroSlides,
    trustSignals,
    categories,
    collections,
    brands,
    testimonials,
    faqs,
    bestSellers,
    newArrivals,
  ] = await Promise.all([
    ProductService.getHeroSlides(),
    ProductService.getTrustSignals(),
    ProductService.getCategories(),
    ProductService.getCollections(),
    ProductService.getBrands(),
    ProductService.getTestimonials(),
    ProductService.getFaqs(),
    ProductService.getBestSellers(),
    ProductService.getNewArrivals(),
  ]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Hero Slides & Trust Signals */}
      <HeroSection slides={heroSlides} trustSignals={trustSignals} />

      {/* 2. Infinite scroll partners marquee */}
      <BrandsSection brands={brands} />

      {/* 3. Shop by Category rooms grid */}
      <CategoriesSection categories={categories} />

      {/* Best Sellers Section */}
      <section className="py-16 bg-background">
        <Container variant="wide" className="flex flex-col gap-8">
          <div className="flex flex-col gap-1.5 max-w-xl text-left">
            <Heading level={2} className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-foreground">
              Best Sellers
            </Heading>
            <Text className="text-stone-500 text-xs sm:text-sm">
              Our most popular solid wood pieces, loved by modern homeowners.
            </Text>
          </div>
          <ProductCarousel products={bestSellers} />
        </Container>
      </section>

      {/* 4. Curated Editorials spotlight */}
      <CollectionsSection collections={collections} />

      {/* New Arrivals Section */}
      <section className="py-16 bg-background">
        <Container variant="wide" className="flex flex-col gap-8">
          <div className="flex flex-col gap-1.5 max-w-xl text-left">
            <Heading level={2} className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-foreground">
              New Arrivals
            </Heading>
            <Text className="text-stone-500 text-xs sm:text-sm">
              Freshly seasoned, handcrafted designs fresh from our woodworking studios.
            </Text>
          </div>
          <ProductCarousel products={newArrivals} />
        </Container>
      </section>

      {/* 5. Quality propositions */}
      <WhyChooseUsSection />

      {/* 6. Clients feedbacks */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 7. Instagram social gallery feed */}
      <InstagramGallerySection />

      {/* 8. Accordions FAQs sheet */}
      <FaqSection faqs={faqs} />

      {/* 9. Design consulting CTA */}
      <CtaBannerSection />
    </div>
  );
}
