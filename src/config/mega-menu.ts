import { MegaMenuConfig } from '@/types/layout';
import { ROUTES } from '@/constants/routes';

export const SHOP_MEGA_MENU: MegaMenuConfig = {
  categories: [
    {
      id: 'living',
      label: 'Living Room',
      href: `${ROUTES.SHOP}?category=living-room`,
      items: [
        { id: 'sofas', label: 'Sofas & Sectionals', href: `${ROUTES.SHOP}?category=sofas` },
        { id: 'coffee', label: 'Coffee Tables', href: `${ROUTES.SHOP}?category=coffee-tables` },
        { id: 'chairs', label: 'Lounge Chairs', href: `${ROUTES.SHOP}?category=lounge-chairs` },
        { id: 'tv', label: 'TV Units', href: `${ROUTES.SHOP}?category=tv-units` },
      ],
    },
    {
      id: 'bedroom',
      label: 'Bedroom',
      href: `${ROUTES.SHOP}?category=bedroom`,
      items: [
        { id: 'beds', label: 'Beds', href: `${ROUTES.SHOP}?category=beds` },
        { id: 'wardrobes', label: 'Wardrobes', href: `${ROUTES.SHOP}?category=wardrobes` },
        { id: 'nightstands', label: 'Nightstands', href: `${ROUTES.SHOP}?category=nightstands` },
        { id: 'drawers', label: 'Chest of Drawers', href: `${ROUTES.SHOP}?category=chest-drawers` },
      ],
    },
    {
      id: 'dining',
      label: 'Dining Room',
      href: `${ROUTES.SHOP}?category=dining`,
      items: [
        { id: 'tables', label: 'Dining Tables', href: `${ROUTES.SHOP}?category=dining-tables` },
        { id: 'dining-chairs', label: 'Dining Chairs', href: `${ROUTES.SHOP}?category=dining-chairs` },
        { id: 'sideboards', label: 'Sideboards', href: `${ROUTES.SHOP}?category=sideboards` },
      ],
    },
  ],
  featured: {
    title: 'The Warm Walnut Series',
    description: 'Timeless solid wood furniture hand-crafted in warm tones.',
    image: '/images/collections/walnut.jpg', // Configuration driven, resolved dynamically
    href: `${ROUTES.SHOP}?collection=warm-walnut`,
    ctaText: 'Shop the Collection',
  },
  trending: [
    { id: 'lounge-teak', label: 'Mid-Century Teak Lounge Chair', href: `${ROUTES.SHOP}?product=teak-lounge`, price: 'Tk 28,500', isHot: true },
    { id: 'dining-oak', label: 'Solid Nordic Oak Dining Table', href: `${ROUTES.SHOP}?product=nordic-oak-table`, price: 'Tk 45,000' },
    { id: 'desk-office', label: 'Minimalist Office Desk', href: `${ROUTES.SHOP}?product=minimalist-desk`, price: 'Tk 18,900' },
  ],
  bottomLinks: [
    { label: 'Free Material Samples', href: ROUTES.ABOUT },
    { label: 'Explore Our Story', href: ROUTES.ABOUT },
    { label: 'Lifetime Structural Warranty', href: ROUTES.FAQ },
  ],
};

export const ROOMS_MEGA_MENU: MegaMenuConfig = {
  categories: [
    {
      id: 'workspace',
      label: 'Home Office',
      href: `${ROUTES.SHOP}?room=office`,
      items: [
        { id: 'desks', label: 'Writing Desks', href: `${ROUTES.SHOP}?category=desks` },
        { id: 'office-chairs', label: 'Ergonomic Chairs', href: `${ROUTES.SHOP}?category=office-chairs` },
        { id: 'bookshelves', label: 'Bookshelves', href: `${ROUTES.SHOP}?category=bookshelves` },
      ],
    },
    {
      id: 'outdoor-room',
      label: 'Patio & Outdoor',
      href: `${ROUTES.SHOP}?room=outdoor`,
      items: [
        { id: 'patio-sets', label: 'Patio Sets', href: `${ROUTES.SHOP}?category=patio-sets` },
        { id: 'outdoor-chairs', label: 'Garden Chairs', href: `${ROUTES.SHOP}?category=outdoor-chairs` },
        { id: 'loungers', label: 'Sun Loungers', href: `${ROUTES.SHOP}?category=sun-loungers`, isNew: true },
      ],
    },
  ],
  featured: {
    title: 'Minimalist Patio Sets',
    description: 'Weatherproof teak chairs and metal-frame tables.',
    image: '/images/collections/heritage.jpg',
    href: `${ROUTES.SHOP}?collection=patio-teak`,
    ctaText: 'Explore Outdoor',
  },
  trending: [
    { id: 'teak-patio', label: 'Premium Teak Lounger', href: `${ROUTES.SHOP}?product=teak-lounger`, price: 'Tk 32,000' },
    { id: 'rattan-chair', label: 'Handwoven Rattan Chair', href: `${ROUTES.SHOP}?product=rattan-chair`, price: 'Tk 12,500', isHot: true },
  ],
};

export const MEGA_MENUS: Record<string, MegaMenuConfig> = {
  shop: SHOP_MEGA_MENU,
  rooms: ROOMS_MEGA_MENU,
};
