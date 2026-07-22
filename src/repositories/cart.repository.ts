import { CartItem } from '@/types/cart';
import { storage } from '@/lib/storage';

const CART_STORAGE_KEY = 'furnixo_shopping_cart';

export const CartRepository = {
  getCartItems(): CartItem[] {
    return storage.get<CartItem[]>(CART_STORAGE_KEY, []);
  },

  saveCartItems(items: CartItem[]): boolean {
    return storage.set<CartItem[]>(CART_STORAGE_KEY, items);
  },

  clearCart(): boolean {
    return storage.remove(CART_STORAGE_KEY);
  },

  mergeCarts(guestItems: CartItem[], userItems: CartItem[]): CartItem[] {
    const mergedMap = new Map<string, CartItem>();

    [...userItems, ...guestItems].forEach((item) => {
      if (mergedMap.has(item.id)) {
        const existing = mergedMap.get(item.id)!;
        mergedMap.set(item.id, {
          ...existing,
          quantity: Math.min(existing.quantity + item.quantity, item.product.stock || 99),
        });
      } else {
        mergedMap.set(item.id, { ...item });
      }
    });

    const result = Array.from(mergedMap.values());
    this.saveCartItems(result);
    return result;
  },
};
