import { SearchItem } from '@/types/layout';
import { ROUTES } from '@/constants/routes';

export const TRENDING_SEARCHES = [
  'Solid Teak Sofa',
  'Walnut Dining Table',
  'Ergonomic Work Chair',
  'Nightstand Bedside',
];

export const POPULAR_CATEGORIES: SearchItem[] = [
  { id: 'cat-living', label: 'Living Room Sofas & Tables', href: `${ROUTES.SHOP}?category=living-room` },
  { id: 'cat-bedroom', label: 'Bedroom Bedframes & Nightstands', href: `${ROUTES.SHOP}?category=bedroom` },
  { id: 'cat-dining', label: 'Dining Solid Oak Sets', href: `${ROUTES.SHOP}?category=dining` },
];

export const QUICK_LINKS: SearchItem[] = [
  { id: 'link-faq', label: 'FAQ Support Guides', href: ROUTES.FAQ },
  { id: 'link-contact', label: 'Contact Customer Service', href: ROUTES.CONTACT },
  { id: 'link-story', label: 'Read Our Solid Wood Story', href: ROUTES.ABOUT },
];
