'use client';

import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LAYOUT } from '@/constants/design-tokens';

export default function HeaderPlayground() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Heading level={1} variant="display">Header System</Heading>
        <Text variant="large" className="text-muted-foreground">
          Real-time testing for header transitions, dimensional compactness, and scroll hide-on-down behavior.
        </Text>
      </div>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">Scroll Height Specifications</Heading>
        <Card>
          <CardContent className="py-6 flex flex-col gap-4">
            <Text className="text-sm">
              The Header coordinates height properties programmatically:
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-surface/30 border border-border/60">
                <Text className="font-bold text-primary text-lg">{LAYOUT.headerHeight}px</Text>
                <Text variant="caption" className="text-stone-500">Desktop Initial height (Scroll = 0)</Text>
              </div>
              <div className="p-4 rounded-lg bg-surface/30 border border-border/60">
                <Text className="font-bold text-primary text-lg">{LAYOUT.headerCompact}px</Text>
                <Text variant="caption" className="text-stone-500">Desktop Scrolled height (Scroll &gt; 30px)</Text>
              </div>
              <div className="p-4 rounded-lg bg-surface/30 border border-border/60">
                <Text className="font-bold text-primary text-lg">{LAYOUT.mobileHeader}px</Text>
                <Text variant="caption" className="text-stone-500">Mobile header height</Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">Behavior Instructions</Heading>
        <Card>
          <CardContent className="py-6 space-y-3 text-sm text-stone-600 dark:text-stone-300">
            <p>1. <strong>Scroll down</strong>: Scroll down this page. Once scroll offset exceeds 80px, the header will translate upward to hide from the page layout, maximizing screenspace.</p>
            <p>2. <strong>Scroll up</strong>: Scroll up slightly. The header instantly reveals itself and translates back down.</p>
            <p>3. <strong>Compactness Trigger</strong>: At the very top, the header is tall (80px). Beyond 30px of scroll height, it becomes compact (68px) and adds a blurred glass background overlay.</p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
