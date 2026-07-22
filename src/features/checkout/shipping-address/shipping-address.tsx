'use client';

import React from 'react';
import { ShippingAddress as ShippingAddressType } from '@/types/checkout';
import { useAddresses } from '@/hooks/useAddresses';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';

interface ShippingAddressStepProps {
  address: ShippingAddressType;
  onChange: (address: ShippingAddressType) => void;
  onNext: () => void;
}

export function ShippingAddressStep({ address, onChange, onNext }: ShippingAddressStepProps) {
  const { addresses } = useAddresses();

  const handleSavedSelect = (saved: ShippingAddressType) => {
    onChange({ ...saved });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
      <Heading level={3} className="font-display text-lg font-bold">
        1. Shipping Address
      </Heading>

      {/* Saved Addresses Selector */}
      {addresses.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Select Saved Address
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {addresses.map((saved) => {
              const isSelected = address.id === saved.id;
              return (
                <div
                  key={saved.id}
                  onClick={() => handleSavedSelect(saved)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between gap-2 select-none ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-flat'
                      : 'border-border/60 hover:border-stone-400 bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-primary tracking-wide">
                      {saved.label || 'Home'} {saved.isDefault && '(Default)'}
                    </span>
                    {isSelected && <Icon name="check" className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex flex-col text-xs gap-0.5">
                    <span className="font-bold text-foreground">{saved.fullName}</span>
                    <span className="text-stone-500">{saved.addressLine1}</span>
                    <span className="text-stone-500">{saved.district}, {saved.division} - {saved.postalCode}</span>
                    <span className="text-stone-500 pt-1">{saved.phone}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="h-px bg-border/40 my-1" />

      {/* Address Form Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-foreground">Full Name *</label>
          <input
            type="text"
            required
            value={address.fullName}
            onChange={(e) => onChange({ ...address, fullName: e.target.value })}
            placeholder="MD RUHUL AMIN"
            className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-foreground">Phone Number *</label>
          <input
            type="tel"
            required
            value={address.phone}
            onChange={(e) => onChange({ ...address, phone: e.target.value })}
            placeholder="+880 1700-000000"
            className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-foreground">Email Address *</label>
          <input
            type="email"
            required
            value={address.email}
            onChange={(e) => onChange({ ...address, email: e.target.value })}
            placeholder="user@example.com"
            className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-foreground">Street Address / House / Road *</label>
          <input
            type="text"
            required
            value={address.addressLine1}
            onChange={(e) => onChange({ ...address, addressLine1: e.target.value })}
            placeholder="House 12, Road 4, Block C, Banani"
            className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-foreground">Division *</label>
          <select
            value={address.division}
            onChange={(e) => onChange({ ...address, division: e.target.value })}
            className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="Dhaka">Dhaka</option>
            <option value="Chittagong">Chittagong</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Khulna">Khulna</option>
            <option value="Barisal">Barisal</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Mymensingh">Mymensingh</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-foreground">District / City *</label>
          <input
            type="text"
            required
            value={address.district}
            onChange={(e) => onChange({ ...address, district: e.target.value })}
            placeholder="Dhaka"
            className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-foreground">Postal Code *</label>
          <input
            type="text"
            required
            value={address.postalCode}
            onChange={(e) => onChange({ ...address, postalCode: e.target.value })}
            placeholder="1213"
            className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 self-end bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-colors cursor-pointer shadow-md"
      >
        Continue to Billing Address
      </button>
    </form>
  );
}

export default ShippingAddressStep;
