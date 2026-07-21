import React from 'react';
import { TRUST_SIGNALS } from '@/config/footer';
import { Icon } from '../../ui/icon';
import { Heading } from '../../ui/heading';
import { Text } from '../../ui/text';

export function TrustSignals() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-stone-800">
      {TRUST_SIGNALS.map((signal) => (
        <div
          key={signal.id}
          className="flex items-start gap-4 p-4 rounded-card bg-stone-850/40 border border-stone-800/40 hover:border-stone-700/60 transition-colors"
        >
          <div className="p-3 rounded-lg bg-stone-800 text-primary shrink-0">
            <Icon name={signal.icon} className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-1">
            <Heading level={5} className="text-stone-100 font-display text-sm font-semibold">
              {signal.title}
            </Heading>
            <Text className="text-stone-400 text-xs leading-relaxed">
              {signal.description}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}
