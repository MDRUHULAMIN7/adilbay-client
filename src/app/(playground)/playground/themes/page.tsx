'use client';

import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/theme-provider';

export default function ThemesPlayground() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <>
      <div className="flex flex-col gap-3">
        <Heading level={1} variant="display">Semantic Themes</Heading>
        <Text variant="large" className="text-muted-foreground">
          Live verification of backgrounds, cards, elevated container cards, and borders under Light and Dark modes.
        </Text>
      </div>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">Theme Controller</Heading>
        <Card>
          <CardContent className="py-6 flex items-center justify-between gap-4">
            <div>
              <Text className="font-semibold text-sm">Active Theme: {theme.toUpperCase()} (Resolved: {resolvedTheme.toUpperCase()})</Text>
              <Text variant="caption" className="text-stone-500">Flicker-locked CSS transition is active.</Text>
            </div>
            <div className="flex gap-2">
              <Button variant={theme === 'light' ? 'primary' : 'outline'} size="sm" onClick={() => setTheme('light')} className="cursor-pointer">Light</Button>
              <Button variant={theme === 'dark' ? 'primary' : 'outline'} size="sm" onClick={() => setTheme('dark')} className="cursor-pointer">Dark</Button>
              <Button variant={theme === 'system' ? 'primary' : 'outline'} size="sm" onClick={() => setTheme('system')} className="cursor-pointer">System</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">Semantic Tokens Grid</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Surface Preview */}
          <div className="p-6 rounded-card border border-border bg-card shadow-soft">
            <Heading level={5} className="font-display font-semibold text-sm mb-2 text-foreground">Card Container (`bg-card`)</Heading>
            <Text className="text-xs text-muted-foreground mb-4">Standard content layout block matching ivory/stone variables.</Text>
            <div className="p-3 rounded-lg bg-surface border border-border/80 text-xs font-mono text-stone-600 dark:text-stone-300">
              Border color: `border-border`
            </div>
          </div>

          {/* Surface Tones Preview */}
          <div className="p-6 rounded-card border border-border bg-surface/30">
            <Heading level={5} className="font-display font-semibold text-sm mb-2 text-foreground">Surface Panel (`bg-surface`)</Heading>
            <Text className="text-xs text-muted-foreground mb-4">Intermediate containers fills supporting nested headers or drawers.</Text>
            <div className="p-3 rounded-lg bg-card border border-border text-xs font-mono text-stone-600 dark:text-stone-300">
              Card nested inside surface
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
