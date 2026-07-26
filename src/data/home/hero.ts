import { HeroSlide, TrustSignal } from '@/types/product';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'Sets you as a trend',
    subtitle: 'aesthetically stylish setter',
    image: '/images/hero/hero-1.jpg',
    ctaText: 'Explore Collection',
    ctaLink: '/shop',
    featuredTitle: 'Burmese Teak Living Suite',
    featuredPrice: 'Tk 85,000',
    badgeText: '2026 Heritage Collection',
  },
  {
    id: 'slide-2',
    title: 'Elegance in Every Contour',
    subtitle: 'crafted for modern architectural living',
    image: '/images/hero/hero-2.jpg',
    ctaText: 'Shop Dining Sets',
    ctaLink: '/shop',
    featuredTitle: 'Nordic Oak Dining Table',
    featuredPrice: 'Tk 64,500',
    badgeText: 'Limited Architectural Series',
  },
  {
    id: 'slide-3',
    title: 'Sanctuary of Refined Comfort',
    subtitle: 'masterpiece handcrafted furniture',
    image: '/images/hero/hero-3.jpg',
    ctaText: 'View Bedroom Suite',
    ctaLink: '/shop',
    featuredTitle: 'Royal Walnut Bedset',
    featuredPrice: 'Tk 120,000',
    badgeText: 'Exclusive Masterpiece',
  },
];

export const TRUST_BADGES: TrustSignal[] = [
  {
    id: 'shipping',
    title: 'Free Shipping',
    description: 'Complimentary white-glove shipping inside Bangladesh on orders above Tk 50,000.',
    icon: 'truck',
  },
  {
    id: 'warranty',
    title: '10 Year Warranty',
    description: 'Every wood item is guaranteed against borers, splits, and structural defects.',
    icon: 'shieldCheck',
  },
  {
    id: 'materials',
    title: 'Sustainable Sourcing',
    description: 'We source exclusively from certified, ethically managed local timber plantations.',
    icon: 'leaf',
  },
];
