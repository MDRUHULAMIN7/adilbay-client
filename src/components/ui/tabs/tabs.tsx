'use client';

import React, { createContext, useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export interface TabsProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({ className, defaultValue, value, onValueChange, children, ...props }: TabsProps) {
  const [localValue, setLocalValue] = useState(defaultValue);

  const activeValue = value !== undefined ? value : localValue;
  const handleValueChange = (newValue: string) => {
    setLocalValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <TabsContext.Provider value={{ value: activeValue, onValueChange: handleValueChange }}>
      <div className={cn('flex flex-col gap-4 w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {}

export function TabsList({ className, children, ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex h-10 items-center justify-start rounded-md bg-stone-100 dark:bg-stone-800/80 p-1 text-muted-foreground w-fit border border-border/40',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends BaseComponentProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({ className, value, children, ...props }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = context.value === value;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const parent = e.currentTarget.parentElement;
    if (!parent) return;

    const siblings = Array.from(parent.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const index = siblings.indexOf(e.currentTarget);

    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % siblings.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + siblings.length) % siblings.length;
    }

    if (nextIndex !== index) {
      e.preventDefault();
      siblings[nextIndex].focus();
      siblings[nextIndex].click();
    }
  };

  return (
    <button
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onKeyDown={handleKeyDown}
      onClick={() => context.onValueChange(value)}
      className={cn(
        'relative inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
        isActive ? 'text-foreground' : 'hover:text-foreground/80',
        className
      )}
      {...props}
    >
      {isActive && (
        <motion.div
          layoutId="active-tab"
          className="absolute inset-0 bg-background dark:bg-stone-700 rounded-sm shadow-flat border border-border/20"
          style={{ zIndex: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export interface TabsContentProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ className, value, children, ...props }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  const isActive = context.value === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      tabIndex={0}
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
