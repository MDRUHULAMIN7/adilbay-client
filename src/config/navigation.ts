import { NavigationItem } from '@/types/layout';
import { ROUTES } from '@/constants/routes';

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: ROUTES.HOME,
    roles: ['guest', 'user', 'admin'],
  },
  {
    id: 'shop',
    label: 'Shop',
    href: ROUTES.SHOP,
    isMega: true,
    megaKey: 'shop',
    roles: ['guest', 'user', 'admin'],
  },
  {
    id: 'collections',
    label: 'Collections',
    href: '#',
    roles: ['guest', 'user', 'admin'],
    children: [
      {
        id: 'walnut',
        label: 'Warm Walnut Collection',
        href: `${ROUTES.SHOP}?collection=warm-walnut`,
        description: 'Timeless solid dark walnut wood pieces.',
      },
      {
        id: 'nordic',
        label: 'Nordic Oak Collection',
        href: `${ROUTES.SHOP}?collection=nordic-oak`,
        description: 'Light, minimal oak furniture for clean spaces.',
      },
      {
        id: 'bronze',
        label: 'Bronze Accent Series',
        href: `${ROUTES.SHOP}?collection=bronze`,
        description: 'Refined bronze metal hardware highlights.',
      },
    ],
  },
  {
    id: 'rooms',
    label: 'Rooms',
    href: '#',
    isMega: true,
    megaKey: 'rooms',
    roles: ['guest', 'user', 'admin'],
  },
  {
    id: 'about',
    label: 'About',
    href: ROUTES.ABOUT,
    roles: ['guest', 'user', 'admin'],
  },
  {
    id: 'contact',
    label: 'Contact',
    href: ROUTES.CONTACT,
    roles: ['guest', 'user', 'admin'],
  },
];
