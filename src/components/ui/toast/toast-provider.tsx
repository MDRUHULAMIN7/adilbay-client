'use client';

import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ToastContext, ToastItem, ToastType } from './use-toast';
import { Toast } from './toast';
import { generateId } from '@/lib/generate-id';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((item: Omit<ToastItem, 'id'>) => {
    const id = generateId('toast');
    setToasts((prev) => [...prev, { ...item, id }]);
  }, []);

  const addToast = useCallback(
    (options: {
      title?: string;
      description?: string;
      message?: string;
      variant?: string;
      type?: ToastType;
    }) => {
      const typeMap: Record<string, ToastType> = {
        success: 'success',
        destructive: 'error',
        error: 'error',
        warning: 'warning',
        info: 'info',
      };
      const resolvedType: ToastType = options.type || typeMap[options.variant || 'info'] || 'info';
      const msg = options.message || options.description || options.title || '';
      toast({
        type: resolvedType,
        title: options.title,
        message: msg,
      });
    },
    [toast]
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, addToast, dismiss }}>
      {children}
      <div
        className="fixed top-20 right-4 sm:right-6 z-[200] flex flex-col gap-2.5 w-full max-w-xs pointer-events-none"
        aria-live="assertive"
      >
        <AnimatePresence>
          {toasts.map((item) => (
            <div key={item.id} className="pointer-events-auto w-full">
              <Toast item={item} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
