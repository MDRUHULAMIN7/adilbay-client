'use client';

import { useState, useEffect, useCallback } from 'react';
import { ShippingAddress } from '@/types/checkout';
import { CheckoutRepository } from '@/repositories/checkout.repository';
import { useToast } from '@/components/ui/toast';

export function useAddresses() {
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    const list = CheckoutRepository.getSavedAddresses();
    setAddresses(list);
  }, []);

  const saveAddress = useCallback(
    (address: ShippingAddress) => {
      const updated = CheckoutRepository.saveAddress(address);
      setAddresses(updated);
      addToast({
        title: 'Address Saved',
        description: 'Shipping address has been updated in your address book.',
        variant: 'success',
      });
    },
    [addToast]
  );

  const deleteAddress = useCallback(
    (id: string) => {
      const updated = CheckoutRepository.deleteAddress(id);
      setAddresses(updated);
      addToast({
        title: 'Address Removed',
        description: 'Address has been deleted from your address book.',
        variant: 'info',
      });
    },
    [addToast]
  );

  const setDefaultAddress = useCallback(
    (id: string) => {
      const target = addresses.find((a) => a.id === id);
      if (target) {
        saveAddress({ ...target, isDefault: true });
      }
    },
    [addresses, saveAddress]
  );

  return {
    addresses,
    saveAddress,
    deleteAddress,
    setDefaultAddress,
  };
}

export default useAddresses;
