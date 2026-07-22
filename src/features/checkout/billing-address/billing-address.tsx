'use client';

import React from 'react';
import { BillingAddress as BillingAddressType, ShippingAddress as ShippingAddressType } from '@/types/checkout';
import { Heading } from '@/components/ui/heading';

interface BillingAddressStepProps {
  shippingAddress: ShippingAddressType;
  sameAsShipping: boolean;
  onSameAsShippingChange: (same: boolean) => void;
  billingAddress: BillingAddressType;
  onChange: (address: BillingAddressType) => void;
  onNext: () => void;
  onBack: () => void;
}

export function BillingAddressStep({
  shippingAddress,
  sameAsShipping,
  onSameAsShippingChange,
  billingAddress,
  onChange,
  onNext,
  onBack,
}: BillingAddressStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
      <Heading level={3} className="font-display text-lg font-bold">
        2. Billing Address
      </Heading>

      <label className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-card cursor-pointer select-none">
        <input
          type="checkbox"
          checked={sameAsShipping}
          onChange={(e) => onSameAsShippingChange(e.target.checked)}
          className="accent-primary h-4 w-4 rounded"
        />
        <div className="flex flex-col">
          <span className="text-xs font-bold text-foreground">Same as shipping address</span>
          <span className="text-[11px] text-stone-500">
            {shippingAddress.addressLine1}, {shippingAddress.district}
          </span>
        </div>
      </label>

      {!sameAsShipping && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-foreground">Full Name *</label>
            <input
              type="text"
              required
              value={billingAddress.fullName}
              onChange={(e) => onChange({ ...billingAddress, fullName: e.target.value })}
              className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-foreground">Address *</label>
            <input
              type="text"
              required
              value={billingAddress.addressLine1}
              onChange={(e) => onChange({ ...billingAddress, addressLine1: e.target.value })}
              className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-bold text-stone-500 hover:text-foreground cursor-pointer"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-colors cursor-pointer shadow-md"
        >
          Continue to Delivery Method
        </button>
      </div>
    </form>
  );
}

export default BillingAddressStep;
