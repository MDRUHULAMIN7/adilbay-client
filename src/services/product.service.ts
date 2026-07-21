import { HERO_SLIDES, TRUST_BADGES } from '@/data/home/hero';
import { HOMEPAGE_CATEGORIES } from '@/data/home/categories';
import { HOMEPAGE_COLLECTIONS } from '@/data/home/collections';
import { HOMEPAGE_BRANDS } from '@/data/home/brands';
import { HOMEPAGE_TESTIMONIALS } from '@/data/home/testimonials';
import { HOMEPAGE_FAQS, FAQItem } from '@/data/home/faq';
import { CATALOG_PRODUCTS } from '@/data/products/products';
import { FEATURED_PRODUCTS } from '@/data/products/featured';
import { BEST_SELLERS_PRODUCTS } from '@/data/products/best-sellers';
import { NEW_ARRIVALS_PRODUCTS } from '@/data/products/new-arrivals';
import { HeroSlide, TrustSignal, Category, Collection, Brand, Review, Product } from '@/types/product';

/**
 * Enterprise Service Adapter for Furnixo Storefront.
 * Simulates async promise-based database/API queries.
 */
export const ProductService = {
  // Homepage core loaders
  getHeroSlides: (): Promise<HeroSlide[]> => {
    return Promise.resolve(HERO_SLIDES);
  },

  getTrustSignals: (): Promise<TrustSignal[]> => {
    return Promise.resolve(TRUST_BADGES);
  },

  getCategories: (): Promise<Category[]> => {
    return Promise.resolve(HOMEPAGE_CATEGORIES);
  },

  getCollections: (): Promise<Collection[]> => {
    return Promise.resolve(HOMEPAGE_COLLECTIONS);
  },

  getBrands: (): Promise<Brand[]> => {
    return Promise.resolve(HOMEPAGE_BRANDS);
  },

  getTestimonials: (): Promise<Review[]> => {
    return Promise.resolve(HOMEPAGE_TESTIMONIALS);
  },

  getFaqs: (): Promise<FAQItem[]> => {
    return Promise.resolve(HOMEPAGE_FAQS);
  },

  // Storefront Product catalog queries
  getProducts: (): Promise<Product[]> => {
    return Promise.resolve(CATALOG_PRODUCTS);
  },

  getProductBySlug: (slug: string): Promise<Product | null> => {
    const product = CATALOG_PRODUCTS.find((p) => p.slug === slug);
    return Promise.resolve(product || null);
  },

  getFeaturedProducts: (): Promise<Product[]> => {
    return Promise.resolve(FEATURED_PRODUCTS);
  },

  getNewArrivals: (): Promise<Product[]> => {
    return Promise.resolve(NEW_ARRIVALS_PRODUCTS);
  },

  getBestSellers: (): Promise<Product[]> => {
    return Promise.resolve(BEST_SELLERS_PRODUCTS);
  },

  getRelatedProducts: (slug: string): Promise<Product[]> => {
    const product = CATALOG_PRODUCTS.find((p) => p.slug === slug);
    if (!product || !product.relatedSlugs) return Promise.resolve([]);
    const related = CATALOG_PRODUCTS.filter((p) => product.relatedSlugs?.includes(p.slug));
    return Promise.resolve(related);
  },
};
export default ProductService;
