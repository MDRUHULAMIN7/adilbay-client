import { IconName } from '@/constants/icons';

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: IconName;
  description?: string;
  badge?: string;
  external?: boolean;
  disabled?: boolean;
  children?: NavigationItem[];
  roles?: ('guest' | 'user' | 'admin')[];
  isMega?: boolean; // Determines if it triggers a full-width mega menu
  megaKey?: string;  // Maps to target mega menu configurations
}

export interface MegaMenuFeatured {
  title: string;
  description: string;
  image: string; // Dynamic path matching featuredCollection.image
  href: string;
  ctaText: string;
}

export interface MegaMenuProduct {
  id: string;
  label: string;
  href: string;
  price?: string;
  isHot?: boolean;
}

export interface MegaMenuCategory {
  id: string;
  label: string;
  href: string;
  items: {
    id: string;
    label: string;
    href: string;
    isNew?: boolean;
  }[];
}

export interface MegaMenuConfig {
  categories: MegaMenuCategory[];
  featured: MegaMenuFeatured;
  trending: MegaMenuProduct[];
  bottomLinks?: {
    label: string;
    href: string;
  }[];
}

export interface FooterColumn {
  title: string;
  items: {
    label: string;
    href: string;
    external?: boolean;
  }[];
}

export interface TrustSignal {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface SearchItem {
  id: string;
  label: string;
  href: string;
  category?: string;
}
