'use client';

import React, { useState } from 'react';
import { useAddresses } from '@/hooks/useAddresses';
import { ShippingAddress } from '@/types/checkout';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

export default function AddressesPage() {
  const { addresses, saveAddress, deleteAddress, setDefaultAddress } = useAddresses();
  const [isEditing, setIsEditing] = useState(false);

  const [formAddress, setFormAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    division: 'Dhaka',
    district: 'Dhaka',
    postalCode: '',
    label: 'home',
    isDefault: false,
  });

  const handleAddNew = () => {
    setFormAddress({
      fullName: '',
      phone: '',
      email: '',
      addressLine1: '',
      division: 'Dhaka',
      district: 'Dhaka',
      postalCode: '',
      label: 'home',
      isDefault: addresses.length === 0,
    });
    setIsEditing(true);
  };

  const handleEdit = (addr: ShippingAddress) => {
    setFormAddress(addr);
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveAddress(formAddress);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <Heading level={2} className="font-display text-xl font-bold">
          Address Book
        </Heading>
        {!isEditing && (
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddNew}
            leftIcon={<Icon name="plus" className="h-3.5 w-3.5" />}
            className="text-xs font-bold cursor-pointer"
          >
            Add New Address
          </Button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-card border border-border/60 shadow-soft grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Heading level={3} className="font-display text-base font-bold sm:col-span-2">
            {formAddress.id ? 'Edit Address' : 'Add New Address'}
          </Heading>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-foreground">Full Name *</label>
            <input
              type="text"
              required
              value={formAddress.fullName}
              onChange={(e) => setFormAddress({ ...formAddress, fullName: e.target.value })}
              className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-foreground">Phone *</label>
            <input
              type="tel"
              required
              value={formAddress.phone}
              onChange={(e) => setFormAddress({ ...formAddress, phone: e.target.value })}
              className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-foreground">Address *</label>
            <input
              type="text"
              required
              value={formAddress.addressLine1}
              onChange={(e) => setFormAddress({ ...formAddress, addressLine1: e.target.value })}
              className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-foreground">Division</label>
            <input
              type="text"
              required
              value={formAddress.division}
              onChange={(e) => setFormAddress({ ...formAddress, division: e.target.value })}
              className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-foreground">District</label>
            <input
              type="text"
              required
              value={formAddress.district}
              onChange={(e) => setFormAddress({ ...formAddress, district: e.target.value })}
              className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 sm:col-span-2 pt-2">
            <input
              type="checkbox"
              id="isDefaultCheck"
              checked={formAddress.isDefault || false}
              onChange={(e) => setFormAddress({ ...formAddress, isDefault: e.target.checked })}
              className="accent-primary h-4 w-4 rounded"
            />
            <label htmlFor="isDefaultCheck" className="text-xs font-bold cursor-pointer">Set as default shipping address</label>
          </div>

          <div className="flex items-center justify-end gap-3 sm:col-span-2 pt-4">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="text-xs font-bold cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="text-xs font-bold cursor-pointer">
              Save Address
            </Button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="p-5 rounded-2xl bg-card border border-border/60 shadow-soft flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-primary tracking-wider bg-primary/10 px-2 py-0.5 rounded">
                  {addr.label || 'Home'} {addr.isDefault && '• Default'}
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(addr)} className="text-stone-400 hover:text-foreground text-xs cursor-pointer">
                    Edit
                  </button>
                  <button onClick={() => addr.id && deleteAddress(addr.id)} className="text-stone-400 hover:text-destructive text-xs cursor-pointer">
                    Delete
                  </button>
                </div>
              </div>

              <div className="flex flex-col text-xs gap-1">
                <span className="font-bold text-foreground">{addr.fullName}</span>
                <span className="text-stone-500">{addr.addressLine1}</span>
                <span className="text-stone-500">{addr.district}, {addr.division} - {addr.postalCode}</span>
                <span className="text-stone-500 pt-1">{addr.phone}</span>
              </div>

              {!addr.isDefault && (
                <button
                  onClick={() => addr.id && setDefaultAddress(addr.id)}
                  className="text-xs font-bold text-primary hover:underline self-start cursor-pointer"
                >
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
