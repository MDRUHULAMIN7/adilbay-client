'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/layout/logo';
import { useToast } from '@/components/ui/toast';
import { Icon } from '@/components/ui/icon';

export default function RegisterPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      addToast({
        title: 'Account Created!',
        description: 'Welcome to Furnixo! Your account is ready.',
        variant: 'success',
      });
      router.push('/account');
    }, 600);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center sm:justify-start px-4 sm:px-12 md:px-20 py-12 overflow-hidden bg-stone-900">
      {/* Background Image */}
      <Image
        src="/images/auth-bg.jpg"
        alt="Furnixo Luxury Interior"
        fill
        priority
        className="object-cover object-center opacity-90"
      />

      {/* Enhanced Rich Visual Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-stone-950/70 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 z-0 pointer-events-none" />

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-brand-500/15 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Floating Card Container */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-8 sm:p-10 shadow-2xl flex flex-col gap-6 text-left border border-stone-200/50 dark:border-stone-800">
        {/* Brand Logo Header */}
        <div className="flex items-center justify-start pb-2">
          <Logo />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold font-display tracking-tight text-stone-900 dark:text-stone-100">
          Create an account
        </h1>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 px-3.5 py-3 text-xs font-semibold placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100 text-stone-900 dark:text-stone-100"
            />
            <input
              type="text"
              required
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 px-3.5 py-3 text-xs font-semibold placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100 text-stone-900 dark:text-stone-100"
            />
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 px-3.5 py-3 text-xs font-semibold placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100 text-stone-900 dark:text-stone-100"
            />
          </div>

          <div className="relative flex flex-col gap-1">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="•••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 px-3.5 py-3 pr-10 text-xs font-semibold placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100 text-stone-900 dark:text-stone-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
            >
              <Icon name={showPassword ? 'eyeOff' : 'eye'} className="h-4 w-4" />
            </button>
          </div>

          {/* Register Full Width Black Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-brand-500 text-primary-foreground font-bold text-xs uppercase tracking-wider py-3.5 transition-colors cursor-pointer mt-2"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Footer Links */}
        <div className="flex flex-col gap-2 text-xs text-stone-500 dark:text-stone-400 pt-1">
          <div>
            <span>I already have an account </span>
            <Link href="/login" className="font-bold text-stone-900 dark:text-stone-100 hover:underline">
              Sign In
            </Link>
          </div>

          <div className="text-[11px] leading-tight text-stone-400 pt-1">
            By continuing, you agree to our <span className="font-bold text-stone-700 dark:text-stone-300">Terms of Service</span> &amp; <span className="font-bold text-stone-700 dark:text-stone-300">Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
