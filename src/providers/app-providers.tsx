'use client';

import React from 'react';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { ToastProvider } from './toast-provider';
import { MotionProvider } from './motion-provider';
import { LayoutProvider } from './layout-provider';
import { CartProvider } from './cart-provider';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <LayoutProvider>
          <MotionProvider>
            <ToastProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </ToastProvider>
          </MotionProvider>
        </LayoutProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
