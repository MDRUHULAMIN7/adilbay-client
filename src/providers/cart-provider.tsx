'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CartItem, CartSummary, Coupon } from '@/types/cart';
import { Product } from '@/types/product';
import { CartRepository } from '@/repositories/cart.repository';
import { CartService } from '@/services/cart.service';
import { CheckoutService } from '@/services/checkout.service';
import { useToast } from '@/components/ui/toast';
import { FEATURE_FLAGS } from '@/config/features';

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number, selectedColor?: string, selectedMaterial?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  appliedCoupon: Coupon | null;
  shippingFee: number;
  setShippingFee: (fee: number) => void;
  summary: CartSummary;
  itemCount: number;
}

const defaultCartContextValue: CartContextType = {
  items: [],
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  toggleCart: () => {},
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  applyCoupon: async () => ({ success: false, message: '' }),
  removeCoupon: () => {},
  appliedCoupon: null,
  shippingFee: 120,
  setShippingFee: () => {},
  summary: {
    subtotal: 0,
    discount: 0,
    shippingEstimate: 0,
    tax: 0,
    grandTotal: 0,
    itemCount: 0,
    appliedCoupon: null,
  },
  itemCount: 0,
};

const CartContext = createContext<CartContextType>(defaultCartContextValue);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [shippingFee, setShippingFee] = useState(120);
  const { addToast } = useToast();

  // Load cart items on mount
  useEffect(() => {
    const storedItems = CartRepository.getCartItems();
    setItems(Array.isArray(storedItems) ? storedItems : []);
  }, []);

  // Save cart items whenever state changes
  const updateCartState = useCallback((newItems: CartItem[]) => {
    const safe = Array.isArray(newItems) ? newItems : [];
    setItems(safe);
    CartRepository.saveCartItems(safe);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const addItem = useCallback(
    (product: Product, quantity: number = 1, selectedColor?: string, selectedMaterial?: string) => {
      const itemId = `${product.id}-${selectedColor || 'default'}-${selectedMaterial || 'default'}`;
      const existingIndex = items.findIndex((item) => item.id === itemId);
      let updatedItems: CartItem[];

      const currentQty = existingIndex >= 0 ? items[existingIndex].quantity : 0;
      const targetQty = currentQty + quantity;
      const maxStock = product.stock || 15;

      if (targetQty > maxStock) {
        addToast({
          title: 'Stock Limit Reached',
          description: `Only ${maxStock} units of "${product.title}" are available.`,
          variant: 'warning',
        });
        return;
      }

      if (existingIndex >= 0) {
        updatedItems = [...items];
        updatedItems[existingIndex].quantity = targetQty;
      } else {
        const newItem: CartItem = {
          id: itemId,
          product,
          quantity,
          selectedColor,
          selectedMaterial,
          addedAt: new Date().toISOString(),
        };
        updatedItems = [newItem, ...items];
      }

      updateCartState(updatedItems);

      addToast({
        title: 'Added to Cart!',
        description: product.title,
        variant: 'success',
      });

      if (FEATURE_FLAGS.cartDrawer) {
        openCart();
      }
    },
    [items, updateCartState, addToast, openCart]
  );

  const removeItem = useCallback(
    (itemId: string) => {
      const removedItem = items.find((item) => item.id === itemId);
      if (!removedItem) return;

      const updatedItems = items.filter((item) => item.id !== itemId);
      updateCartState(updatedItems);

      addToast({
        title: 'Item Removed',
        description: `"${removedItem.product.title}" was removed from your cart.`,
        variant: 'info',
        actionLabel: FEATURE_FLAGS.undoActions ? 'Undo' : undefined,
        onAction: FEATURE_FLAGS.undoActions
          ? () => {
              updateCartState([...items]);
              addToast({
                title: 'Restored Item',
                description: `"${removedItem.product.title}" has been restored to your cart.`,
                variant: 'success',
              });
            }
          : undefined,
      });
    },
    [items, updateCartState, addToast]
  );

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(itemId);
        return;
      }

      const item = items.find((i) => i.id === itemId);
      if (item && quantity > (item.product.stock || 15)) {
        addToast({
          title: 'Stock Limit Exceeded',
          description: `Maximum available quantity is ${item.product.stock || 15}.`,
          variant: 'warning',
        });
        return;
      }

      const updatedItems = items.map((i) => (i.id === itemId ? { ...i, quantity } : i));
      updateCartState(updatedItems);
    },
    [items, updateCartState, removeItem, addToast]
  );

  const clearCart = useCallback(() => {
    updateCartState([]);
    setAppliedCoupon(null);
    CartRepository.clearCart();
  }, [updateCartState]);

  const applyCoupon = useCallback(
    async (code: string) => {
      const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
      const result = await CheckoutService.validateCoupon(code, subtotal);

      if (result.success && result.coupon) {
        setAppliedCoupon(result.coupon);
        addToast({
          title: 'Coupon Applied!',
          description: result.message,
          variant: 'success',
        });
      } else {
        addToast({
          title: 'Coupon Failed',
          description: result.message,
          variant: 'destructive',
        });
      }

      return { success: result.success, message: result.message };
    },
    [items, addToast]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    addToast({
      title: 'Coupon Removed',
      description: 'Promotional coupon has been removed.',
      variant: 'info',
    });
  }, [addToast]);

  const summary = useMemo(() => {
    const safe = Array.isArray(items) ? items : [];
    return CartService.calculateSummary(safe, appliedCoupon, shippingFee);
  }, [items, appliedCoupon, shippingFee]);

  const itemCount = useMemo(() => {
    const safe = Array.isArray(items) ? items : [];
    return safe.reduce((acc, item) => acc + (item?.quantity || 1), 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        appliedCoupon,
        shippingFee,
        setShippingFee,
        summary,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}
