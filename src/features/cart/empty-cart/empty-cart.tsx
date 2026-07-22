'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

interface EmptyCartProps {
  onActionClick?: () => void;
  isMini?: boolean;
}

export function EmptyCart({ onActionClick, isMini = false }: EmptyCartProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${isMini ? 'py-12 px-4' : 'py-20 px-6'}`}>
      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
        <Icon name="cart" className="h-8 w-8 sm:h-10 sm:w-10" />
      </div>

      <Heading level={3} className="font-display font-bold text-lg sm:text-xl text-foreground mb-1">
        Your Cart is Empty
      </Heading>

      <Text className="text-stone-500 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
        Looks like you haven&apos;t added any solid woodcraft items to your cart yet.
      </Text>

      <Link href="/shop" onClick={onActionClick}>
        <Button variant="primary" size="md" className="font-bold text-xs uppercase tracking-wider cursor-pointer">
          Explore Catalog
        </Button>
      </Link>
    </div>
  );
}

export default EmptyCart;
