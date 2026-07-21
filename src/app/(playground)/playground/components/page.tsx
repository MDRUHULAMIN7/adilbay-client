'use client';

import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';

export default function ComponentsPlayground() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Heading level={1} variant="display">Base Components</Heading>
        <Text variant="large" className="text-muted-foreground">
          Showcase of the fundamental design elements (buttons, badges, avatars, loaders, card containers).
        </Text>
      </div>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Buttons</Heading>
        <Card>
          <CardContent className="flex flex-wrap gap-4 py-6">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="brand">Brand</Button>
            <Button variant="soft">Soft Accent</Button>
            <Button variant="link">Link Style</Button>
            <Button variant="icon" aria-label="Settings"><Icon name="Close" className="h-4 w-4" /></Button>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <Text className="font-medium text-sm">Sizes & Loading States:</Text>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="xs">XS Button</Button>
              <Button size="sm">SM Button</Button>
              <Button size="md">MD Button</Button>
              <Button size="lg">LG Button</Button>
              <Button size="xl">XL Button</Button>
              <Button loading>Loading</Button>
              <Button leftIcon={<Icon name="Search" className="h-4 w-4" />}>Search</Button>
              <Button rightIcon={<Icon name="ArrowRight" className="h-4 w-4" />}>Continue</Button>
            </div>
          </CardFooter>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Badges</Heading>
        <Card>
          <CardContent className="flex flex-wrap gap-3 py-6">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="soft">Soft Badge</Badge>
            <Badge variant="outline">Outline Badge</Badge>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Avatars</Heading>
        <Card>
          <CardContent className="flex items-end gap-6 py-6">
            <Avatar size="xs" name="John Doe" status="online" />
            <Avatar size="sm" name="Jane Doe" status="offline" />
            <Avatar size="md" name="Bob Smith" status="online" />
            <Avatar size="lg" name="Alice Cooper" status="offline" />
            <Avatar size="xl" name="Zack Snyder" status="online" />
            <Avatar size="md" name="Test Image" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" />
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Loaders (Spinner & Skeleton)</Heading>
        <Card>
          <CardContent className="flex flex-col gap-6 py-6">
            <div className="flex items-center gap-4">
              <Spinner size="xs" />
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner size="xl" />
            </div>
            <div className="border-t border-border pt-6 flex flex-col gap-4">
              <Text className="font-semibold text-sm">Skeleton Types:</Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Text className="text-xs mb-2">Text Line</Text>
                  <Skeleton variant="text" count={2} />
                </div>
                <div>
                  <Text className="text-xs mb-2">Circle / List Item</Text>
                  <Skeleton variant="list" />
                </div>
                <div className="md:col-span-2">
                  <Text className="text-xs mb-2">Card Loader</Text>
                  <Skeleton variant="card" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Cards</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card hoverable>
            <CardHeader>
              <CardTitle>Interactive Hover Card</CardTitle>
              <CardDescription>Translates slightly upward on focus or mouse hover.</CardDescription>
            </CardHeader>
            <CardContent>
              <Text>Perfect for displaying list products, articles, or modular details.</Text>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">Learn More</Button>
            </CardFooter>
          </Card>

          <Card bordered={false}>
            <CardHeader>
              <CardTitle>Flat / Frameless Card</CardTitle>
              <CardDescription>Flat card block lacking standard border borders.</CardDescription>
            </CardHeader>
            <CardContent>
              <Text>Best used inside containers with distinct borders or secondary backgrounds.</Text>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
