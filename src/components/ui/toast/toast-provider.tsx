'use client';

import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ToastContext, ToastItem } from './use-toast';
import { Toast } from './toast';
import { generateId } from '@/lib/generate-id';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((item: Omit<ToastItem, 'id'>) => {
    const id = generateId('toast');
    setToasts((prev) => [...prev, { ...item, id }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <div
        className="fixed bottom-0 right-0 z-toast p-4 md:p-6 flex flex-col gap-3 w-full max-w-sm pointer-events-none"
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
