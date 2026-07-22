import { PaymentMethodId, PaymentTransactionResult } from '@/types/payment';
import { PROMO_COUPONS } from '@/config/coupons';
import { Coupon } from '@/types/cart';

export const CheckoutService = {
  async validateCoupon(code: string, subtotal: number): Promise<{ success: boolean; coupon?: Coupon; message: string }> {
    await new Promise((res) => setTimeout(res, 300));
    const upperCode = code.trim().toUpperCase();
    const coupon = PROMO_COUPONS.find((c) => c.code === upperCode);

    if (!coupon) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    if (coupon.minSpend && subtotal < coupon.minSpend) {
      return {
        success: false,
        message: `Minimum order amount of Tk ${coupon.minSpend} required for coupon ${coupon.code}.`,
      };
    }

    return {
      success: true,
      coupon,
      message: `Coupon ${coupon.code} applied successfully!`,
    };
  },

  async processFakePayment(paymentMethod: PaymentMethodId, amount: number): Promise<PaymentTransactionResult> {
    await new Promise((res) => setTimeout(res, 600)); // Simulate gateway latency

    if (paymentMethod === 'cod') {
      return {
        transactionId: `COD-${Date.now()}`,
        status: 'success',
        paymentMethod: 'cod',
        amount,
        message: 'Cash on Delivery order confirmed.',
        timestamp: new Date().toISOString(),
      };
    }

    return {
      transactionId: `TXN-${Date.now()}`,
      status: 'success',
      paymentMethod,
      amount,
      message: 'Online payment processed successfully via secure gateway.',
      timestamp: new Date().toISOString(),
    };
  },
};
