'use client';

import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLayout } from '@/providers/layout-provider';

export default function DrawerPlayground() {
  const { setIsMobileNavOpen } = useLayout();

  return (
    <>
      <div className="flex flex-col gap-3">
        <Heading level={1} variant="display">Mobile Drawer Navigation</Heading>
        <Text variant="large" className="text-muted-foreground">
          Inspect the multi-tiered layouts, settings selectors, counters, and links configured inside the mobile drawer.
        </Text>
      </div>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">Test Controls</Heading>
        <Card>
          <CardContent className="py-6 flex flex-col gap-4 items-start">
            <Text className="text-sm text-stone-600 dark:text-stone-300">
              Click below to slide out the layout drawer. You can verify the preference selectors, language triggers, and social links footer.
            </Text>
            <Button variant="primary" size="md" onClick={() => setIsMobileNavOpen(true)} className="cursor-pointer">
              Open Mobile Drawer Navigation
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
