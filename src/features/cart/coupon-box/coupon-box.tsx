'use client';

import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

export function CouponBox() {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsApplying(true);
    await applyCoupon(code);
    setIsApplying(false);
    setCode('');
  };

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between p-3 rounded-lg border border-success/30 bg-success/5 text-xs">
        <div className="flex items-center gap-2">
          <Icon name="check" className="h-4 w-4 text-success" />
          <div className="flex flex-col text-left">
            <span className="font-bold text-success uppercase tracking-wide">
              {appliedCoupon.code} Applied
            </span>
            <span className="text-[11px] text-stone-500">{appliedCoupon.description}</span>
          </div>
        </div>
        <button
          onClick={removeCoupon}
          className="text-stone-400 hover:text-destructive transition-colors text-xs font-semibold cursor-pointer"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        type="text"
        placeholder="Enter promo code (e.g. FURNIXO10)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary uppercase"
      />
      <Button
        type="submit"
        variant="outline"
        size="sm"
        disabled={isApplying || !code.trim()}
        className="text-xs font-bold cursor-pointer shrink-0"
      >
        {isApplying ? 'Applying...' : 'Apply'}
      </Button>
    </form>
  );
}

export default CouponBox;
