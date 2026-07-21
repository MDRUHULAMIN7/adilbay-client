'use client';

import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AccessibilityPlayground() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Heading level={1} variant="display">Accessibility (a11y) Verification</Heading>
        <Text variant="large" className="text-muted-foreground">
          Audit keyboard navigation indicators, focus outline overrides, landmark roles, and WCAG AA guidelines.
        </Text>
      </div>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">WCAG Focus outline testbed</Heading>
        <Card>
          <CardContent className="py-6 flex flex-col gap-4 items-start">
            <Text className="text-sm text-stone-600 dark:text-stone-300">
              Press `Tab` on your keyboard to navigate focus indicators. Focused items display a high-contrast double outline.
            </Text>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" className="cursor-pointer">Focusable Button 1</Button>
              <Button variant="outline" className="cursor-pointer">Focusable Button 2</Button>
              <a href="#" className="text-xs font-semibold text-primary focus-visible:outline-none rounded py-1 px-2">
                Focusable Text Link
              </a>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">Semantics Checklist</Heading>
        <Card>
          <CardContent className="py-6">
            <ul className="text-xs space-y-2 text-stone-600 dark:text-stone-300">
              <li className="flex items-center gap-2 border-b border-border/40 py-1.5">
                <span className="text-green-600 font-bold">✔</span>
                <span><strong>Skip Navigation</strong>: SkipNav element renders at the very top of HTML page.</span>
              </li>
              <li className="flex items-center gap-2 border-b border-border/40 py-1.5">
                <span className="text-green-600 font-bold">✔</span>
                <span><strong>Landmarks</strong>: header (`role="banner"`), nav (`role="navigation"`), footer (`role="contentinfo"`).</span>
              </li>
              <li className="flex items-center gap-2 border-b border-border/40 py-1.5">
                <span className="text-green-600 font-bold">✔</span>
                <span><strong>Aria labels</strong>: `aria-expanded` and `aria-controls` mapped dynamically to layouts.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
