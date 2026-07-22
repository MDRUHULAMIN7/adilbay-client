'use client';

import React from 'react';
import { useShipping } from '@/hooks/useShipping';
import { formatPrice } from '@/lib/format-price';

export function ShippingEstimator() {
  const { shippingOptions, selectedOption, selectOption } = useShipping();

  return (
    <div className="flex flex-col gap-2.5 text-left border-t border-border/40 pt-4">
      <span className="text-xs font-bold text-foreground">Select Delivery Option</span>
      <div className="flex flex-col gap-2">
        {shippingOptions.map((option) => {
          const isSelected = selectedOption.id === option.id;
          return (
            <label
              key={option.id}
              onClick={() => selectOption(option.id)}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all select-none ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-flat'
                  : 'border-border/60 hover:border-stone-400 bg-background'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="shippingOption"
                  checked={isSelected}
                  onChange={() => selectOption(option.id)}
                  className="accent-primary h-3.5 w-3.5"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">{option.title}</span>
                  <span className="text-[11px] text-stone-500">{option.estimatedDays}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-primary">
                {option.fee > 0 ? formatPrice(option.fee) : 'FREE'}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default ShippingEstimator;
