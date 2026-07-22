'use client';

import React, { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { profile, updateProfile } = useProfile();

  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, email, phone });
  };

  return (
    <div className="flex flex-col gap-6 text-left p-6 sm:p-8 rounded-2xl bg-card border border-border/60 shadow-soft">
      <Heading level={2} className="font-display text-xl font-bold border-b border-border/40 pb-4">
        Personal Profile Details
      </Heading>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-foreground">Full Name *</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-background border border-border/80 rounded-lg px-3 py-2.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-foreground">Email Address *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background border border-border/80 rounded-lg px-3 py-2.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-foreground">Phone Number *</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-background border border-border/80 rounded-lg px-3 py-2.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        <div className="pt-4 sm:col-span-2 flex justify-end">
          <Button type="submit" variant="primary" size="md" className="font-bold text-xs uppercase tracking-wider cursor-pointer">
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
