'use client';

import { useState } from 'react';
import { SHIPPING_OPTIONS, ShippingOption } from '@/config/shipping';
import { useCart } from './useCart';

export function useShipping() {
  const { shippingFee, setShippingFee } = useCart();
  const [options] = useState<ShippingOption[]>(SHIPPING_OPTIONS);

  const selectedOption = options.find((opt) => opt.fee === shippingFee) || options[0];

  const selectOption = (id: string) => {
    const opt = options.find((o) => o.id === id);
    if (opt) {
      setShippingFee(opt.fee);
    }
  };

  return {
    shippingOptions: options,
    selectedOption,
    shippingFee,
    selectOption,
  };
}

export default useShipping;
