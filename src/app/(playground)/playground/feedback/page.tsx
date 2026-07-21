'use client';

import React, { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Drawer } from '@/components/ui/drawer';
import { Tooltip } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function FeedbackPlayground() {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerAnchor, setDrawerAnchor] = useState<'left' | 'right'>('right');

  const triggerToast = (type: 'success' | 'error' | 'warning' | 'info', title?: string) => {
    toast({
      type,
      title,
      message: `This is a generic ${type} toast message trigger notification.`,
    });
  };

  const openModal = (size: 'sm' | 'md' | 'lg' | 'xl' | 'full') => {
    setModalSize(size);
    setModalOpen(true);
  };

  const openDrawer = (anchor: 'left' | 'right') => {
    setDrawerAnchor(anchor);
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <Heading level={1} variant="display">Overlays & Feedback</Heading>
        <Text variant="large" className="text-muted-foreground">
          Showcase of dynamic overlay overlays (modals, drawers, sliding toasts, directional tooltips).
        </Text>
      </div>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Toasts (Stacked Notifications)</Heading>
        <Card>
          <CardContent className="flex flex-wrap gap-4 py-6">
            <Button variant="success" onClick={() => triggerToast('success', 'Order Placed!')}>
              Success Toast
            </Button>
            <Button variant="danger" onClick={() => triggerToast('error', 'Checkout Failed')}>
              Error Toast
            </Button>
            <Button variant="warning" onClick={() => triggerToast('warning', 'Session Expiring')}>
              Warning Toast
            </Button>
            <Button variant="soft" onClick={() => triggerToast('info', 'New Message')}>
              Info Toast
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Modals (Focus Locked Portals)</Heading>
        <Card>
          <CardContent className="flex flex-wrap gap-4 py-6">
            <Button variant="outline" onClick={() => openModal('sm')}>Small Modal</Button>
            <Button variant="outline" onClick={() => openModal('md')}>Medium Modal</Button>
            <Button variant="outline" onClick={() => openModal('lg')}>Large Modal</Button>
            <Button variant="outline" onClick={() => openModal('xl')}>Extra Large Modal</Button>
            <Button variant="outline" onClick={() => openModal('full')}>Full Screen Modal</Button>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Drawers (Sliding Panels)</Heading>
        <Card>
          <CardContent className="flex flex-wrap gap-4 py-6">
            <Button variant="outline" onClick={() => openDrawer('left')}>Left Drawer</Button>
            <Button variant="outline" onClick={() => openDrawer('right')}>Right Drawer</Button>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Tooltips (Directional Hovers)</Heading>
        <Card>
          <CardContent className="flex flex-wrap gap-8 py-6 justify-center">
            <Tooltip content="Tooltip appearing on top" position="top">
              <Button variant="outline" size="sm">Top Tooltip</Button>
            </Tooltip>
            <Tooltip content="Tooltip appearing on bottom" position="bottom">
              <Button variant="outline" size="sm">Bottom Tooltip</Button>
            </Tooltip>
            <Tooltip content="Tooltip appearing on left" position="left">
              <Button variant="outline" size="sm">Left Tooltip</Button>
            </Tooltip>
            <Tooltip content="Tooltip appearing on right" position="right">
              <Button variant="outline" size="sm">Right Tooltip</Button>
            </Tooltip>
          </CardContent>
        </Card>
      </section>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size={modalSize}>
        <ModalHeader>
          <Heading level={3}>Framer-motion Modal Dialog</Heading>
        </ModalHeader>
        <ModalBody>
          <Text>
            This modal wraps focus, restricts scrolling of the background document body, and closes when user presses the Escape key or clicks outside the modal borders.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>

      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} anchor={drawerAnchor} title="Product Configurations">
        <div className="flex flex-col gap-6">
          <Text>Adjust dynamic filter settings, select colors, or configure furniture wood types.</Text>
          <div className="flex flex-col gap-2">
            <Button variant="primary" fullWidth onClick={() => setDrawerOpen(false)}>Apply Configurations</Button>
            <Button variant="outline" fullWidth onClick={() => setDrawerOpen(false)}>Clear Filter</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
