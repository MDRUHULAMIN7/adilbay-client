'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useProfile } from '@/hooks/useProfile';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

export default function ProfilePage() {
  const { profile, updateProfile } = useProfile();

  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [avatar, setAvatar] = useState(profile.avatar || '');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setAvatar(result);
        updateProfile({ avatar: result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, email, phone, avatar });
  };

  return (
    <div className="flex flex-col gap-6 text-left p-6 sm:p-8 rounded-3xl bg-card border border-stone-200/80 dark:border-stone-800 shadow-soft w-full">
      <div className="flex flex-col gap-1 pb-4 border-b border-stone-200/80 dark:border-stone-800">
        <Heading level={2} className="font-display text-xl sm:text-2xl font-bold text-foreground">
          Personal Profile Details
        </Heading>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Manage your personal account information and custom profile photo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Avatar Photo Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 sm:col-span-2">
          <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-stone-200 shrink-0 border border-stone-300 dark:border-stone-600 shadow-sm flex items-center justify-center">
            {avatar ? (
              <Image
                src={avatar}
                alt={fullName}
                fill
                className="object-cover"
                sizes="64px"
                unoptimized
              />
            ) : (
              <span className="font-display font-extrabold text-xl text-primary uppercase">
                {fullName.slice(0, 2)}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <span className="text-xs font-bold text-foreground">Profile Avatar Photo</span>
            <div className="flex items-center gap-3 flex-wrap">
              <label className="px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold cursor-pointer hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm">
                <Icon name="camera" className="h-4 w-4" />
                <span>Upload New Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>

              {avatar && (
                <button
                  type="button"
                  onClick={() => {
                    setAvatar('');
                    updateProfile({ avatar: '' });
                  }}
                  className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:text-red-600 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-foreground">Full Name *</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-background border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-3 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-foreground">Email Address *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-background border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-3 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-foreground">Phone Number *</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-background border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-3 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground"
          />
        </div>

        <div className="pt-4 sm:col-span-2 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md shadow-primary/20"
          >
            <Icon name="check" className="h-4 w-4 mr-1.5" />
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
