export interface Specification {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  date: string;
  country: string;
  avatar?: string;
}

export interface ColorVariant {
  name: string;
  hex: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  price?: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  badge?: 'new' | 'sale' | 'hot' | 'featured';
  materials: string[];
  colors: ColorVariant[];
  specifications: Specification[];
  reviews: Review[];
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  relatedSlugs?: string[];
}

export interface Category {
  id: string;
  label: string;
  slug: string;
  image: string;
  productCount: number;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  ctaText: string;
}

export interface Brand {
  id: string;
  label: string;
  logo: string;
  url?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  featuredTitle?: string;
  featuredPrice?: string;
  badgeText?: string;
}

export interface TrustSignal {
  id: string;
  title: string;
  description: string;
  icon: string;
}
