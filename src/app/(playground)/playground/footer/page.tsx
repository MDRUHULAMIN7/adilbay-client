'use client';

import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FOOTER_COLUMNS, TRUST_SIGNALS } from '@/config/footer';

export default function FooterPlayground() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Heading level={1} variant="display">Footer System</Heading>
        <Text variant="large" className="text-muted-foreground">
          Review configuration schemas and trust signals (Secure Payment, Shipping, Money Back Guarantee) displayed inside the site footer.
        </Text>
      </div>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">Live Preview</Heading>
        <Card>
          <CardContent className="py-6">
            <Text className="text-sm">
              Scroll to the bottom of the page viewport to review newsletter form updates, payment methods badges, legal copyright declarations, and the Back to Top triggers.
            </Text>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">Footer Navigation Columns</Heading>
        <Card>
          <CardContent className="py-6 font-mono text-[10px] leading-relaxed text-stone-600 dark:text-stone-300 bg-surface/20 rounded-card overflow-x-auto">
            <pre>{JSON.stringify(FOOTER_COLUMNS, null, 2)}</pre>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">E-commerce Trust Signal Columns</Heading>
        <Card>
          <CardContent className="py-6 font-mono text-[10px] leading-relaxed text-stone-600 dark:text-stone-300 bg-surface/20 rounded-card overflow-x-auto">
            <pre>{JSON.stringify(TRUST_SIGNALS, null, 2)}</pre>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
