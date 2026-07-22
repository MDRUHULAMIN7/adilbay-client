'use client';

import React from 'react';
import { SHIPPING_OPTIONS } from '@/config/shipping';
import { formatPrice } from '@/lib/format-price';
import { Heading } from '@/components/ui/heading';

interface ShippingMethodStepProps {
  selectedId: string;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ShippingMethodStep({ selectedId, onSelect, onNext, onBack }: ShippingMethodStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
      <Heading level={3} className="font-display text-lg font-bold">
        3. Delivery Method
      </Heading>

      <div className="flex flex-col gap-3">
        {SHIPPING_OPTIONS.map((option) => {
          const isSelected = selectedId === option.id;
          return (
            <label
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all select-none ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-flat'
                  : 'border-border/60 hover:border-stone-400 bg-card'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shippingMethodOption"
                  checked={isSelected}
                  onChange={() => onSelect(option.id)}
                  className="accent-primary h-4 w-4"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{option.title}</span>
                    {option.badge && (
                      <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded uppercase">
                        {option.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-stone-500">{option.description}</span>
                  <span className="text-[11px] font-semibold text-primary pt-0.5">{option.estimatedDays}</span>
                </div>
              </div>

              <span className="text-sm font-bold text-foreground font-display">
                {option.fee > 0 ? formatPrice(option.fee) : 'FREE'}
              </span>
            </label>
          );
        })}
      </div>

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
          Continue to Payment
        </button>
      </div>
    </form>
  );
}

export default ShippingMethodStep;
