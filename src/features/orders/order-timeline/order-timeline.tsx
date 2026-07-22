'use client';

import React from 'react';
import { OrderTimelineStep } from '@/types/order';
import { Icon } from '@/components/ui/icon';

interface OrderTimelineProps {
  timeline: OrderTimelineStep[];
}

export function OrderTimeline({ timeline }: OrderTimelineProps) {
  return (
    <div className="flex flex-col gap-6 text-left py-2">
      <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-2">
        {/* Connector Bar on Desktop */}
        <div className="hidden sm:block absolute top-4 left-6 right-6 h-0.5 bg-border/60 -z-0" />

        {timeline.map((step, index) => {
          const isCompleted = step.isCompleted;
          const isCurrent = step.isCurrent;

          return (
            <div key={step.status} className="relative z-10 flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 flex-1">
              {/* Icon Circle */}
              <div
                className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all border ${
                  isCompleted
                    ? 'bg-primary text-primary-foreground border-primary shadow-flat'
                    : isCurrent
                    ? 'bg-primary/20 text-primary border-primary ring-2 ring-primary/20 ring-offset-2'
                    : 'bg-muted text-stone-400 border-border/60'
                }`}
              >
                {isCompleted ? <Icon name="check" className="h-4 w-4 stroke-[3px]" /> : index + 1}
              </div>

              {/* Text Meta */}
              <div className="flex flex-col sm:items-center">
                <span className={`text-xs font-bold ${isCurrent || isCompleted ? 'text-foreground' : 'text-stone-400'}`}>
                  {step.title}
                </span>
                <span className="text-[10px] text-stone-500 max-w-[140px] leading-tight">
                  {step.description}
                </span>
                {step.timestamp && (
                  <span className="text-[9px] text-stone-400 pt-0.5">
                    {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderTimeline;
