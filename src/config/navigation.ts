import { NavigationItem } from '@/types/layout';
import { ROUTES } from '@/constants/routes';

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    id: 'home-furniture',
    label: 'Home Furniture',
    href: `${ROUTES.SHOP}?category=home-furniture`,
    isMega: true,
    megaKey: 'home-furniture',
    roles: ['guest', 'user', 'admin'],
  },
  {
    id: 'education-furniture',
    label: 'Education Furniture',
    href: `${ROUTES.SHOP}?category=education-furniture`,
    isMega: true,
    megaKey: 'education-furniture',
    roles: ['guest', 'user', 'admin'],
  },
  {
    id: 'corporate-furniture',
    label: 'Corporate Furniture',
    href: `${ROUTES.SHOP}?category=corporate-furniture`,
    isMega: true,
    megaKey: 'corporate-furniture',
    roles: ['guest', 'user', 'admin'],
  },
  {
    id: 'industrial-furniture',
    label: 'Industrial Furniture',
    href: `${ROUTES.SHOP}?category=industrial-furniture`,
    isMega: true,
    megaKey: 'industrial-furniture',
    roles: ['guest', 'user', 'admin'],
  },
  {
    id: 'about',
    label: 'About Us',
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
