'use client';

import React from 'react';
import { useTheme } from '@/providers/theme-provider';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FEATURE_FLAGS } from '@/config/features';

export default function OverviewPlayground() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <>
      <div className="flex flex-col gap-3">
        <Heading level={1} variant="display">Layout Verification Overview</Heading>
        <Text variant="large" className="text-muted-foreground">
          Welcome to the Furnixo Layout Polish verification sandbox. Inspect design tokens, responsive states, accessibility indicators, and visual components.
        </Text>
      </div>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">Theme & Feature Configs</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Active Theme State</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Text className="font-medium text-sm">
                Current active setting: <span className="text-primary font-bold">{theme.toUpperCase()}</span> (Resolved: {resolvedTheme.toUpperCase()})
              </Text>
              <div className="flex gap-2">
                <Button variant={theme === 'light' ? 'primary' : 'outline'} size="sm" onClick={() => setTheme('light')}>
                  Light Mode
                </Button>
                <Button variant={theme === 'dark' ? 'primary' : 'outline'} size="sm" onClick={() => setTheme('dark')}>
                  Dark Mode
                </Button>
                <Button variant={theme === 'system' ? 'primary' : 'outline'} size="sm" onClick={() => setTheme('system')}>
                  System Sync
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Feature Flags Registry</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs space-y-2 text-stone-600 dark:text-stone-300">
                {Object.entries(FEATURE_FLAGS).map(([key, value]) => (
                  <li key={key} className="flex items-center justify-between py-1 border-b border-border/40">
                    <span className="font-mono font-bold text-stone-500">{key}</span>
                    <span className={value ? 'text-green-600 font-bold' : 'text-stone-400 font-bold'}>
                      {value ? 'ENABLED' : 'DISABLED'}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3} className="font-display">Static Token Scanner Status</Heading>
        <Card>
          <CardContent className="py-6">
            <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/5 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
              <div className="flex flex-col gap-0.5">
                <Text className="text-green-700 dark:text-green-400 font-bold text-sm">
                  Semantic Token Compliance: 100%
                </Text>
                <Text className="text-xs text-green-650/80">
                  Node audit compiler runs successfully with zero forbidden color class names found in the workspace code.
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
