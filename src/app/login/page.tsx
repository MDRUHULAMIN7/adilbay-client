'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/layout/logo';
import { useToast } from '@/components/ui/toast';
import { Icon } from '@/components/ui/icon';

export default function LoginPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      addToast({
        title: 'Welcome Back!',
        description: 'You have successfully signed in to Furnixo.',
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
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-amber-600/15 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Floating Card Container */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-8 sm:p-10 shadow-2xl flex flex-col gap-6 text-left border border-stone-200/50 dark:border-stone-800">
        {/* Brand Logo Header */}
        <div className="flex items-center justify-start pb-2">
          <Logo />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold font-display tracking-tight text-stone-900 dark:text-stone-100">
          Welcome back
        </h1>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          {/* Meta Row: Remember Me & Reset Password */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-stone-900 dark:accent-stone-100 h-3.5 w-3.5"
              />
              <span>Remember me</span>
            </label>
            <div>
              <span>Forgot password? </span>
              <Link href="/forgot-password" className="font-bold text-stone-900 dark:text-stone-100 hover:underline">
                Reset It
              </Link>
            </div>
          </div>

          {/* Full Width Black Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1c1917] hover:bg-black dark:bg-white dark:text-stone-900 text-white font-bold text-xs uppercase tracking-wider py-3.5 transition-colors cursor-pointer mt-2"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-xs text-stone-500 dark:text-stone-400 pt-1">
          <span>Don&apos;t have an account? </span>
          <Link href="/register" className="font-bold text-stone-900 dark:text-stone-100 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
