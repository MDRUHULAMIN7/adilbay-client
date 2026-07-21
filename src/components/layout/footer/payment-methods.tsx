import React from 'react';
import { PAYMENT_METHODS } from '@/config/footer';
import { Icon } from '../../ui/icon';

export function PaymentMethods() {
  return (
    <div className="flex items-center gap-3">
      {PAYMENT_METHODS.map((pay) => (
        <div
          key={pay.id}
          title={`Accepting ${pay.label}`}
          className="bg-stone-800 border border-stone-700/60 text-stone-450 rounded px-2.5 py-1 text-[11px] font-semibold select-none flex items-center gap-1.5"
        >
          <Icon name={pay.icon} className="h-3.5 w-3.5" />
          <span>{pay.label}</span>
        </div>
      ))}
    </div>
  );
}
export default PaymentMethods;
