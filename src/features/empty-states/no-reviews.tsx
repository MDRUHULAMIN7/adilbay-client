'use client';

import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';

export function NoReviews() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-border/80 rounded-card p-6 bg-surface/10 w-full">
      <Icon name="info" className="h-6 w-6 text-stone-450 mb-2" />
      <Heading level={5} className="font-display font-semibold text-sm text-foreground mb-1">
        No Reviews Yet
      </Heading>
      <Text className="text-stone-500 text-xs max-w-xs leading-relaxed">
        Be the first homeowner to review this seasoned wood collection piece.
      </Text>
    </div>
  );
}
export default NoReviews;
