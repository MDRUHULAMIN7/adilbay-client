'use client';

import React from 'react';
import { useToast } from '@/components/ui/toast';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const { addToast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: 'Settings Saved',
      description: 'Account and notification preferences have been saved.',
      variant: 'success',
    });
  };

  return (
    <div className="flex flex-col gap-6 text-left p-6 sm:p-8 rounded-2xl bg-card border border-border/60 shadow-soft">
      <Heading level={2} className="font-display text-xl font-bold border-b border-border/40 pb-4">
        Account & Communication Settings
      </Heading>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Email Notifications</span>
          <label className="flex items-center gap-3 cursor-pointer select-none text-xs font-semibold text-foreground">
            <input type="checkbox" defaultChecked className="accent-primary h-4 w-4 rounded" />
            <span>Order updates & tracking delivery status</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer select-none text-xs font-semibold text-foreground">
            <input type="checkbox" defaultChecked className="accent-primary h-4 w-4 rounded" />
            <span>Promotional discounts & new collection drops</span>
          </label>
        </div>

        <div className="h-px bg-border/40" />

        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Password & Security</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-foreground">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-foreground">Confirm New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button type="submit" variant="primary" size="md" className="font-bold text-xs uppercase tracking-wider cursor-pointer">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
