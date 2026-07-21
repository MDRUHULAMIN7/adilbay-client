'use client';

import React, { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Pagination } from '@/components/ui/pagination';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function NavigationPlayground() {
  const [currentPage, setCurrentPage] = useState(1);

  const breadcrumbItems = [
    { label: 'Home', href: '/playground', icon: 'sun' as const },
    { label: 'Playground', href: '/playground' },
    { label: 'Navigation', icon: 'laptop' as const },
  ];

  return (
    <>
      <div className="flex flex-col gap-3">
        <Heading level={1} variant="display">Navigation Elements</Heading>
        <Text variant="large" className="text-muted-foreground">
          Showcase of the structural widgets (tabs, collapsibles, paths, pagination grids).
        </Text>
      </div>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Breadcrumbs</Heading>
        <Card>
          <CardContent className="py-6">
            <Breadcrumb items={breadcrumbItems} />
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Tabs (Framer Motion Slider)</Heading>
        <Card>
          <CardContent className="py-6">
            <Tabs defaultValue="modern">
              <TabsList>
                <TabsTrigger value="modern">Modern Design</TabsTrigger>
                <TabsTrigger value="rustic">Rustic Charm</TabsTrigger>
                <TabsTrigger value="minimalist">Minimalist</TabsTrigger>
              </TabsList>
              <TabsContent value="modern">
                <Text variant="muted">Modern styles emphasize clean lines, geometric shapes, and functional simplicity. Utilizing warm bronze frames and glass elements.</Text>
              </TabsContent>
              <TabsContent value="rustic">
                <Text variant="muted">Rustic furniture celebrates organic wood grains, texturized fabrics, and comfortable earth tones inspired by cottage living.</Text>
              </TabsContent>
              <TabsContent value="minimalist">
                <Text variant="muted">Minimalist setups maximize open space, utilizing monochromatic scales and hidden layouts for a clutter-free environment.</Text>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Accordions (Framer Motion Expandable)</Heading>
        <Card>
          <CardContent className="py-6">
            <Accordion type="single" defaultValue="shipping">
              <AccordionItem value="shipping">
                <AccordionTrigger>What are the shipping durations?</AccordionTrigger>
                <AccordionContent>
                  Shipping takes 2-3 business days within Dhaka division and 4-7 business days for other divisions in Bangladesh.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="warranty">
                <AccordionTrigger>What type of warranty is provided?</AccordionTrigger>
                <AccordionContent>
                  We offer a 1-year manufacturing defect warranty on all solid wood products, including structural elements.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="return">
                <AccordionTrigger>Can I request a custom product return?</AccordionTrigger>
                <AccordionContent>
                  Standard products can be returned within 7 days. Custom-made furniture options are final and non-refundable.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Pagination</Heading>
        <Card>
          <CardContent className="flex flex-col gap-4 py-6 items-center">
            <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
            <Text variant="caption">Selected Page: {currentPage} of 10</Text>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
