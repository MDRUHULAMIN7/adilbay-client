'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { OrderRepository } from '@/repositories/order.repository';
import { OrderService } from '@/services/order.service';
import { OrderTimeline } from '@/features/orders/order-timeline/order-timeline';
import { InvoiceView } from '@/features/orders/invoice/invoice';
import { MOCK_TRACKING_EVENTS } from '@/data/order-tracking';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const order = OrderRepository.getOrderById(resolvedParams.id);

  if (!order) {
    return (
      <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
        <Heading level={2} className="text-xl font-bold">Order Not Found</Heading>
        <span className="text-xs text-stone-500">Order reference {resolvedParams.id} could not be located.</span>
        <Link href="/account/orders">
          <Button variant="primary" size="sm" className="text-xs font-bold uppercase tracking-wider cursor-pointer">
            Back to Orders
          </Button>
        </Link>
      </div>
    );
  }

  const invoiceData = OrderService.getInvoiceData(order);
  const trackingEvents = MOCK_TRACKING_EVENTS.default;

  return (
    <div className="flex flex-col gap-8 text-left">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex flex-col">
          <Link href="/account/orders" className="text-xs text-stone-500 hover:text-primary transition-colors flex items-center gap-1 mb-1">
            <Icon name="arrowLeft" className="h-3.5 w-3.5" />
            <span>Back to All Orders</span>
          </Link>
          <Heading level={2} className="font-display text-xl font-bold">
            Order {order.id}
          </Heading>
        </div>
        <span className="font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase text-xs">
          {order.status}
        </span>
      </div>

      {/* Visual Timeline Bar */}
      <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-soft">
        <OrderTimeline timeline={order.timeline} />
      </div>

      {/* Real-time Tracking Events Log */}
      <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-soft flex flex-col gap-4">
        <Heading level={3} className="font-display text-base font-bold">
          Live Tracking Activity
        </Heading>
        <div className="flex flex-col gap-3 text-xs">
          {trackingEvents.map((evt) => (
            <div key={evt.id} className="flex items-start gap-3 border-l-2 border-primary pl-3 py-0.5">
              <div className="flex flex-col">
                <span className="font-bold text-foreground">{evt.statusText}</span>
                <span className="text-stone-500">{evt.location}</span>
                <span className="text-[10px] text-stone-400">{evt.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Printable Invoice */}
      <InvoiceView data={invoiceData} />
    </div>
  );
}
