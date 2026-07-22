'use client';

import React from 'react';
import { InvoiceData } from '@/types/order';
import { formatPrice } from '@/lib/format-price';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

interface InvoiceViewProps {
  data: InvoiceData;
}

export function InvoiceView({ data }: InvoiceViewProps) {
  const { order, companyDetails } = data;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-card border border-border/60 shadow-soft text-left print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
      {/* Print Action Header (Hidden in Print View) */}
      <div className="flex items-center justify-between pb-4 border-b border-border/40 print:hidden">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Official Brand Tax Invoice</span>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
          leftIcon={<Icon name="download" className="h-3.5 w-3.5" />}
          className="text-xs font-bold cursor-pointer"
        >
          Print / Save PDF
        </Button>
      </div>

      {/* Invoice Content */}
      <div className="flex flex-col gap-8">
        {/* Company Header & Order Meta */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-border/40">
          <div className="flex flex-col gap-1">
            <span className="font-display text-2xl font-bold text-primary tracking-tight">FURNIXO</span>
            <span className="text-xs text-stone-500">{companyDetails.address}</span>
            <span className="text-xs text-stone-500">Phone: {companyDetails.phone} | Email: {companyDetails.email}</span>
            <span className="text-xs text-stone-500">VAT Reg: {companyDetails.vatRegistration}</span>
          </div>

          <div className="flex flex-col sm:items-end text-xs">
            <span className="text-sm font-bold font-display text-foreground uppercase">INVOICE</span>
            <span className="font-bold text-primary font-display text-base pt-1">{order.id}</span>
            <span className="text-stone-500">Date: {new Date(order.createdAt).toLocaleDateString()}</span>
            <span className="text-stone-500">Status: {order.paymentStatus.toUpperCase()}</span>
          </div>
        </div>

        {/* Billed & Shipped Addresses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="flex flex-col gap-1">
            <span className="font-bold uppercase text-stone-400">Billed To</span>
            <span className="font-bold text-foreground">{order.billingAddress.fullName}</span>
            <span className="text-stone-500">{order.billingAddress.addressLine1}</span>
            <span className="text-stone-500">{order.billingAddress.district}, {order.billingAddress.division}</span>
            <span className="text-stone-500">{order.billingAddress.phone}</span>
          </div>

          <div className="flex flex-col gap-1 sm:items-end sm:text-right">
            <span className="font-bold uppercase text-stone-400">Shipping Details</span>
            <span className="font-bold text-foreground">{order.shippingAddress.fullName}</span>
            <span className="text-stone-500">{order.shippingAddress.addressLine1}</span>
            <span className="text-stone-500">Method: {order.shippingMethodTitle}</span>
            <span className="text-stone-500">Tracking: {order.trackingNumber || 'N/A'}</span>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30">
                <th className="py-2.5 px-3 font-bold uppercase text-stone-500">Item</th>
                <th className="py-2.5 px-3 font-bold uppercase text-stone-500 text-center">Qty</th>
                <th className="py-2.5 px-3 font-bold uppercase text-stone-500 text-right">Price</th>
                <th className="py-2.5 px-3 font-bold uppercase text-stone-500 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-3 font-semibold text-foreground">{item.title}</td>
                  <td className="py-3 px-3 text-center">{item.quantity}</td>
                  <td className="py-3 px-3 text-right">{formatPrice(item.unitPrice)}</td>
                  <td className="py-3 px-3 text-right font-bold">{formatPrice(item.unitPrice * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Summary Totals */}
        <div className="flex flex-col sm:items-end gap-1.5 text-xs pt-4 border-t border-border/40">
          <div className="flex justify-between sm:justify-start gap-8 text-stone-500">
            <span>Subtotal</span>
            <span className="font-semibold text-foreground">{formatPrice(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between sm:justify-start gap-8 text-success font-bold">
              <span>Discount</span>
              <span>-{formatPrice(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between sm:justify-start gap-8 text-stone-500">
            <span>Shipping</span>
            <span className="font-semibold text-foreground">{formatPrice(order.shippingFee)}</span>
          </div>
          <div className="flex justify-between sm:justify-start gap-8 text-stone-500">
            <span>VAT (5%)</span>
            <span className="font-semibold text-foreground">{formatPrice(order.tax)}</span>
          </div>
          <div className="flex justify-between sm:justify-start gap-8 text-base font-bold text-foreground pt-2 border-t border-border/40 w-full sm:w-auto">
            <span>Grand Total</span>
            <span className="text-primary font-display text-lg">{formatPrice(order.grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceView;
