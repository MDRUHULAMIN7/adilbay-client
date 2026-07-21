import { Category } from '@/types/product';

export const HOMEPAGE_CATEGORIES: Category[] = [
  {
    id: 'living',
    label: 'Living Room',
    slug: 'living',
    image: '/images/categories/living.jpg',
    productCount: 24,
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    slug: 'bedroom',
    image: '/images/categories/bedroom.jpg',
    productCount: 18,
  },
  {
    id: 'dining',
    label: 'Dining & Kitchen',
    slug: 'dining',
    image: '/images/categories/dining.jpg',
    productCount: 15,
  },
  {
    id: 'office',
    label: 'Home Office',
    slug: 'office',
    image: '/images/categories/office.jpg',
    productCount: 12,
  },
  {
    id: 'outdoor',
    label: 'Outdoor Furniture',
    slug: 'outdoor',
    image: '/images/categories/outdoor.jpg',
    productCount: 8,
  },
  {
    id: 'storage',
    label: 'Storage & Shelves',
    slug: 'storage',
    image: '/images/categories/storage.jpg',
    productCount: 14,
  },
];
