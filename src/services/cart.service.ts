import { CartItem, CartSummary, Coupon } from '@/types/cart';

export const CartService = {
  calculateSummary(items: CartItem[], appliedCoupon: Coupon | null, shippingFee: number = 120): CartSummary {
    const safeItems = Array.isArray(items) ? items : [];
    const subtotal = safeItems.reduce((acc, item) => acc + (item?.product?.price || 0) * (item?.quantity || 1), 0);
    const itemCount = safeItems.reduce((acc, item) => acc + (item?.quantity || 1), 0);

    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = (subtotal * appliedCoupon.discountValue) / 100;
        if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
          discount = appliedCoupon.maxDiscount;
        }
      } else if (appliedCoupon.discountType === 'fixed') {
        discount = appliedCoupon.discountValue;
      }
    }

    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = Math.round(taxableAmount * 0.05); // 5% VAT
    const grandTotal = Math.max(0, subtotal - discount + tax + (itemCount > 0 ? shippingFee : 0));

    return {
      subtotal,
      discount,
      shippingEstimate: itemCount > 0 ? shippingFee : 0,
      tax,
      grandTotal,
      itemCount,
      appliedCoupon,
    };
  },

  validateStockLimit(productStock: number = 10, requestedQty: number): { valid: boolean; maxAllowed: number } {
    const maxAllowed = Math.max(1, productStock);
    return {
      valid: requestedQty <= maxAllowed,
      maxAllowed,
    };
  },
};
