'use client';

import React from 'react';
import { PaymentMethodId } from '@/types/payment';
import { PAYMENT_METHODS } from '@/config/payment';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';

interface PaymentMethodStepProps {
  selectedId: PaymentMethodId;
  onSelect: (id: PaymentMethodId) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PaymentMethodStep({ selectedId, onSelect, onNext, onBack }: PaymentMethodStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
      <Heading level={3} className="font-display text-lg font-bold">
        4. Payment Method
      </Heading>

      <div className="flex flex-col gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedId === method.id;
          return (
            <label
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all select-none ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-flat'
                  : 'border-border/60 hover:border-stone-400 bg-card'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethodOption"
                    checked={isSelected}
                    onChange={() => onSelect(method.id)}
                    className="accent-primary h-4 w-4"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground">{method.title}</span>
                    <span className="text-xs text-stone-500">{method.description}</span>
                  </div>
                </div>
                <Icon name={method.iconName} className="h-5 w-5 text-primary" />
              </div>

              {isSelected && method.instructions && (
                <div className="mt-3 pt-3 border-t border-border/40 text-xs text-stone-600 dark:text-stone-300 bg-background/50 p-2.5 rounded-lg">
                  {method.instructions}
                </div>
              )}
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
          Review Order
        </button>
      </div>
    </form>
  );
}

export default PaymentMethodStep;
