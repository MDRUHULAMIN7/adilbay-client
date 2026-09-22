'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';
import { Container } from '../container';
import { Logo } from '../logo';
import { Icon } from '../../ui/icon';
import { ROUTES } from '@/constants/routes';

export interface FooterProps extends BaseComponentProps, React.HTMLAttributes<HTMLElement> { }

export function Footer({ className, ...props }: FooterProps) {
  const companyLinks = [
    { label: 'About Furnixo', href: ROUTES.ABOUT },
    { label: 'License & Certificates', href: '#' },
    { label: 'Work Completion Certificate', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Privacy Policy', href: ROUTES.PRIVACY },
    { label: 'Return & Refund Policy', href: '#' },
    { label: 'Terms & Conditions', href: ROUTES.TERMS },
  ];

  const helpLinks = [
    { label: 'Contact Us', href: ROUTES.CONTACT },
    { label: 'FAQ & Help Center', href: ROUTES.FAQ },
    { label: 'Showroom Locator', href: '#' },
    { label: 'Delivery Tracker', href: '#' },
    { label: 'Billing Terms & Conditions', href: '#' },
  ];

  const moreInfoLinks = [
    { label: 'Company Profile', href: '#' },
    { label: 'Be Our Franchisee', href: '#' },
    { label: 'Furnixo Project Solution', href: '#' },
    { label: 'Catalogues & Brochure', href: '#' },
    { label: 'Furnixo in News', href: '#' },
    { label: 'Our Studio Team', href: '#' },
  ];

  return (
    <footer
      role="contentinfo"
      className={cn('w-full mt-auto select-none transition-colors pb-0 mb-0', className)}
      {...props}
    >
      {/* Main Footer Section */}
      <div className="bg-surface dark:bg-stone-900 text-stone-700 dark:text-stone-300 pt-10 pb-4 lg:pt-12 lg:pb-5 border-t border-stone-200/80 dark:border-stone-800">
        <Container variant="wide" className="flex flex-col gap-6 lg:gap-8">
          {/* 4-Column Header & Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-left">
            {/* Column 1: Brand Logo & Contact Details */}
            <div className="flex flex-col gap-4">
              <Logo variant="full" size="md" themeMode="system" />

              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  <Icon name="mapPin" className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground">Bangladesh Head Office:</span>
                    <span>Road -7, Block - A, Mirpur - 1, Dhaka, Bangladesh</span>
                  </div>
                </div>

                <a
                  href="tel:+8801742643763"
                  className="flex items-center gap-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 hover:text-primary transition-colors font-mono"
                >
                  <Icon name="smartphone" className="h-4 w-4 text-primary shrink-0" />
                  <span>+880 1742-643763</span>
                </a>

                <a
                  href="tel:+8809611330265"
                  className="flex items-center gap-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 hover:text-primary transition-colors font-mono"
                >
                  <Icon name="phone" className="h-4 w-4 text-primary shrink-0" />
                  <span>+880 9611 330265</span>
                </a>

                <a
                  href="mailto:contact@codeclubitsolutions.com"
                  className="flex items-center gap-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 hover:text-primary transition-colors"
                >
                  <Icon name="mail" className="h-4 w-4 text-primary shrink-0" />
                  <span>contact@codeclubitsolutions.com</span>
                </a>

                <a
                  href="mailto:codeclubitsolutions@gmail.com"
                  className="flex items-center gap-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 hover:text-primary transition-colors"
                >
                  <Icon name="mail" className="h-4 w-4 text-primary shrink-0" />
                  <span>codeclubitsolutions@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Column 2: THE COMPANY */}
            <div className="flex flex-col gap-3">
              <h3 className="font-display font-bold text-xs sm:text-sm uppercase tracking-widest text-stone-900 dark:text-stone-100 mb-1">
                THE COMPANY
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-primary transition-colors block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: NEED HELP? */}
            <div className="flex flex-col gap-3">
              <h3 className="font-display font-bold text-xs sm:text-sm uppercase tracking-widest text-stone-900 dark:text-stone-100 mb-1">
                NEED HELP?
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                {helpLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-primary transition-colors block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: MORE INFORMATION */}
            <div className="flex flex-col gap-3">
              <h3 className="font-display font-bold text-xs sm:text-sm uppercase tracking-widest text-stone-900 dark:text-stone-100 mb-1">
                MORE INFORMATION
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                {moreInfoLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-primary transition-colors block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Horizontal Bar: Mobile App Store Badges & Original Colored Social Brand Logos */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-5 border-t border-stone-200/80 dark:border-stone-800">
            {/* App Store & Play Store Badges with Real Official Multi-Color Logos */}
            <div className="flex items-center gap-3">
              {/* App Store Button */}
              <a
                href="#"
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-950 text-white hover:bg-stone-800 border border-stone-800 transition-colors shadow-xs"
                aria-label="Download on App Store"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.12-1.95.99-3.09-1 .04-2.2.67-2.88 1.47-.61.71-1.14 1.87-.99 2.99 1.11.09 2.22-.55 2.88-1.37z" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 font-medium leading-none">Download on the</span>
                  <span className="text-xs font-bold font-sans text-white leading-tight">App Store</span>
                </div>
              </a>

              {/* Google Play Button with Official 4-Color Vector Logo */}
              <a
                href="#"
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-950 text-white hover:bg-stone-800 border border-stone-800 transition-colors shadow-xs"
                aria-label="Get it on Google Play"
              >
                <svg className="h-5 w-5 sm:h-5.5 sm:w-5.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M3.609 1.814L13.792 12 3.61 22.186a2.372 2.372 0 0 1-.61-1.642V3.456c0-.626.223-1.21.609-1.642z" />
                  <path fill="#FBBC04" d="M17.556 8.236l-3.764 3.764 3.764 3.764 4.277-2.434c.828-.471.828-1.238 0-1.709l-4.277-2.385z" />
                  <path fill="#4285F4" d="M13.792 12L3.609 1.814a2.296 2.296 0 0 1 1.264-.374c.451 0 .902.128 1.29.351l11.393 6.445-3.756 3.764z" />
                  <path fill="#34A853" d="M13.792 12l3.756 3.764-11.393 6.445a2.443 2.443 0 0 1-1.29.351 2.296 2.296 0 0 1-1.264-.374L13.792 12z" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 font-medium leading-none">GET IT ON</span>
                  <span className="text-xs font-bold font-sans text-white leading-tight">Google Play</span>
                </div>
              </a>
            </div>

            {/* Social Network Brand Logos */}
            <div className="flex items-center gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Furnixo on Facebook"
                className="group cursor-pointer p-1"
              >
                <svg className="h-5.5 w-5.5 sm:h-6 sm:w-6 fill-[#1877F2] transition-transform duration-300 group-hover:scale-115" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Furnixo on Instagram"
                className="group cursor-pointer p-1"
              >
                <svg className="h-5.5 w-5.5 sm:h-6 sm:w-6 fill-none stroke-[#E4405F] stroke-2 transition-transform duration-300 group-hover:scale-115" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch Furnixo on YouTube"
                className="group cursor-pointer p-1"
              >
                <svg className="h-5.5 w-5.5 sm:h-6 sm:w-6 fill-[#FF0000] transition-transform duration-300 group-hover:scale-115" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Furnixo on Pinterest"
                className="group cursor-pointer p-1"
              >
                <svg className="h-5.5 w-5.5 sm:h-6 sm:w-6 fill-[#BD081C] transition-transform duration-300 group-hover:scale-115" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.627 0 11.999-5.373 11.999-11.988C24.016 5.367 18.644 0 12.017 0z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Furnixo on LinkedIn"
                className="group cursor-pointer p-1"
              >
                <svg className="h-5.5 w-5.5 sm:h-6 sm:w-6 fill-[#0077B5] transition-transform duration-300 group-hover:scale-115" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.239-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Centered Copyright Section */}
          <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800 text-center text-xs text-stone-500 dark:text-stone-400 font-medium">
            <span>
              &copy; Copyright {new Date().getFullYear()} FURNIXO. All Rights Reserved. &bull; DEVELOPED BY{' '}
              <a
                href="https://codeclubitsolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-primary transition-colors font-semibold"
              >
                CodeClub IT Solutions
              </a>
            </span>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
