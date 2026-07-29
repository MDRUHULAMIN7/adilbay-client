'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import { Container } from '@/components/layout/container';
import { Icon } from '@/components/ui/icon';

export interface BreadcrumbLinkItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  badge?: string;
  items?: BreadcrumbLinkItem[];
  backgroundImage?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  badge,
  items = [],
  backgroundImage = '/images/auth-bg.jpg',
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'relative w-full pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 bg-stone-950 text-white overflow-hidden select-none border-b border-stone-800',
        className
      )}
      {...props}
    >
      {/* 1. Furniture Background Image */}
      <Image
        src={backgroundImage}
        alt="Furnixo Luxury Interior Showcase"
        fill
        priority
        className="object-cover object-center scale-105 transition-transform duration-1000"
        sizes="100vw"
        unoptimized
      />

      {/* 2. Cinematic Gradient Overlays for Readability & Luxury Aesthetics */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/85 to-stone-950/75 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-black/40 z-0 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* 3. Header & Branded Breadcrumb Container */}
      <Container variant="wide" className="relative z-10 flex flex-col gap-4 text-left">
        {/* Project Branded Breadcrumb Trail */}
        {items.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs font-semibold">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 dark:bg-stone-900/90 hover:bg-primary/20 text-stone-200 hover:text-primary transition-all duration-300 group cursor-pointer font-bold shadow-sm"
            >
              <Icon name="home" className="h-3.5 w-3.5 text-primary group-hover:scale-110 transition-transform" />
              <span>Home</span>
            </Link>

            {items.map((item, idx) => {
              const isLast = idx === items.length - 1;

              return (
                <React.Fragment key={idx}>
                  <Icon name="chevronRight" className="h-3.5 w-3.5 text-stone-500 shrink-0" />
                  {isLast || !item.href ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary/20 text-primary border border-primary/30 font-bold truncate max-w-[220px] sm:max-w-xs shadow-xs">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 dark:bg-stone-900/90 hover:bg-primary/20 text-stone-200 hover:text-primary transition-all duration-300 truncate max-w-[170px] sm:max-w-xs font-bold"
                    >
                      {item.label}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        {/* Title & Badge Row */}
        <div className="flex flex-col gap-2 mt-1">
          {badge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 backdrop-blur-md border border-primary/30 text-[11px] font-bold text-primary uppercase tracking-wider w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {badge}
            </div>
          )}

          <h1 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-stone-100 tracking-tight leading-tight drop-shadow-md">
            {title}
          </h1>

          {description && (
            <p className="text-xs sm:text-sm text-stone-300 font-light max-w-2xl leading-relaxed drop-shadow-sm">
              {description}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default PageHeader;
