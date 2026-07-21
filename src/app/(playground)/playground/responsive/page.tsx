'use client';

import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BREAKPOINTS } from '@/constants/design-tokens';

export default function ResponsivePlayground() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Heading level={1} variant="display">Responsive Grid System</Heading>
        <Text variant="large" className="text-muted-foreground">
          Showcase demonstrating breakpoint layouts and container alignments across viewports.
        </Text>
      </div>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">Responsive Breakpoints Registry</Heading>
        <Card>
          <CardContent className="py-6 flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {Object.entries(BREAKPOINTS).map(([key, val]) => (
                <div key={key} className="p-3 rounded-lg bg-surface/30 border border-border/80 text-center flex flex-col gap-1">
                  <span className="text-xs font-bold text-primary font-mono">{key.toUpperCase()}</span>
                  <span className="text-xs text-stone-550">{val}px</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">Responsive Wrapping Grid</Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-card border border-border bg-card">
            <Text className="font-semibold text-sm">Column Block 1</Text>
            <Text variant="caption" className="text-muted-foreground">Wraps cleanly from full-width mobile to triple-column grid.</Text>
          </div>
          <div className="p-4 rounded-card border border-border bg-card">
            <Text className="font-semibold text-sm">Column Block 2</Text>
            <Text variant="caption" className="text-muted-foreground">Adapts spacing dynamic triggers based on breakpoint.</Text>
          </div>
          <div className="p-4 rounded-card border border-border bg-card">
            <Text className="font-semibold text-sm">Column Block 3</Text>
            <Text variant="caption" className="text-muted-foreground">WCAG alignment scaling is maintained.</Text>
          </div>
        </div>
      </section>
    </>
  );
}
