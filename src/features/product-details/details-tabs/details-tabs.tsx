'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/types/product';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/cn';

interface DetailsTabsProps {
  product: Product;
  className?: string;
}

type TabType = 'overview' | 'specifications' | 'care' | 'shipping';

interface TabItem {
  id: TabType;
  label: string;
  icon: string;
  badge?: string | number;
}

export function DetailsTabs({ product, className }: DetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [specSearch, setSpecSearch] = useState('');
  const { toast } = useToast();

  const tabs: TabItem[] = [
    { id: 'overview', label: 'Overview & Craftsmanship', icon: 'info' },
    { id: 'specifications', label: 'Technical Specifications', icon: 'sliders', badge: product.specifications.length },
    { id: 'care', label: 'Care & Maintenance', icon: 'shieldCheck' },
    { id: 'shipping', label: 'Shipping & Warranty', icon: 'truck' },
  ];

  // Combine default specs with extra standardized specs for rich display
  const allSpecifications = useMemo(() => {
    const rawSpecs = product.specifications || [];
    
    const existingLabels = new Set(rawSpecs.map((s) => s.label.toLowerCase()));

    const extraSpecs = [
      { label: 'Category', value: product.category.toUpperCase(), category: 'General' },
      { label: 'Brand / Studio', value: product.brand, category: 'General' },
      { label: 'Primary Timber', value: product.materials.join(', ') || 'Solid Wood', category: 'Materials' },
      { label: 'Timber Seasoning', value: 'Vacuum Kiln Dried (8-12% MC)', category: 'Craftsmanship' },
      { label: 'Joinery Type', value: 'Mortise & Tenon Structural Joinery', category: 'Craftsmanship' },
      { label: 'Surface Coating', value: 'Eco-Friendly Natural Danish Oil', category: 'Finish' },
      { label: 'FSC Certification', value: '100% Sustainably Sourced Wood', category: 'Certifications' },
      { label: 'Structural Warranty', value: '10-Year Limited Warranty', category: 'Warranty' },
    ];

    const combined = [...rawSpecs.map((s) => ({ ...s, category: s.category || 'Dimensions & Physical' }))];
    
    extraSpecs.forEach((extra) => {
      if (!existingLabels.has(extra.label.toLowerCase())) {
        combined.push(extra);
      }
    });

    return combined;
  }, [product]);

  // Filtered specs by search query
  const filteredSpecs = useMemo(() => {
    if (!specSearch.trim()) return allSpecifications;
    const query = specSearch.toLowerCase();
    return allSpecifications.filter(
      (spec) =>
        spec.label.toLowerCase().includes(query) ||
        spec.value.toLowerCase().includes(query) ||
        (spec.category && spec.category.toLowerCase().includes(query))
    );
  }, [allSpecifications, specSearch]);

  const handleCopySpecs = () => {
    const specsText = allSpecifications.map((s) => `${s.label}: ${s.value}`).join('\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${product.title} - Technical Specifications:\n\n` + specsText);
      toast({
        type: 'success',
        title: 'Specifications Copied',
        message: 'Product specifications copied to clipboard.',
      });
    }
  };

  const craftsmanshipPillars = [
    {
      icon: 'shieldCheck',
      title: 'Kiln-Dried Timber Seasoning',
      description: 'Wood timber undergoes precision vacuum kiln drying to 8-12% moisture content, preventing warping, shrinkage, or seasonal splitting.',
    },
    {
      icon: 'sparkles',
      title: 'Mortise & Tenon Joinery',
      description: 'Hand-carved interlocking wooden joints built by master artisans without reliance on visible screws, ensuring lifetime rigidity.',
    },
    {
      icon: 'star',
      title: 'Organic Danish Oil Finish',
      description: 'Protected with non-toxic, eco-friendly matte oil that brings out natural grain highlights while letting the solid wood breathe.',
    },
    {
      icon: 'rotateCcw',
      title: 'Generational Durability',
      description: 'Designed and crafted to endure high-volume daily use while aging gracefully with a rich natural timber patina over decades.',
    },
  ];

  const defaultCareInstructions = [
    {
      title: 'Dust Regularly',
      text: 'Wipe down surfaces using a dry or slightly damp lint-free microfiber cloth along the grain line.',
    },
    {
      title: 'Control Ambient Humidity',
      text: 'Maintain indoor relative humidity between 35%-55% to protect wood fiber elasticity.',
    },
    {
      title: 'Avoid Direct Sun & Heat',
      text: 'Keep furniture away from direct intense sunlight and heating units to prevent surface tone fading.',
    },
    {
      title: 'Re-Oil Periodically',
      text: 'Apply natural Danish oil or beeswax finish once every 6 to 12 months to nourish timber fibers.',
    },
    {
      title: 'Use Protective Coasters',
      text: 'Always use felt pads under hot serving items, wet glasses, or heavy ceramic centerpieces.',
    },
  ];

  return (
    <div className={cn('w-full flex flex-col gap-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 bg-card text-foreground p-6 sm:p-10 shadow-sm transition-colors', className)}>
      {/* Tabs Header */}
      <div className="flex flex-col gap-4 border-b border-stone-200/80 dark:border-stone-800 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <Heading level={3} className="font-display font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 tracking-tight">
              Product Overview & Specifications
            </Heading>
            <Text className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm mt-1">
              Explore craft details, dimensions, maintenance guidelines, and structural warranty information.
            </Text>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <div
          role="tablist"
          aria-label="Product Details Tabs"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 pb-1 border-t border-stone-200/40 dark:border-stone-800/60"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]'
                    : 'bg-stone-100 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-foreground'
                )}
              >
                <Icon name={tab.icon} className={cn('h-4 w-4 shrink-0', isActive ? 'text-primary-foreground' : 'text-stone-600 dark:text-stone-300')} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={cn(
                      'px-1.5 py-0.5 text-[10px] rounded-full font-bold ml-1',
                      isActive ? 'bg-white/20 text-white' : 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200'
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels Content */}
      <div className="w-full">
        {/* PANEL 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" className="flex flex-col gap-8 animate-fadeIn">
            {/* Extended Narrative */}
            <div className="flex flex-col gap-4 text-left">
              <Heading level={4} className="font-display font-semibold text-lg text-stone-900 dark:text-stone-100">
                Crafted for Elegance and Longevity
              </Heading>
              <Text className="text-stone-700 dark:text-stone-200 text-sm sm:text-base leading-relaxed">
                {product.longDescription ||
                  product.description ||
                  `The ${product.title} represents the apex of solid wood artisan craftsmanship. Expertly shaped from hand-selected ${product.materials.join(
                    ' and '
                  )}, every detail balances ergonomic utility with refined aesthetic warmth.`}
              </Text>
              <Text className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed">
                Designed by {product.brand}&apos;s seasoned woodworking studio, this piece utilizes slow-seasoned timber treated to withstand fluctuating humidity without compromising frame stability or organic surface grain consistency.
              </Text>
            </div>

            {/* Craftsmanship Pillars Grid */}
            <div className="flex flex-col gap-4 text-left">
              <Heading level={4} className="font-display font-semibold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Signature Craft Highlights
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {craftsmanshipPillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 hover:border-primary/40 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary shrink-0">
                      <Icon name={pillar.icon} className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-sm text-stone-900 dark:text-stone-100">{pillar.title}</span>
                      <span className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">{pillar.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Features List if present */}
            {product.features && product.features.length > 0 && (
              <div className="flex flex-col gap-3 text-left">
                <Heading level={4} className="font-display font-semibold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                  Key Specifications & Features
                </Heading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feat) => (
                    <div key={feat.title} className="flex items-center gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                      <Icon name="check" className="h-4 w-4 text-primary shrink-0 stroke-[3px]" />
                      <div>
                        <strong className="text-stone-900 dark:text-stone-100">{feat.title}:</strong> {feat.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PANEL 2: TECHNICAL SPECIFICATIONS */}
        {activeTab === 'specifications' && (
          <div id="panel-specifications" role="tabpanel" aria-labelledby="tab-specifications" className="flex flex-col gap-6 animate-fadeIn">
            {/* Search & Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500 dark:text-stone-400" />
                <input
                  type="text"
                  placeholder="Search specs (e.g. Dimensions, Finish)..."
                  value={specSearch}
                  onChange={(e) => setSpecSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 dark:border-stone-800 bg-background text-stone-900 dark:text-stone-100 placeholder:text-stone-500 dark:placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
                {specSearch && (
                  <button
                    onClick={() => setSpecSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-foreground text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleCopySpecs}
                className="w-full sm:w-auto text-xs gap-2 rounded-xl border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer text-stone-800 dark:text-stone-200"
              >
                <Icon name="share" className="h-3.5 w-3.5 text-primary" />
                <span>Copy Specifications</span>
              </Button>
            </div>

            {/* Specifications Table */}
            {filteredSpecs.length > 0 ? (
              <div className="border border-stone-200/80 dark:border-stone-800 rounded-2xl overflow-hidden shadow-xs">
                <div className="grid grid-cols-1 divide-y divide-stone-200/80 dark:divide-stone-800 text-left">
                  {filteredSpecs.map((spec, idx) => (
                    <div
                      key={`${spec.label}-${idx}`}
                      className={cn(
                        'grid grid-cols-1 sm:grid-cols-12 p-3.5 sm:p-4 text-xs sm:text-sm transition-colors hover:bg-stone-100/50 dark:hover:bg-stone-800/50',
                        idx % 2 === 0 ? 'bg-stone-50/70 dark:bg-stone-900/40' : 'bg-background dark:bg-stone-950/60'
                      )}
                    >
                      <div className="sm:col-span-4 font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-2">
                        {spec.category && (
                          <span className="text-[10px] uppercase font-bold text-primary bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded-md">
                            {spec.category}
                          </span>
                        )}
                        <span>{spec.label}</span>
                      </div>
                      <div className="sm:col-span-8 font-bold text-stone-900 dark:text-stone-100 mt-1 sm:mt-0 flex items-center justify-start sm:justify-end">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed border-stone-200 dark:border-stone-800 rounded-2xl text-stone-600 dark:text-stone-300 text-xs sm:text-sm">
                No matching specifications found for &quot;{specSearch}&quot;.
              </div>
            )}
          </div>
        )}

        {/* PANEL 3: CARE & MAINTENANCE */}
        {activeTab === 'care' && (
          <div id="panel-care" role="tabpanel" aria-labelledby="tab-care" className="flex flex-col gap-6 animate-fadeIn text-left">
            <div className="flex flex-col gap-2">
              <Heading level={4} className="font-display font-semibold text-lg text-stone-900 dark:text-stone-100">
                Solid Wood Preservation Guidelines
              </Heading>
              <Text className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm">
                Follow these simple care recommendations to maintain your timber furniture in pristine heritage condition.
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {defaultCareInstructions.map((item, index) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 relative overflow-hidden"
                >
                  <span className="h-7 w-7 rounded-lg bg-primary/15 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                    0{index + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">{item.title}</span>
                    <span className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
              <Icon name="alertCircle" className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <p className="text-xs text-amber-900 dark:text-amber-200">
                <strong>Pro Tip:</strong> Natural wood reacts to indoor weather changes. Minor seasonal grain movement is normal for authentic solid timber and signifies genuine unadulterated wood.
              </p>
            </div>
          </div>
        )}

        {/* PANEL 4: SHIPPING & WARRANTY */}
        {activeTab === 'shipping' && (
          <div id="panel-shipping" role="tabpanel" aria-labelledby="tab-shipping" className="flex flex-col gap-6 animate-fadeIn text-left">
            <div className="flex flex-col gap-2">
              <Heading level={4} className="font-display font-semibold text-lg text-stone-900 dark:text-stone-100">
                Delivery Tiers & Guarantee Policy
              </Heading>
              <Text className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm">
                Furnixo handles every item with white-glove packaging and insured logistics transport.
              </Text>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 flex flex-col gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                  <Icon name="truck" className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">Countrywide Express Logistics</span>
                <span className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  Delivered safely to your doorstep within 3-5 business days in Dhaka, and 5-7 days nationwide.
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 flex flex-col gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                  <Icon name="shieldCheck" className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">10-Year Timber Warranty</span>
                <span className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  Includes full repair or replacement coverage against structural joinery failure or wood seasoning defects.
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 flex flex-col gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                  <Icon name="rotateCcw" className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">7-Day Inspection Return</span>
                <span className="text-[12px] text-stone-600 dark:text-stone-300 leading-relaxed">
                  If the piece arrives with any transit damage or specification mismatch, return or exchange hassle-free.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailsTabs;
