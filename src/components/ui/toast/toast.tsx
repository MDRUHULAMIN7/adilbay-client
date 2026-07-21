'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { Icon } from '../icon';
import { ToastItem, useToast } from './use-toast';

export interface ToastProps extends BaseComponentProps {
  item: ToastItem;
}

const icons = {
  success: 'Check' as const,
  error: 'AlertCircle' as const,
  warning: 'AlertTriangle' as const,
  info: 'Info' as const,
};

const bgColors = {
  success: 'bg-success/10 text-success border-success/20',
  error: 'bg-destructive/10 text-destructive border-destructive/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  info: 'bg-info/10 text-info border-info/20',
};

export function Toast({ className, item, ...props }: ToastProps) {
  const { dismiss } = useToast();
  const { id, type, title, message, duration = 5000 } = item;

  useEffect(() => {
    if (duration === Infinity) return;
    const timer = setTimeout(() => {
      dismiss(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, dismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      role="alert"
      className={cn(
        'flex items-start gap-3 w-full max-w-sm rounded-lg border p-4 shadow-overlay bg-background text-foreground shrink-0 border-border',
        className
      )}
      {...props}
    >
      <div className={cn('flex items-center justify-center rounded-full p-1 border', bgColors[type])}>
        <Icon name={icons[type]} className="h-4 w-4" />
      </div>

      <div className="flex-1 flex flex-col gap-1 pr-4">
        {title && <span className="font-display font-semibold text-sm leading-none">{title}</span>}
        <span className="text-sm leading-normal text-muted-foreground">{message}</span>
      </div>

      <button
        onClick={() => dismiss(id)}
        aria-label="Dismiss notification"
        className="rounded-sm opacity-50 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <Icon name="Close" className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
