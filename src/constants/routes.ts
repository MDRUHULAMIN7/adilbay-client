export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  COLLECTIONS: '/collections',
  ROOMS: '/rooms',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  BLOGS: '/blogs',
  PRIVACY: '/policies/privacy',
  TERMS: '/policies/terms',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ACCOUNT: '/account',
  LOGIN: '/account/login',
  REGISTER: '/account/register',
  ORDERS: '/account/orders',
  WISHLIST: '/account/wishlist',
  CUSTOM_DESIGN: '/custom-design',
  PLAYGROUND: '/playground',
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
