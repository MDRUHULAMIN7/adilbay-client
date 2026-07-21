'use client';

import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { Icon } from '../icon';

interface AccordionContextType {
  activeValues: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export interface AccordionProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
}

export function Accordion({
  className,
  type = 'single',
  defaultValue,
  children,
  ...props
}: AccordionProps) {
  const [activeValues, setActiveValues] = useState<string[]>(() => {
    if (!defaultValue) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const toggleItem = (value: string) => {
    setActiveValues((prev) => {
      if (type === 'single') {
        return prev.includes(value) ? [] : [value];
      }
      return prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
    });
  };

  return (
    <AccordionContext.Provider value={{ activeValues, toggleItem }}>
      <div className={cn('flex flex-col border-t border-border', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

interface AccordionItemContextType {
  value: string;
  disabled?: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextType | undefined>(undefined);

export function AccordionItem({ className, value, disabled = false, children, ...props }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ value, disabled }}>
      <div className={cn('border-b border-border', className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export interface AccordionTriggerProps extends BaseComponentProps, React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error('AccordionTrigger must be used within AccordionItem');
  }

  const { activeValues, toggleItem } = accordionContext;
  const { value, disabled } = itemContext;

  const isOpen = activeValues.includes(value);

  return (
    <button
      type="button"
      disabled={disabled}
      aria-expanded={isOpen}
      onClick={() => toggleItem(value)}
      className={cn(
        'flex w-full items-center justify-between py-4 text-left font-medium text-foreground hover:underline transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none cursor-pointer',
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="text-muted-foreground shrink-0"
      >
        <Icon name="ChevronDown" className="h-4 w-4" />
      </motion.div>
    </button>
  );
}

export interface AccordionContentProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {}

export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error('AccordionContent must be used within AccordionItem');
  }

  const { activeValues } = accordionContext;
  const { value } = itemContext;

  const isOpen = activeValues.includes(value);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="overflow-hidden"
        >
          <div className={cn('pb-4 text-sm text-muted-foreground leading-normal', className)} {...props}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
