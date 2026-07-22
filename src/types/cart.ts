import { Product } from './product';

export interface CartItem {
  id: string; // product id or variant id
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedMaterial?: string;
  addedAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 10 for 10% or 500 for Tk 500
  minSpend?: number;
  maxDiscount?: number;
  description: string;
  expiryDate?: string;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  shippingEstimate: number;
  tax: number;
  grandTotal: number;
  itemCount: number;
  appliedCoupon: Coupon | null;
}

export interface CartMergeStrategy {
  guestItems: CartItem[];
  userItems: CartItem[];
}
