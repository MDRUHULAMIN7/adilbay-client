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
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  if (!images || images.length === 0) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col gap-4 w-full select-none">
      {/* 1. Main Display Container with High-Precision Mouse Hover Zoom */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-3xl bg-stone-100 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xl group cursor-crosshair"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsZoomOpen(true)}
      >
        <Image
          src={images[activeIdx]}
          alt={`Product view ${activeIdx + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          priority
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
          }}
          className={cn(
            'object-cover transition-transform duration-300 ease-out select-none pointer-events-none',
            isHovered ? 'scale-135 sm:scale-145' : 'scale-100'
          )}
        />

        {/* Hover / Zoom Instruction Pill */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 pointer-events-none">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/80 dark:bg-stone-950/80 text-white text-[11px] font-semibold backdrop-blur-md border border-white/20 shadow-md">
            <Icon name="search" className="h-3.5 w-3.5 text-primary" />
            {isHovered ? 'Move to Explore Details' : 'Hover to Zoom'}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomOpen(true);
            }}
            className="pointer-events-auto bg-stone-900/80 hover:bg-stone-950 text-white backdrop-blur-md border border-white/20 p-2 rounded-xl shadow-md transition-all cursor-pointer hover:scale-105"
            aria-label="Expand fullscreen zoom"
          >
            <Icon name="externalLink" className="h-4 w-4 text-primary" />
          </button>
        </div>

        {/* Next / Prev Quick Navigation Overlay */}
        {images.length > 1 && (
          <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="pointer-events-auto h-10 w-10 rounded-full bg-white/90 dark:bg-stone-900/90 hover:bg-primary hover:text-primary-foreground text-foreground border border-stone-200 dark:border-stone-700 flex items-center justify-center transition-all shadow-lg cursor-pointer"
              aria-label="Previous image"
            >
              <Icon name="chevronLeft" className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="pointer-events-auto h-10 w-10 rounded-full bg-white/90 dark:bg-stone-900/90 hover:bg-primary hover:text-primary-foreground text-foreground border border-stone-200 dark:border-stone-700 flex items-center justify-center transition-all shadow-lg cursor-pointer"
              aria-label="Next image"
            >
              <Icon name="chevronRight" className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* 2. Interactive Thumbnails Carousel */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-none py-1">
          {images.map((img, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  'relative h-20 w-20 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 cursor-pointer shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isActive ? 'ring-2 ring-primary border-primary shadow-md scale-102' : 'opacity-70 hover:opacity-100'
                )}
                aria-label={`Show image view ${idx + 1}`}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill sizes="80px" className="object-cover" />
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Fullscreen Lightbox Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsZoomOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-primary bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer z-30"
            aria-label="Close zoom modal"
          >
            <Icon name="close" className="h-6 w-6" />
          </button>

          {/* Modal Image Display */}
          <div
            className="relative w-full max-w-5xl h-[75vh] sm:h-[85vh] rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIdx]}
              alt={`Zoom view ${activeIdx + 1}`}
              fill
              priority
              sizes="1400px"
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
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-all cursor-pointer z-30"
                aria-label="Previous zoom image"
              >
                <Icon name="chevronLeft" className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 sm:left-auto sm:right-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-all cursor-pointer z-30"
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
