'use client';

import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from '../../ui/modal';
import { Input } from '../../ui/input';
import { Text } from '../../ui/text';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { Illustration } from '../../ui/illustration';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { TRENDING_SEARCHES, POPULAR_CATEGORIES, QUICK_LINKS } from '@/config/search';
import { analytics } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { searches, addSearch, removeSearch, clearSearches } = useRecentSearches();

  // Reset selected item index on query change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  // Aggregate items when query is empty for arrow key selection
  const searchableSections = [
    ...searches.map((s) => ({ type: 'recent', label: s, href: `/shop?query=${encodeURIComponent(s)}` })),
    ...POPULAR_CATEGORIES.map((c) => ({ type: 'category', label: c.label, href: c.href })),
    ...QUICK_LINKS.map((q) => ({ type: 'link', label: q.label, href: q.href })),
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % searchableSections.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + searchableSections.length) % searchableSections.length
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < searchableSections.length) {
        const selected = searchableSections[selectedIndex];
        if (selected.type === 'recent') {
          addSearch(selected.label);
        }
        analytics.trackSearch(selected.label);
        router.push(selected.href);
        onClose();
      } else if (query.trim()) {
        addSearch(query);
        analytics.trackSearch(query);
        router.push(`/shop?query=${encodeURIComponent(query)}`);
        onClose();
      }
    }
  };

  const handleSelectQuery = (term: string) => {
    addSearch(term);
    analytics.trackSearch(term);
    setQuery(term);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalHeader className="border-none pb-0">
        <div className="flex flex-col gap-2 w-full pt-2">
          <Input
            prefix={<Icon name="search" className="h-4 w-4" />}
            placeholder="Search premium wood furniture or help..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            id="global-search-input"
            autoFocus
            className="rounded-lg text-sm bg-muted/20"
          />
          <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1">
            <span>Use ↑↓ keys to select, Esc to exit</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[9px] font-medium opacity-100">
              <span>Ctrl+K</span>
            </kbd>
          </div>
        </div>
      </ModalHeader>
      <ModalBody className="pt-4 flex flex-col gap-6 max-h-[60vh] overflow-y-auto">
        {query ? (
          <Illustration
            variant="search"
            title={`No results for "${query}"`}
            description="Our live search integration launches in Phase 4. Try looking for walnut wood collections or bedside tables."
          />
        ) : (
          <>
            {/* Trending Tags */}
            <div className="flex flex-col gap-2">
              <Text className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Trending Searches
              </Text>
              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSelectQuery(tag)}
                    className="cursor-pointer focus-visible:outline-none"
                  >
                    <Badge
                      variant="soft"
                      className="hover:bg-primary/10 transition-colors text-xs font-semibold py-1 px-3"
                    >
                      {tag}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Combined Searches List with Keyboard navigability */}
            <div className="flex flex-col gap-4">
              {searches.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <Text className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Recent Searches
                    </Text>
                    <button
                      onClick={clearSearches}
                      className="text-[10px] text-primary hover:underline font-semibold focus-visible:outline-none cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    {searches.map((s, idx) => {
                      const isHighlighted = selectedIndex === idx;
                      return (
                        <div
                          key={s}
                          className={cn(
                            'flex items-center justify-between p-2 rounded-lg transition-colors text-xs font-semibold',
                            isHighlighted
                              ? 'bg-surface text-primary shadow-flat'
                              : 'hover:bg-muted/40 text-stone-750 dark:text-stone-300'
                          )}
                        >
                          <Link
                            href={`/shop?query=${encodeURIComponent(s)}`}
                            onClick={() => {
                              addSearch(s);
                              analytics.trackSearch(s);
                              onClose();
                            }}
                            className="flex items-center gap-2 flex-1 focus-visible:outline-none"
                          >
                            <Icon name="spinner" className="h-3.5 w-3.5 text-muted-foreground/60" />
                            <span>{s}</span>
                          </Link>
                          <button
                            onClick={() => removeSearch(s)}
                            className="text-muted-foreground hover:text-destructive p-1 focus-visible:outline-none cursor-pointer"
                            aria-label={`Remove search query ${s}`}
                          >
                            <Icon name="close" className="h-3 w-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Popular Categories */}
              <div className="flex flex-col gap-1.5">
                <Text className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Popular Categories
                </Text>
                <div className="flex flex-col gap-1">
                  {POPULAR_CATEGORIES.map((item, idx) => {
                    const absoluteIdx = searches.length + idx;
                    const isHighlighted = selectedIndex === absoluteIdx;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => {
                          analytics.trackSearch(item.label);
                          onClose();
                        }}
                        className={cn(
                          'flex items-center gap-2 p-2 rounded-lg transition-colors text-xs font-semibold focus-visible:outline-none',
                          isHighlighted
                            ? 'bg-surface text-primary shadow-flat'
                            : 'hover:bg-muted/40 text-stone-750 dark:text-stone-300'
                        )}
                      >
                        <Icon name="arrowRight" className="h-3.5 w-3.5 text-muted-foreground/60" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col gap-1.5">
                <Text className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Quick Navigation Links
                </Text>
                <div className="flex flex-col gap-1">
                  {QUICK_LINKS.map((item, idx) => {
                    const absoluteIdx = searches.length + POPULAR_CATEGORIES.length + idx;
                    const isHighlighted = selectedIndex === absoluteIdx;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => {
                          analytics.trackSearch(item.label);
                          onClose();
                        }}
                        className={cn(
                          'flex items-center gap-2 p-2 rounded-lg transition-colors text-xs font-semibold focus-visible:outline-none',
                          isHighlighted
                            ? 'bg-surface text-primary shadow-flat'
                            : 'hover:bg-muted/40 text-stone-750 dark:text-stone-300'
                        )}
                      >
                        <Icon name="laptop" className="h-3.5 w-3.5 text-muted-foreground/60" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </ModalBody>
    </Modal>
  );
}
export default CommandPalette;
