import React from 'react';
import { Spinner } from '../ui/spinner';
import { Text } from '../ui/text';

interface LoadingBoundaryProps {
  message?: string;
}

export function LoadingBoundary({ message = 'Loading content...' }: LoadingBoundaryProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6 text-center bg-background rounded-lg border border-border/40 shadow-flat">
      <Spinner size="lg" className="mb-4" />
      <Text variant="muted">{message}</Text>
    </div>
  );
}
