'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { useCheckout } from '@/hooks/useCheckout';
import { formatPrice } from '@/lib/format-price';
import { Container } from '@/components/layout/container';

export default function CheckoutPage() {
  const { items, summary } = useCart();
  const {
    shippingAddress,
    setShippingAddress,
    submitOrder,
    isSubmitting,
  } = useCheckout();

  const [selectedPayment, setSelectedPayment] = useState<'card' | 'paypal' | 'gpay' | 'cod'>('card');
  const [contactInfo, setContactInfo] = useState({ emailOrPhone: '', newsletter: true });
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', cardName: '', expiry: '', cvv: '' });

  const [addressDisplay, setAddressDisplay] = useState(
    '4450 North Avenue Oakland, Nebraska, United States,'
  );
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitOrder();
  };

  return (
    <Container variant="wide" className="py-8 sm:py-12 flex flex-col gap-6 text-left min-h-[75vh]">
      {/* Title */}
      <h1 className="text-3xl font-bold font-display text-foreground border-b border-border/40 pb-4 uppercase tracking-tight">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-2">
        {/* Left Form Column */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-8 flex flex-col gap-8">

          {/* Delivery Address Section */}
          <div className="flex flex-col gap-3 pb-6 border-b border-border/40">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground font-display">Delivery address</h2>
              <div className="flex items-center gap-3 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(true)}
                  className="text-stone-600 dark:text-stone-300 hover:text-primary cursor-pointer"
                >
                  Add address
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(true)}
                  className="text-stone-600 dark:text-stone-300 hover:text-primary cursor-pointer"
                >
                  Change address
                </button>
              </div>
            </div>

            {isEditingAddress ? (
              <div className="flex flex-col gap-3 pt-2">
                <input
                  type="text"
                  value={shippingAddress.addressLine1}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                  placeholder="Street Address, City, Country"
                  className="bg-background border border-border/80 rounded-lg px-3.5 py-2.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => {
                    setAddressDisplay(shippingAddress.addressLine1 || addressDisplay);
                    setIsEditingAddress(false);
                  }}
                  className="self-start text-xs font-bold bg-primary text-primary-foreground px-4 py-2 rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  Save Address
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
                <span className="text-primary text-sm">📍</span>
                <span>{addressDisplay}</span>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-3 pb-6 border-b border-border/40">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground font-display">Contact</h2>
              <Link href="/account" className="text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-primary cursor-pointer">
                Log in
              </Link>
            </div>

            <input
              type="text"
              required
              placeholder="Email or mobile phone number"
              value={contactInfo.emailOrPhone}
              onChange={(e) => setContactInfo({ ...contactInfo, emailOrPhone: e.target.value })}
              className="w-full bg-background border border-border/80 rounded-lg px-3.5 py-3 text-xs font-semibold placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />

            <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={contactInfo.newsletter}
                onChange={(e) => setContactInfo({ ...contactInfo, newsletter: e.target.checked })}
                className="accent-primary h-4 w-4 rounded"
              />
              <span>Email me with news and offers</span>
            </label>
          </div>

          {/* Payment Section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-base font-bold text-foreground font-display">Payment</h2>
              <span className="text-xs text-stone-400">All transactions are secure and encrypted.</span>
            </div>

            <div className="flex flex-col gap-3">
              {/* Radio 1: Credit Card */}
              <div className={`border rounded-xl flex flex-col overflow-hidden transition-all ${
                selectedPayment === 'card' ? 'border-primary bg-primary/5 shadow-flat' : 'border-border/60 bg-card'
              }`}>
                <label
                  onClick={() => setSelectedPayment('card')}
                  className="flex items-center justify-between p-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedPayment === 'card'}
                      onChange={() => setSelectedPayment('card')}
                      className="accent-primary h-4 w-4"
                    />
                    <span className="text-xs font-bold text-foreground">Credit card</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-stone-500">
                    <span className="bg-background border border-border/60 px-1.5 py-0.5 rounded text-[#1A1F71] dark:text-stone-200">VISA</span>
                    <span className="bg-background border border-border/60 px-1.5 py-0.5 rounded text-[#EB001B] dark:text-stone-200">MasterCard</span>
                    <span className="bg-background border border-border/60 px-1.5 py-0.5 rounded text-[#006FCF] dark:text-stone-200">AMEX</span>
                    <span className="bg-background border border-border/60 px-1.5 py-0.5 rounded text-[#003087] dark:text-stone-200">PayPal</span>
                    <span className="bg-background border border-border/60 px-1.5 py-0.5 rounded text-primary">bKash</span>
                  </div>
                </label>

                {/* Card Inputs Form */}
                {selectedPayment === 'card' && (
                  <div className="p-4 pt-0 flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300">Card Number</label>
                      <input
                        type="text"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                        className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="flex flex-col gap-1 sm:col-span-1">
                        <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300">Name on card</label>
                        <input
                          type="text"
                          placeholder="Enter name"
                          value={cardDetails.cardName}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                          className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1 sm:col-span-1">
                        <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300">Expiry date</label>
                        <input
                          type="text"
                          placeholder="--/--"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1 sm:col-span-1">
                        <div className="flex items-center gap-1">
                          <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300">CVV Code</label>
                          <span className="text-[10px] text-stone-400 font-bold cursor-help" title="3 digits on back of card">?</span>
                        </div>
                        <input
                          type="text"
                          placeholder="xxx"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Radio 2: PayPal */}
              <label
                onClick={() => setSelectedPayment('paypal')}
                className={`border rounded-xl flex items-center justify-between p-4 cursor-pointer select-none transition-all ${
                  selectedPayment === 'paypal' ? 'border-primary bg-primary/5 shadow-flat' : 'border-border/60 bg-card'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={selectedPayment === 'paypal'}
                    onChange={() => setSelectedPayment('paypal')}
                    className="accent-primary h-4 w-4"
                  />
                  <span className="text-xs font-bold text-foreground">PayPal</span>
                </div>
                <span className="text-xs font-bold text-[#003087] dark:text-stone-200">PayPal</span>
              </label>

              {/* Radio 3: Google Pay */}
              <label
                onClick={() => setSelectedPayment('gpay')}
                className={`border rounded-xl flex items-center justify-between p-4 cursor-pointer select-none transition-all ${
                  selectedPayment === 'gpay' ? 'border-primary bg-primary/5 shadow-flat' : 'border-border/60 bg-card'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={selectedPayment === 'gpay'}
                    onChange={() => setSelectedPayment('gpay')}
                    className="accent-primary h-4 w-4"
                  />
                  <span className="text-xs font-bold text-foreground">Google Pay</span>
                </div>
                <span className="text-xs font-bold text-stone-700 dark:text-stone-200">G Pay</span>
              </label>

              {/* Radio 4: Cash on Delivery */}
              <label
                onClick={() => setSelectedPayment('cod')}
                className={`border rounded-xl flex items-center justify-between p-4 cursor-pointer select-none transition-all ${
                  selectedPayment === 'cod' ? 'border-primary bg-primary/5 shadow-flat' : 'border-border/60 bg-card'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={selectedPayment === 'cod'}
                    onChange={() => setSelectedPayment('cod')}
                    className="accent-primary h-4 w-4"
                  />
                  <span className="text-xs font-bold text-foreground">Cash on Delivery</span>
                </div>
                <span className="text-xs font-bold text-primary">💵</span>
              </label>
            </div>
          </div>

          {/* Place Your Order Theme Primary Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm uppercase tracking-wider py-4 rounded-xl transition-colors cursor-pointer shadow-lg shadow-primary/20 mt-2"
          >
            {isSubmitting ? 'Processing Order...' : 'Place Your Order'}
          </button>
        </form>

        {/* Right Sticky Order Summary Column */}
        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
          {/* Free Shipping Banner Box */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-bold flex items-center gap-2">
            <span>Congratulations 🎉 You are eligible for free shipping.</span>
          </div>

          {/* Order Summary Card */}
          <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-soft flex flex-col gap-4">
            <h3 className="font-display font-bold text-base text-foreground border-b border-border/40 pb-3">
              Order Summary
            </h3>

            {/* Product Item Preview Row */}
            <div className="flex flex-col gap-3 max-h-56 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-lg bg-muted/40 shrink-0 overflow-hidden border border-border/40">
                      {item.product.images[0] && (
                        <Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover" sizes="48px" />
                      )}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-foreground text-xs leading-tight font-display">{item.product.title}</span>
                      <span className="text-[11px] text-stone-400">{item.selectedColor || 'Black'}</span>
                    </div>
                  </div>
                  <span className="font-bold text-foreground font-display">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-border/40" />

            {/* Totals Calculation */}
            <div className="flex flex-col gap-2.5 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex justify-between">
                <span>Subtotal({items.reduce((acc, i) => acc + i.quantity, 0)} item)</span>
                <span className="font-bold text-foreground font-display">{formatPrice(summary.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-foreground font-display">
                  {summary.shippingEstimate === 0 ? 'Free' : formatPrice(summary.shippingEstimate)}
                </span>
              </div>
              {summary.discount > 0 && (
                <div className="flex justify-between text-success font-bold">
                  <span>Total Saving</span>
                  <span className="font-display">-{formatPrice(summary.discount)}</span>
                </div>
              )}

              <div className="h-px bg-border/40 my-1" />

              <div className="flex justify-between items-baseline pt-1">
                <span className="text-xs font-bold text-foreground">Estimated total:</span>
                <span className="text-lg font-bold font-display text-primary">
                  {formatPrice(summary.grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
