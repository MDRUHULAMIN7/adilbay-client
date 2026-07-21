export const FEATURE_FLAGS = {
  wishlist: true,
  compare: false,
  reviews: true,
  blog: false,
  announcementBar: true,
} as const;

export type FeatureFlagKey = keyof typeof FEATURE_FLAGS;
