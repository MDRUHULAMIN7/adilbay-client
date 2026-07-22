'use client';

import { useState, useCallback } from 'react';
import { CheckoutStep, ShippingAddress, BillingAddress } from '@/types/checkout';
import { PaymentMethodId, PaymentTransactionResult } from '@/types/payment';
import { CheckoutRepository } from '@/repositories/checkout.repository';
import { CheckoutService } from '@/services/checkout.service';
import { OrderService } from '@/services/order.service';
import { useCart } from './useCart';
import { useToast } from '@/components/ui/toast';
import { SHIPPING_OPTIONS } from '@/config/shipping';
import { Order } from '@/types/order';

const CHECKOUT_STEPS: CheckoutStep[] = [
  'shipping_address',
  'billing_address',
  'shipping_method',
  'payment_method',
  'review',
  'success',
];

export function useCheckout() {
  const { items, summary, clearCart, shippingFee, setShippingFee } = useCart();
  const { addToast } = useToast();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(() => {
    const saved = CheckoutRepository.getSavedAddresses();
    return saved.find((a) => a.isDefault) || saved[0] || {
      fullName: '',
      phone: '',
      email: '',
      addressLine1: '',
      division: 'Dhaka',
      district: 'Dhaka',
      postalCode: '',
      label: 'home',
    };
  });
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [billingAddress, setBillingAddress] = useState<BillingAddress>(shippingAddress);
  const [selectedShippingId, setSelectedShippingId] = useState('standard');
  const [selectedPaymentId, setSelectedPaymentId] = useState<PaymentMethodId>('cod');
  const [orderNotes, setOrderNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const currentStep = CHECKOUT_STEPS[currentStepIndex];

  const goToNextStep = useCallback(() => {
    if (currentStepIndex < CHECKOUT_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  }, [currentStepIndex]);

  const goToPreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

  const goToStep = useCallback((step: CheckoutStep) => {
    const index = CHECKOUT_STEPS.indexOf(step);
    if (index !== -1) {
      setCurrentStepIndex(index);
    }
  }, []);

  const selectShippingMethod = useCallback((id: string) => {
    setSelectedShippingId(id);
    const option = SHIPPING_OPTIONS.find((s) => s.id === id);
    if (option) {
      setShippingFee(option.fee);
    }
  }, [setShippingFee]);

  const submitOrder = useCallback(async () => {
    if (items.length === 0) {
      addToast({
        title: 'Cart is empty',
        description: 'Please add items to your cart before checking out.',
        variant: 'destructive',
      });
      return null;
    }

    setIsSubmitting(true);

    try {
      // 1. Process simulated payment gateway
      const paymentResult: PaymentTransactionResult = await CheckoutService.processFakePayment(
        selectedPaymentId,
        summary.grandTotal
      );

      if (paymentResult.status === 'failed') {
        addToast({
          title: 'Payment Failed',
          description: paymentResult.message,
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return null;
      }

      const activeShippingOption = SHIPPING_OPTIONS.find((s) => s.id === selectedShippingId);

      // 2. Create Order
      const newOrder = OrderService.createOrderFromCart({
        items,
        shippingAddress,
        billingAddress: sameAsShipping ? shippingAddress : billingAddress,
        shippingMethodTitle: activeShippingOption?.title || 'Standard Shipping',
        shippingFee,
        paymentMethod: selectedPaymentId,
        paymentStatus: paymentResult.status,
        subtotal: summary.subtotal,
        discount: summary.discount,
        tax: summary.tax,
        grandTotal: summary.grandTotal,
      });

      setPlacedOrder(newOrder);

      // 3. Clear cart & advance to success
      clearCart();
      goToStep('success');

      addToast({
        title: 'Order Confirmed!',
        description: `Order ${newOrder.id} placed successfully.`,
        variant: 'success',
      });

      setIsSubmitting(false);
      return newOrder;
    } catch {
      setIsSubmitting(false);
      addToast({
        title: 'Checkout Error',
        description: 'An unexpected error occurred while placing your order.',
        variant: 'destructive',
      });
      return null;
    }
  }, [
    items,
    summary,
    selectedPaymentId,
    selectedShippingId,
    shippingAddress,
    sameAsShipping,
    billingAddress,
    shippingFee,
    clearCart,
    goToStep,
    addToast,
  ]);

  return {
    currentStep,
    currentStepIndex,
    totalSteps: CHECKOUT_STEPS.length - 1, // minus success
    goToNextStep,
    goToPreviousStep,
    goToStep,
    shippingAddress,
    setShippingAddress,
    sameAsShipping,
    setSameAsShipping,
    billingAddress,
    setBillingAddress,
    selectedShippingId,
    selectShippingMethod,
    selectedPaymentId,
    setSelectedPaymentId,
    orderNotes,
    setOrderNotes,
    isSubmitting,
    submitOrder,
    placedOrder,
  };
}

export default useCheckout;
