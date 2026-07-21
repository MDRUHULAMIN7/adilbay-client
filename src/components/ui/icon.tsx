import React from 'react';
import * as Lucide from 'lucide-react';
import { ICONS, IconName } from '@/constants/icons';

export interface IconProps extends Omit<Lucide.LucideProps, 'ref'> {
  name: IconName | string;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, ...props }, ref) => {
    // Normalize first character to lowercase (e.g. "ChevronDown" -> "chevronDown")
    const normalizedKey = (name.charAt(0).toLowerCase() + name.slice(1)) as IconName;
    const IconComponent = ICONS[normalizedKey];
    if (!IconComponent) return null;
    return <IconComponent ref={ref} {...props} />;
  }
);

Icon.displayName = 'Icon';
