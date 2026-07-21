'use client';

import React from 'react';
import { SOCIAL_NAVIGATION } from '@/config/footer';
import { Icon } from '../../ui/icon';
import { Text } from '../../ui/text';

export function FooterBottom() {
  return (
    <div className="border-t border-stone-850 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex flex-col items-center sm:items-start gap-2">
        <Text className="text-xs text-stone-500">
          &copy; {new Date().getFullYear()} Furnixo Ltd. All rights reserved. Conforming to AA metrics.
        </Text>
      </div>

      <div className="flex gap-4.5">
        {SOCIAL_NAVIGATION.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-550 hover:text-stone-300 transition-colors"
            aria-label={`Visit our ${social.label} page`}
          >
            <Icon name={social.icon} className="h-4.5 w-4.5" />
          </a>
        ))}
      </div>
    </div>
  );
}
export default FooterBottom;
