import { Coupon } from '@/types/cart';

export const PROMO_COUPONS: Coupon[] = [
  {
    code: 'FURNIXO10',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 5000,
    maxDiscount: 3000,
    description: '10% OFF on orders over Tk 5,000',
  },
  {
    code: 'WOODCRAFT20',
    discountType: 'percentage',
    discountValue: 20,
    minSpend: 25000,
    maxDiscount: 8000,
    description: '20% OFF premium solid teak creations',
  },
  {
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 350,
    description: 'Free Express Shipping discount',
  },
];
