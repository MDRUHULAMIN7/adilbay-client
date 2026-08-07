'use client';

import React, { useState } from 'react';
import { Building2, Plus, Search, Edit, Trash2, Star, Globe, CheckCircle2, List, LayoutGrid, Eye, X } from 'lucide-react';
import { MOCK_BRANDS } from '@/data/admin-mock-data';
import { AdminBrand } from '@/types/admin';

export default function BrandsPage() {
  const [brands, setBrands] = useState<AdminBrand[]>(MOCK_BRANDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedBrand, setSelectedBrand] = useState<AdminBrand | null>(null);

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            <span>Furniture Brands & Partners</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage official manufacturer partnerships, brand origins, and product counts.
          </p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-xs flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:bg-brand-500 transition-all">
          <Plus className="w-4 h-4" />
          <span>Add Brand Partner</span>
        </button>
      </div>

      {/* Filter & View Mode */}
      <div className="p-4 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search brand or origin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
          <span className="text-xs text-muted-foreground font-semibold">
            {filtered.length} Partners
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
              <span className="hidden md:inline">Grid (4 Cols)</span>
            </button>
          </div>
        </div>
      </div>

      {/* View Mode: Data Table */}
      {viewMode === 'table' ? (
        <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                  <th className="py-3.5 px-4">Brand Partner</th>
                  <th className="py-3.5 px-4">Country of Origin</th>
                  <th className="py-3.5 px-4">Catalog SKUs</th>
                  <th className="py-3.5 px-4">Partner Score</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((brand) => (
                  <tr key={brand.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-800 to-brand-600 text-white font-display font-extrabold text-xs flex items-center justify-center shrink-0">
                          {brand.logo}
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{brand.name}</p>
                          <p className="text-[10px] text-muted-foreground">/{brand.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground flex items-center gap-1 pt-4">
                      <Globe className="w-3.5 h-3.5 text-primary" /> {brand.country}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-foreground">{brand.productsCount} SKUs</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{brand.rating}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" /> Active Partner
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedBrand(brand)}
                          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                          title="View Brand Details"
                        >
                          <Eye className="w-4 h-4 text-primary" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                          <Edit className="w-4 h-4" />
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
        /* 4 Columns Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((brand) => (
            <div
              key={brand.id}
              className="p-5 rounded-3xl bg-card border border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-800 to-brand-600 text-white font-display font-extrabold text-sm flex items-center justify-center">
                  {brand.logo}
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  Active
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-foreground">{brand.name}</h3>
                <p className="text-xs text-muted-foreground">{brand.country}</p>
              </div>
              <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">{brand.productsCount} SKUs</span>
                <button
                  onClick={() => setSelectedBrand(brand)}
                  className="px-2 py-1 text-[10px] font-semibold bg-primary/10 text-primary rounded-lg"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Brand Modal */}
      {selectedBrand && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-800 to-brand-600 text-white font-display font-extrabold text-sm flex items-center justify-center">
                  {selectedBrand.logo}
                </div>
                <div>
                  <h2 className="text-base font-bold font-display text-foreground">{selectedBrand.name}</h2>
                  <p className="text-xs text-muted-foreground font-mono">/{selectedBrand.slug}</p>
                </div>
              </div>
              <button onClick={() => setSelectedBrand(null)} className="p-1.5 rounded-xl hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-muted/40 flex justify-between">
                <span>Country of Origin:</span>
                <span className="font-bold text-foreground">{selectedBrand.country}</span>
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 flex justify-between">
                <span>Catalog Allocation:</span>
                <span className="font-bold text-foreground">{selectedBrand.productsCount} SKUs</span>
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 flex justify-between">
                <span>Partner Quality Score:</span>
                <span className="font-bold text-amber-500 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500" /> {selectedBrand.rating} / 5.0
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedBrand(null)}
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
