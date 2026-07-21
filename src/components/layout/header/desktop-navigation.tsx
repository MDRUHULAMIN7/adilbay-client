import React from 'react';
import { MAIN_NAVIGATION } from '@/config/navigation';
import { MegaMenu } from '../mega-menu';

export function DesktopNavigation() {
  return (
    <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
      {MAIN_NAVIGATION.map((item) => (
        <MegaMenu key={item.id} item={item} />
      ))}
    </nav>
  );
}
export default DesktopNavigation;
