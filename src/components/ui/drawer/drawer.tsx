'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useMounted } from '@/hooks/useMounted';
import { Icon } from '../icon';

export interface DrawerProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  anchor?: 'left' | 'right';
  title?: string;
}

export function Drawer({
  className,
  isOpen,
  onClose,
  anchor = 'right',
  title,
  children,
  ...props
}: DrawerProps) {
  const isMounted = useMounted();
  const drawerRef = useFocusTrap(isOpen);
  const clickOutsideRef = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) onClose();
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isMounted) return null;

  const setRefs = (node: HTMLDivElement | null) => {
    drawerRef.current = node;
    clickOutsideRef.current = node;
  };

  const slideVariants = {
    left: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
    },
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' },
    },
  };

  const positionClasses = {
    left: 'left-0 inset-y-0 border-r',
    right: 'right-0 inset-y-0 border-l',
  };

  const drawerMarkup = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-modal flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
            aria-hidden="true"
          />

          <motion.div
            ref={setRefs}
            role="dialog"
            aria-modal="true"
            variants={slideVariants[anchor]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'fixed w-full max-w-md bg-background text-foreground shadow-overlay border-border flex flex-col h-full overflow-hidden',
              positionClasses[anchor],
              className
            )}
            {...props}
          >
            <div className="flex items-center justify-between p-6 border-b border-border/40 shrink-0">
              {title && (
                <h2 className="font-display font-semibold text-lg leading-none">
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                aria-label="Close drawer"
                className="p-1.5 rounded-xl opacity-70 hover:opacity-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer text-stone-600 dark:text-stone-300"
              >
                <Icon name="Close" className="h-5.5 w-5.5 sm:h-6 sm:w-6 stroke-[2.5px]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(drawerMarkup, document.body);
}
