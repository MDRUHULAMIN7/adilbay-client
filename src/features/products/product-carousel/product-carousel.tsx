'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { ProductCard } from '../product-card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

interface ProductCarouselProps {
  products: Product[];
  autoplay?: boolean;
}

export function ProductCarousel({ products, autoplay = false }: ProductCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth / (window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1);
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll();

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [products]);

  // Autoplay handler
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      const el = containerRef.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        handleScroll('right');
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [autoplay]);

  // Keyboard support when focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleScroll('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleScroll('right');
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div
      className="relative w-full group/carousel focus-visible:outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Horizontal product recommendation carousel. Use Left and Right arrow keys to navigate."
    >
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none py-4 w-full snap-x snap-mandatory"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[calc(100%-12px)] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Left Navigation Chevron */}
      {showLeft && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 p-0 rounded-full bg-background border-border/80 shadow-soft cursor-pointer flex items-center justify-center -ml-5 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
          aria-label="Scroll left"
        >
          <Icon name="chevronLeft" className="h-5 w-5" />
        </Button>
      )}

      {/* Right Navigation Chevron */}
      {showRight && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 p-0 rounded-full bg-background border-border/80 shadow-soft cursor-pointer flex items-center justify-center -mr-5 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
          aria-label="Scroll right"
        >
          <Icon name="chevronRight" className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
export default ProductCarousel;
