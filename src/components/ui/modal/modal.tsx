'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useMounted } from '@/hooks/useMounted';
import { Icon } from '../icon';

interface ModalContextType {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Modal({ isOpen, onClose, size = 'md', className, children, ...props }: ModalProps) {
  const isMounted = useMounted();
  const modalRef = useFocusTrap(isOpen);
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

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-3xl',
    full: 'max-w-full h-full rounded-none',
  };

  const setRefs = (node: HTMLDivElement | null) => {
    modalRef.current = node;
    clickOutsideRef.current = node;
  };

  const modalMarkup = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
            aria-hidden="true"
          />

          <motion.div
            ref={setRefs}
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={cn(
              'relative w-full rounded-2xl bg-background text-foreground shadow-overlay border border-border flex flex-col max-h-[90vh] overflow-hidden',
              sizeClasses[size],
              className
            )}
            {...props}
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <Icon name="Close" className="h-4 w-4" />
            </button>
            <ModalContext.Provider value={{ isOpen, onClose }}>
              {children}
            </ModalContext.Provider>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalMarkup, document.body);
}

export function ModalHeader({ className, children, ...props }: BaseComponentProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 border-b border-border/40 pr-12', className)} {...props}>
      {children}
    </div>
  );
}

export function ModalBody({ className, children, ...props }: BaseComponentProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 overflow-y-auto flex-1 scrollbar-theme', className)} {...props}>
      {children}
    </div>
  );
}

export function ModalFooter({ className, children, ...props }: BaseComponentProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 border-t border-border/40 flex items-center justify-end gap-3', className)} {...props}>
      {children}
    </div>
  );
}
