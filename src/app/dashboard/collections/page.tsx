'use client';

import React, { useState } from 'react';
import { Layers, Plus, Search, Edit, Trash2, Tag, Eye, List, LayoutGrid, X } from 'lucide-react';
import { MOCK_COLLECTIONS } from '@/data/admin-mock-data';
import { AdminCollection } from '@/types/admin';

export default function CollectionsPage() {
  const [collections, setCollections] = useState<AdminCollection[]>(MOCK_COLLECTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedCollection, setSelectedCollection] = useState<AdminCollection | null>(null);

  const filtered = collections.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" />
            <span>Curated Furniture Collections</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage thematic design showcases, seasonal edits, and collection discount campaigns.
          </p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-xs flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:bg-brand-500 transition-all">
          <Plus className="w-4 h-4" />
          <span>New Collection</span>
        </button>
      </div>

      {/* Filter & View Mode */}
      <div className="p-4 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
          <span className="text-xs text-muted-foreground font-semibold">
            {filtered.length} Collections
          </span>

          <div className="flex items-center gap-1 p-1 bg-muted/50 border border-border rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                viewMode === 'table' ? 'bg-card text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="hidden md:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                viewMode === 'grid' ? 'bg-card text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden md:inline">Grid (3-4 Cols)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      {viewMode === 'table' ? (
        <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                  <th className="py-3.5 px-4">Collection Title</th>
                  <th className="py-3.5 px-4">URL Slug</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Promotion</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((col) => (
                  <tr key={col.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={col.bannerImage}
                          alt={col.name}
                          className="w-12 h-10 rounded-xl object-cover border border-border shrink-0"
                        />
                        <div>
                          <p className="font-bold text-foreground">{col.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate max-w-[200px]">{col.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-muted-foreground">/{col.slug}</td>
                    <td className="py-3.5 px-4 font-bold text-foreground">{col.productsCount} SKUs</td>
                    <td className="py-3.5 px-4">
                      {col.discountPercentage ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-destructive/15 text-destructive">
                          <Tag className="w-3 h-3" /> {col.discountPercentage}% OFF
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-[10px]">Standard Price</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
                        {col.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedCollection(col)}
                          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                          title="View Collection Details"
                        >
                          <Eye className="w-4 h-4 text-primary" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* 3-4 Column Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((col) => (
            <div
              key={col.id}
              className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={col.bannerImage}
                  alt={col.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 space-y-0.5">
                  <h3 className="text-base font-bold font-display text-white">{col.name}</h3>
                  <p className="text-[10px] text-white/80 line-clamp-1">{col.tagline}</p>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">{col.productsCount} Items</span>
                <button
                  onClick={() => setSelectedCollection(col)}
                  className="px-2 py-1 text-[10px] font-semibold bg-primary/10 text-primary rounded-lg"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedCollection && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-base font-bold font-display text-foreground">{selectedCollection.name}</h2>
              <button onClick={() => setSelectedCollection(null)} className="p-1.5 rounded-xl hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={selectedCollection.bannerImage}
              alt={selectedCollection.name}
              className="w-full h-36 object-cover rounded-2xl border border-border"
            />
            <div className="space-y-2 text-xs">
              <p className="text-muted-foreground">{selectedCollection.tagline}</p>
              <div className="p-3 rounded-2xl bg-muted/40 flex justify-between items-center">
                <span>Products Count:</span>
                <span className="font-bold text-foreground">{selectedCollection.productsCount} SKUs</span>
              </div>
              {selectedCollection.discountPercentage && (
                <div className="p-3 rounded-2xl bg-destructive/10 text-destructive flex justify-between items-center font-bold">
                  <span>Collection Discount:</span>
                  <span>{selectedCollection.discountPercentage}% OFF</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setSelectedCollection(null)}
              className="w-full py-2.5 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-brand-500"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
