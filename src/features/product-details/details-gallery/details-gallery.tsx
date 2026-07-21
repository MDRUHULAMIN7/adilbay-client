'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';

interface DetailsGalleryProps {
  images: string[];
}

export function DetailsGallery({ images }: DetailsGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Large Display Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-card bg-muted/20 border border-border/40 shadow-soft">
        <Image
          src={images[activeIdx]}
          alt={`Product view ${activeIdx + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-none py-1">
          {images.map((img, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  'relative h-16 w-16 rounded-lg overflow-hidden border border-border/80 cursor-pointer shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isActive && 'ring-2 ring-primary ring-offset-1 border-primary'
                )}
                aria-label={`Show image view ${idx + 1}`}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill sizes="64px" className="object-cover" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default DetailsGallery;
