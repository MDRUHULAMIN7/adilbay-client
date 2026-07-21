import { Collection } from '@/types/product';

export const HOMEPAGE_COLLECTIONS: Collection[] = [
  {
    id: 'scandinavian',
    title: 'Scandinavian Warmth',
    description: 'Clean profiles, organic contours, and light ash wood textures that amplify natural home lighting.',
    image: '/images/collections/nordic.jpg',
    href: '/shop',
    ctaText: 'Shop Scandinavian',
  },
  {
    id: 'minimalist',
    title: 'Minimalist Walnut',
    description: 'Rich dark walnut wood structures engineered with seamless joints and concealed hardware drawers.',
    image: '/images/collections/walnut.jpg',
    href: '/shop',
    ctaText: 'Shop Walnut Collection',
  },
  {
    id: 'heritage',
    title: 'Heritage Teakwood',
    description: 'Premium Burma teak furniture handcrafted by local wood artisans incorporating woven rattan details.',
    image: '/images/collections/heritage.jpg',
    href: '/shop',
    ctaText: 'Shop Heritage Teak',
  },
];
