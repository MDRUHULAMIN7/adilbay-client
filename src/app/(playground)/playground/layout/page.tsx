'use client';

import React, { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ErrorBoundary } from '@/components/system/error-boundary';
import { LoadingBoundary } from '@/components/system/loading-boundary';
import { NotFound } from '@/components/system/not-found';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function CrashComponent(): React.ReactNode {
  throw new Error('Component crashed programmatically for demonstration.');
  return null;
}

export default function LayoutPlayground() {
  const [shouldCrash, setShouldCrash] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3">
        <Heading level={1} variant="display">System Layouts</Heading>
        <Text variant="large" className="text-muted-foreground">
          Showcase of error-handling structures, loading spinners, and empty states.
        </Text>
      </div>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Error Boundary</Heading>
        <Card>
          <CardHeader><CardTitle>ErrorBoundary Demo Container</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-6 py-6">
            <Text>Clicking below triggers a React rendering crash to demonstrate Error Boundary capture.</Text>
            <ErrorBoundary>
              {shouldCrash ? (
                <CrashComponent />
              ) : (
                <div className="p-4 border border-green-500/20 bg-green-500/5 rounded text-center">
                  <Text className="text-green-600 dark:text-green-400 font-semibold">Everything is currently healthy.</Text>
                  <Button variant="danger" className="mt-4" onClick={() => setShouldCrash(true)}>
                    Trigger React Crash
                  </Button>
                </div>
              )}
            </ErrorBoundary>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Loading Boundary</Heading>
        <LoadingBoundary message="Fetching premium furniture inventory..." />
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Not Found / Empty States</Heading>
        <NotFound title="No Products Found" description="We couldn't find any products matching your search criteria. Try modifying your filter options." />
      </section>
    </>
  );
}
