'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { Container } from '../container';
import { TrustSignals } from './trust-signals';
import { Newsletter } from './newsletter';
import { FooterColumns } from './footer-columns';
import { PaymentMethods } from './payment-methods';
import { FooterBottom } from './footer-bottom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';

export interface FooterProps extends BaseComponentProps, React.HTMLAttributes<HTMLElement> {}

export function Footer({ className, ...props }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      role="contentinfo"
      className={cn(
        'bg-stone-900 text-stone-300 border-t border-stone-850 pt-16 pb-8 mt-auto w-full transition-colors',
        className
      )}
      {...props}
    >
      <Container variant="wide" className="flex flex-col gap-10">
        {/* Top: Newsletter + Quick Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-display font-bold text-xl text-stone-50 select-none">
                Furnixo
              </span>
              <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
                Crafting premium solid wood furniture tailored to fit modern houses. Built to the highest standards.
              </p>
            </div>
            <Newsletter />
          </div>

          <FooterColumns />
        </div>

        {/* Middle: Trust Signals Card deck */}
        <TrustSignals />

        {/* Bottom: Copyrights, Gateways */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-500 font-medium">Supported Checkout Gateways:</span>
            <PaymentMethods />
          </div>
          <FooterBottom />
        </div>
      </Container>
    </footer>
  );
}
export default Footer;
