'use client';

import React, { useState } from 'react';
import { Heading } from '../../ui/heading';
import { Text } from '../../ui/text';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useToast } from '../../ui/toast';
import { analytics } from '@/lib/analytics';

export function Newsletter() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Track analytics trigger
    analytics.trackCart('checkout', { email, action: 'newsletter_subscribe' });

    toast({
      type: 'success',
      title: 'Subscribed Successfully!',
      message: `${email} has been registered to the Furnixo newsletter.`,
    });
    setEmail('');
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Heading level={4} className="text-stone-50 text-sm font-bold uppercase tracking-wider font-display">
          Join Our Newsletter
        </Heading>
        <Text className="text-stone-400 text-xs leading-relaxed">
          Stay updated on collections release, material guides, and exclusive offers.
        </Text>
      </div>

      <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-stone-850 text-stone-100 placeholder:text-stone-500 border-stone-700 focus-visible:ring-brand-500 rounded-lg text-sm"
            required
            aria-label="Email address for newsletter"
          />
          <Button type="submit" variant="brand" className="rounded-lg text-sm font-semibold">
            Subscribe
          </Button>
        </div>
      </form>
    </div>
  );
}
