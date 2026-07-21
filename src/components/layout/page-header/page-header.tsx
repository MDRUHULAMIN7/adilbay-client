import React from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { Heading } from '../../ui/heading';
import { Text } from '../../ui/text';

export interface PageHeaderProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  breadcrumb?: React.ReactNode;
}

export function PageHeader({
  className,
  title,
  description,
  breadcrumb,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-3 py-6 border-b border-border/80 mb-6', className)} {...props}>
      {breadcrumb && <div className="mb-1">{breadcrumb}</div>}
      <Heading level={1} variant="display">{title}</Heading>
      {description && <Text variant="large" className="text-muted-foreground max-w-2xl">{description}</Text>}
    </div>
  );
}
