'use client';

import React, { useState } from 'react';
import {
  FolderTree,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  LayoutGrid,
  List,
  X
} from 'lucide-react';
import { MOCK_CATEGORIES } from '@/data/admin-mock-data';
import { AdminCategory } from '@/types/admin';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>(MOCK_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedCategory, setSelectedCategory] = useState<AdminCategory | null>(null);

  const toggleStatus = (id: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'hidden' : 'active' } : c
      )
    );
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <FolderTree className="w-6 h-6 text-primary" />
            <span>Furniture Categories</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage furniture departments, taxonomy, and front-store department navigation.
          </p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-xs flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:bg-brand-500 transition-all">
          <Plus className="w-4 h-4" />
          <span>Create Category</span>
        </button>
      </div>

      {/* Filter & View Mode Toggle */}
      <div className="p-4 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search categories or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
          <span className="text-xs text-muted-foreground font-semibold">
            {filtered.length} Departments
          </span>

          <div className="flex items-center gap-1 p-1 bg-muted/50 border border-border rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'table'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
              <span className="hidden md:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Grid View (3-4 Columns)"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden md:inline">Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Table View */}
      {viewMode === 'table' ? (
        <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                  <th className="py-3.5 px-4">Department Name</th>
                  <th className="py-3.5 px-4">URL Slug</th>
                  <th className="py-3.5 px-4">Products</th>
                  <th className="py-3.5 px-4">Subcategories</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((cat) => (
                  <tr key={cat.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-10 h-10 rounded-xl object-cover border border-border shrink-0"
                        />
                        <div>
                          <p className="font-bold text-foreground">{cat.name}</p>
                          {cat.featured && (
                            <span className="text-[10px] text-primary font-semibold flex items-center gap-0.5">
                              <Sparkles className="w-3 h-3" /> Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-muted-foreground">/{cat.slug}</td>
                    <td className="py-3.5 px-4 font-bold text-foreground">{cat.productsCount} items</td>
                    <td className="py-3.5 px-4 font-semibold text-muted-foreground">{cat.subcategoriesCount} sub-items</td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleStatus(cat.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          cat.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {cat.status === 'active' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {cat.status.toUpperCase()}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedCategory(cat)}
                          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                          title="View Category Details Modal"
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
        /* Grid View: Clean 3 or 4 columns */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((cat) => (
            <div
              key={cat.id}
              className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-base font-bold font-display text-white">{cat.name}</h3>
                  <p className="text-[10px] text-white/80 font-mono">/{cat.slug}</p>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Products:</span>
                  <span className="font-bold text-foreground">{cat.productsCount}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Subcategories:</span>
                  <span className="font-bold text-foreground">{cat.subcategoriesCount}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className="px-2.5 py-1 rounded-xl bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20"
                  >
                    Details
                  </button>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Details Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCategory.image}
                  alt={selectedCategory.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-border"
                />
                <div>
                  <h2 className="text-base font-bold font-display text-foreground">{selectedCategory.name}</h2>
                  <p className="text-xs text-muted-foreground font-mono">/{selectedCategory.slug}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="p-2 rounded-xl text-muted-foreground hover:bg-muted"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-muted/40 text-center">
                  <span className="text-lg font-bold text-foreground block">{selectedCategory.productsCount}</span>
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Active Products</span>
                </div>
                <div className="p-3 rounded-2xl bg-muted/40 text-center">
                  <span className="text-lg font-bold text-foreground block">{selectedCategory.subcategoriesCount}</span>
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Subcategories</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-muted/40 space-y-1">
                <p className="font-bold text-foreground">Department Info</p>
                <p className="text-muted-foreground">Status: <span className="font-semibold text-foreground uppercase">{selectedCategory.status}</span></p>
                <p className="text-muted-foreground">Featured Department: <span className="font-semibold text-foreground">{selectedCategory.featured ? 'Yes' : 'No'}</span></p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCategory(null)}
              className="w-full py-2.5 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-brand-500 transition-colors"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
