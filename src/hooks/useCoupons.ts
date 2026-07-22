'use client';

import { useCart } from './useCart';

export function useCoupons() {
  const { applyCoupon, removeCoupon, appliedCoupon, summary } = useCart();

  return {
    appliedCoupon,
    discountAmount: summary.discount,
    applyCoupon,
    removeCoupon,
  };
}

export default useCoupons;
