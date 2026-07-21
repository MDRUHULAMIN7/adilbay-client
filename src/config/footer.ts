import { FooterColumn, TrustSignal } from '@/types/layout';
import { ROUTES } from '@/constants/routes';

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Shop Rooms',
    items: [
      { label: 'Living Room', href: `${ROUTES.SHOP}?category=living-room` },
      { label: 'Bedroom Furniture', href: `${ROUTES.SHOP}?category=bedroom` },
      { label: 'Dining Sets', href: `${ROUTES.SHOP}?category=dining` },
      { label: 'Home Office', href: `${ROUTES.SHOP}?category=office` },
      { label: 'Outdoor Patio', href: `${ROUTES.SHOP}?category=outdoor` },
    ],
  },
  {
    title: 'Customer Care',
    items: [
      { label: 'Contact Support', href: ROUTES.CONTACT },
      { label: 'FAQ & Help Center', href: ROUTES.FAQ },
      { label: 'Returns & Refunds', href: '#' },
      { label: 'Shipping Policy', href: '#' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'Our Story', href: ROUTES.ABOUT },
      { label: 'Blogs & Guides', href: ROUTES.BLOGS },
      { label: 'Careers', href: '#' },
      { label: 'Sustainability Policy', href: '#' },
    ],
  },
];

export const TRUST_SIGNALS: TrustSignal[] = [
  {
    id: 'secure-payment',
    title: 'Secure Payment',
    description: '100% SSL protected checkout',
    icon: 'creditCard',
  },
  {
    id: 'safe-shipping',
    title: 'White-Glove Delivery',
    description: 'Careful setup in your home',
    icon: 'arrowRight',
  },
  {
    id: 'money-back',
    title: '30-Day Return Guarantee',
    description: 'Hassle-free material exchange',
    icon: 'dollarSign',
  },
];

export const PAYMENT_METHODS = [
  { id: 'visa', label: 'Visa', icon: 'creditCard' as const },
  { id: 'mastercard', label: 'Mastercard', icon: 'creditCard' as const },
  { id: 'cod', label: 'COD Available', icon: 'dollarSign' as const },
];

export const SOCIAL_NAVIGATION = [
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' as const },
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' as const },
  { id: 'twitter', label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' as const },
];
