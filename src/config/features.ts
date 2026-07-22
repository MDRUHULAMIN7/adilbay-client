export const FEATURE_FLAGS = {
  wishlist: true,
  compare: false,
  reviews: true,
  blog: false,
  announcementBar: true,
  coupons: true,
  cartDrawer: true,
  guestCheckout: true,
  recentlyViewed: true,
  invoice: true,
  undoActions: true,
} as const;

export type FeatureFlagKey = keyof typeof FEATURE_FLAGS;
