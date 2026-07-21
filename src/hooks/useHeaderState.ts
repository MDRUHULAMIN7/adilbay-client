import { useState, useEffect } from 'react';
import { LAYOUT } from '@/constants/design-tokens';

export function useHeaderState() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;

      // Scrolled compact state: active beyond 30px scroll height
      setIsScrolled(currentScrollY > 30);

      // Smooth Hysteresis directional hide: require at least 10px scroll delta
      if (Math.abs(scrollDiff) > 10) {
        if (scrollDiff > 0 && currentScrollY > 120) {
          setIsHidden(true);
        } else if (scrollDiff < 0) {
          setIsHidden(false);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return { isScrolled, isHidden };
}
