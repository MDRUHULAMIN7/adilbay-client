'use client';

import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SHOP_MEGA_MENU, ROOMS_MEGA_MENU } from '@/config/mega-menu';

export default function MegaMenuPlayground() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Heading level={1} variant="display">Mega Menu Configuration</Heading>
        <Text variant="large" className="text-muted-foreground">
          Explore configuration-driven schemas driving the Shop and Rooms full-width layout dropdowns.
        </Text>
      </div>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">Live Preview</Heading>
        <Card>
          <CardContent className="py-6">
            <Text className="text-sm">
              Hover over the <strong>Shop</strong> or <strong>Rooms</strong> link in the top layout header to inspect the visual grids, category lists, featured banners, and trending products columns.
            </Text>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">Shop Menu Model Dataset</Heading>
        <Card>
          <CardContent className="py-6 font-mono text-[10px] leading-relaxed text-stone-600 dark:text-stone-300 bg-surface/20 rounded-card overflow-x-auto">
            <pre>{JSON.stringify(SHOP_MEGA_MENU, null, 2)}</pre>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
