import { ShippingAddress } from '@/types/checkout';
import { storage } from '@/lib/storage';

const ADDRESSES_STORAGE_KEY = 'furnixo_saved_addresses';

export const CheckoutRepository = {
  getSavedAddresses(): ShippingAddress[] {
    return storage.get<ShippingAddress[]>(ADDRESSES_STORAGE_KEY, [
      {
        id: 'addr-1',
        fullName: 'Ruhul Amin',
        phone: '+880 1700-123456',
        email: 'ruhul@furnixo.com',
        addressLine1: 'House 42, Road 11, Block D, Banani',
        division: 'Dhaka',
        district: 'Dhaka',
        postalCode: '1213',
        label: 'home',
        isDefault: true,
      },
      {
        id: 'addr-2',
        fullName: 'Ruhul Amin',
        phone: '+880 1800-654321',
        email: 'ruhul.work@furnixo.com',
        addressLine1: 'Level 8, Crystal Palace, Gulshan 1',
        division: 'Dhaka',
        district: 'Dhaka',
        postalCode: '1212',
        label: 'office',
        isDefault: false,
      },
    ]);
  },

  saveAddress(address: ShippingAddress): ShippingAddress[] {
    const addresses = this.getSavedAddresses();
    const existingIndex = addresses.findIndex((a) => a.id === address.id);
    let updated: ShippingAddress[];

    if (existingIndex >= 0) {
      updated = [...addresses];
      updated[existingIndex] = address;
    } else {
      const newAddress = {
        ...address,
        id: address.id || `addr-${Date.now()}`,
      };
      updated = [newAddress, ...addresses];
    }

    if (address.isDefault) {
      updated = updated.map((a) => ({
        ...a,
        isDefault: a.id === (address.id || updated[0].id),
      }));
    }

    storage.set(ADDRESSES_STORAGE_KEY, updated);
    return updated;
  },

  deleteAddress(id: string): ShippingAddress[] {
    const addresses = this.getSavedAddresses().filter((a) => a.id !== id);
    storage.set(ADDRESSES_STORAGE_KEY, addresses);
    return addresses;
  },
};
