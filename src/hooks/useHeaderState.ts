import { useState, useEffect, useRef } from 'react';
import { LAYOUT } from '@/constants/design-tokens';

export function useHeaderState() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY.current;

      // Scrolled compact state: Hysteresis deadband buffer to prevent layout oscillation
      // Collapse when scrolling down past 48px, restore only when back near top (< 12px)
      if (currentScrollY > 48) {
        setIsScrolled(true);
      } else if (currentScrollY < 12) {
        setIsScrolled(false);
      }

      // Smooth Hysteresis directional hide: require at least 10px scroll delta
      if (Math.abs(scrollDiff) > 10) {
        if (scrollDiff > 0 && currentScrollY > 120) {
          setIsHidden(true);
        } else if (scrollDiff < 0) {
          setIsHidden(false);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    // Check initial scroll position on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isScrolled, isHidden };
}

