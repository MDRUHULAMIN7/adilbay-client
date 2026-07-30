'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/ui/icon';
import { useCart } from '@/hooks/useCart';
import { analytics } from '@/lib/analytics';

export interface FloatingContactWidgetProps {
  phoneNumber?: string;
  whatsappNumber?: string;
  messengerUsername?: string;
  className?: string;
}

export function FloatingContactWidget({
  phoneNumber = '+8801742643763',
  whatsappNumber = '8801742643763',
  messengerUsername = 'codeclubitsolutions',
  className = '',
}: FloatingContactWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openCart, itemCount } = useCart();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const contactOptions = [
    {
      id: 'phone',
      label: 'Call Support',
      href: `tel:${phoneNumber}`,
      bgColor: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      shadowColor: 'shadow-emerald-600/30',
      icon: <Icon name="phoneCall" className="h-5 w-5" />,
      isExternal: false,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`,
      bgColor: 'bg-[#25D366] hover:bg-[#20bd5a] text-white',
      shadowColor: 'shadow-[#25D366]/30',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
      isExternal: true,
    },
    {
      id: 'messenger',
      label: 'Messenger',
      href: `https://m.me/${messengerUsername}`,
      bgColor: 'bg-gradient-to-r from-[#0084FF] to-[#00C6FF] hover:opacity-95 text-white',
      shadowColor: 'shadow-[#0084FF]/30',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.304 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.26 5.888-3.26-6.559 6.963z" />
        </svg>
      ),
      isExternal: true,
    },
  ];

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end pb-[env(safe-area-inset-bottom,0px)] ${className}`}
    >
      {/* 1. FLOATING CART BUTTON (Spring Y Transform for Smooth Open & Close) */}
      <motion.button
        animate={{
          y: isOpen ? -185 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 24,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => {
          openCart();
          analytics.trackNavigation('Cart Trigger', 'Floating Cart FAB');
        }}
        aria-label="Open Floating Cart Drawer"
        className="relative group p-0 bg-transparent flex items-center justify-center cursor-pointer focus-visible:outline-none select-none z-20 mb-3"
      >
        {/* Larger Shopping Bag Icon */}
        <svg className="w-13 h-13 sm:w-14 sm:h-14 drop-shadow-xl transition-transform group-hover:scale-105" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="themeBagGradientExact" x1="32" y1="20" x2="32" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="hsl(var(--primary))" />
              <stop stopColor="#c77638ff" />
            </linearGradient>
          </defs>
          
          {/* Top Handle (Dark in Light Mode, White in Dark Mode) */}
          <path
            d="M23 23V16C23 11.0294 27.0294 7 32 7C36.9706 7 41 11.0294 41 16V23"
            className="stroke-stone-900 dark:stroke-white"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          
          {/* Bag Body (Theme Primary Gradient) */}
          <path
            d="M14 22H50C52.2091 22 53.9142 23.9213 53.6496 26.1158L50.2739 54.1158C50.0463 56.0028 48.4507 57.4286 46.5484 57.4286H17.4516C15.5493 57.4286 13.9537 56.0028 13.7261 54.1158L10.3504 26.1158C10.0858 23.9213 11.7909 22 14 22Z"
            fill="url(#themeBagGradientExact)"
          />

          {/* Screenshot Face Details: White Eye, Wink & Smile */}
          {/* Left Eye */}
          <circle cx="25" cy="37" r="2.5" fill="white" />

          {/* Right Eye (Wink) */}
          <path
            d="M37 35.5C38.5 34 41 34 42.5 35.5"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Smile */}
          <path
            d="M26 43C26 43 29 47 34 47C39 47 42 43 42 43"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* Live Cart Item Badge Counter (No Border) */}
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5.5 w-5.5 rounded-full bg-primary text-primary-foreground font-extrabold text-xs flex items-center justify-center shadow-md select-none">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-full bg-stone-900/90 text-stone-100 text-xs font-semibold shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-stone-700/50">
          View Shopping Cart ({itemCount})
        </span>
      </motion.button>

      {/* 2. Expanded Contact Options (Phone, WhatsApp, Messenger) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 24,
            }}
            className="absolute bottom-16 right-0 flex flex-col items-end gap-3 z-10"
          >
            {contactOptions.map((option, index) => (
              <motion.a
                key={option.id}
                href={option.href}
                target={option.isExternal ? '_blank' : undefined}
                rel={option.isExternal ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 15, scale: 0.75 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.75 }}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 23,
                  delay: (contactOptions.length - 1 - index) * 0.065,
                }}
                className="flex items-center gap-2.5 group cursor-pointer"
                aria-label={option.label}
              >
                {/* Tooltip Label */}
                <span className="px-3 py-1.5 rounded-full bg-stone-900/90 text-stone-100 text-xs font-semibold shadow-lg backdrop-blur-md opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all whitespace-nowrap border border-stone-700/50">
                  {option.label}
                </span>

                {/* Action Icon */}
                <div
                  className={`h-11 w-11 sm:h-12 sm:w-12 rounded-full ${option.bgColor} flex items-center justify-center shadow-lg ${option.shadowColor} group-hover:scale-110 transition-all duration-300 border border-white/20`}
                >
                  {option.icon}
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MAIN MESSAGE FLOATING FAB BUTTON */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileTap={{ scale: 0.92 }}
        className="relative group h-12 w-12 sm:h-13 sm:w-13 rounded-full bg-primary hover:bg-primary/95 text-primary-foreground flex items-center justify-center shadow-2xl shadow-primary/40 transition-all duration-300 cursor-pointer focus-visible:outline-none border-2 border-white/20 z-20"
        aria-label={isOpen ? 'Close Support Chat' : 'Open Support Chat'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="cross"
              initial={{ rotate: -180, opacity: 0, scale: 0.4 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 180, opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Icon name="close" className="h-6 w-6 text-primary-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: 180, opacity: 0, scale: 0.4 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -180, opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Icon
                name="messageCircle"
                className="h-6 w-6 transition-transform group-hover:rotate-12 text-primary-foreground"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse badge when chat menu is closed */}
        {!isOpen && (
          <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-stone-950 animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}

export default FloatingContactWidget;
