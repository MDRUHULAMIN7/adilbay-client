'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MOTION_PRESETS, SPRINGS } from '@/constants/motion';

export default function MotionPlayground() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Heading level={1} variant="display">Motion Presets</Heading>
        <Text variant="large" className="text-muted-foreground">
          Showcase of the global spring and ease curves configured inside Furnixo.
        </Text>
      </div>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Spring Constants (Interactive)</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader><CardTitle>Bounce Spring</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4 items-center py-6">
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={SPRINGS.bounce}
                className="h-16 w-16 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-semibold cursor-pointer shadow-raised"
              >
                Bounce
              </motion.div>
              <Text variant="caption">Hover / Tap me</Text>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Normal Spring</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4 items-center py-6">
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={SPRINGS.normal}
                className="h-16 w-16 bg-brand-600 rounded-lg flex items-center justify-center text-brand-50 font-semibold cursor-pointer shadow-raised"
              >
                Normal
              </motion.div>
              <Text variant="caption">Hover / Tap me</Text>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Slow Spring</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4 items-center py-6">
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={SPRINGS.slow}
                className="h-16 w-16 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-semibold cursor-pointer shadow-raised"
              >
                Slow
              </motion.div>
              <Text variant="caption">Hover / Tap me</Text>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Framer-motion Presets</Heading>
        <Card>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            <div className="flex flex-col gap-3">
              <Text className="font-semibold text-sm">Fade Preset (`MOTION_PRESETS.fade`):</Text>
              <motion.div
                {...MOTION_PRESETS.fade}
                className="p-4 rounded-md border border-border bg-stone-50 dark:bg-stone-800 text-center"
              >
                Fade-in Element
              </motion.div>
            </div>
            <div className="flex flex-col gap-3">
              <Text className="font-semibold text-sm">ScaleUp Preset (`MOTION_PRESETS.scaleUp`):</Text>
              <motion.div
                {...MOTION_PRESETS.scaleUp}
                className="p-4 rounded-md border border-border bg-stone-50 dark:bg-stone-800 text-center"
              >
                Scale-up Element
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
