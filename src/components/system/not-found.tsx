import React from 'react';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';

interface NotFoundProps {
  title?: string;
  description?: string;
}

export function NotFound({
  title = 'Page Not Found',
  description = "The page you are looking for doesn't exist or has been moved.",
}: NotFoundProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6 text-center bg-background rounded-lg border border-border/40 shadow-flat">
      <div className="rounded-full bg-stone-100 dark:bg-stone-800 p-3 text-stone-500 mb-4 border border-border">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <Heading level={3} className="mb-2">{title}</Heading>
      <Text variant="muted" className="max-w-sm">
        {description}
      </Text>
    </div>
  );
}
