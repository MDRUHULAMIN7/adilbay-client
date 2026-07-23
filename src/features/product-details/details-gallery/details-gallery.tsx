'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

interface DetailsGalleryProps {
  images: string[];
}

export function DetailsGallery({ images }: DetailsGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col gap-4 w-full select-none">
      {/* Large Display Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted/20 border border-border/40 shadow-soft group">
        <Image
          src={images[activeIdx]}
          alt={`Product view ${activeIdx + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-103"
          priority
          onClick={() => setIsZoomOpen(true)}
        />

        {/* Zoom Trigger Pill */}
        <button
          onClick={() => setIsZoomOpen(true)}
          className="absolute top-4 right-4 bg-background/80 hover:bg-background backdrop-blur-md border border-border/60 text-foreground p-2 rounded-xl shadow-md transition-all cursor-pointer hover:scale-105 flex items-center gap-1.5 text-xs font-bold px-3"
          aria-label="Zoom image"
        >
          <Icon name="search" className="h-3.5 w-3.5" />
          <span>Zoom</span>
        </button>

        {/* Next / Prev Navigation Buttons */}
        {images.length > 1 && (
          <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="pointer-events-auto h-9 w-9 rounded-xl bg-background/90 hover:bg-primary hover:text-primary-foreground text-foreground border border-border/60 flex items-center justify-center transition-all shadow-md cursor-pointer"
              aria-label="Previous image"
            >
              <Icon name="chevronLeft" className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="pointer-events-auto h-9 w-9 rounded-xl bg-background/90 hover:bg-primary hover:text-primary-foreground text-foreground border border-border/60 flex items-center justify-center transition-all shadow-md cursor-pointer"
              aria-label="Next image"
            >
              <Icon name="chevronRight" className="h-4 w-4" />
            </button>
          </div>
        )}
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
                  'relative h-20 w-20 rounded-xl overflow-hidden border border-border/80 cursor-pointer shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isActive && 'ring-2 ring-primary ring-offset-2 border-primary shadow-sm scale-102'
                )}
                aria-label={`Show image view ${idx + 1}`}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill sizes="80px" className="object-cover" />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox / Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-modal bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsZoomOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-stone-300 bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all cursor-pointer"
            aria-label="Close zoom modal"
          >
            <Icon name="close" className="h-6 w-6" />
          </button>

          {/* Modal Image Display */}
          <div
            className="relative w-full max-w-4xl h-[75vh] sm:h-[85vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIdx]}
              alt={`Zoom view ${activeIdx + 1}`}
              fill
              priority
              sizes="1200px"
              className="object-contain"
            />
          </div>

          {/* Lightbox Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous zoom image"
              >
                <Icon name="chevronLeft" className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next zoom image"
              >
                <Icon name="chevronRight" className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default DetailsGallery;
