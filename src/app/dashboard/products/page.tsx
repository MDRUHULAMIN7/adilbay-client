'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Plus,
  Search,
  Filter,
  Star,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/admin-mock-data';
import { AdminProduct } from '@/types/admin';

export default function ProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            <span>Furniture Products Catalog</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your furniture catalog, edit pricing, update stock levels, and toggle featured showcases.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-xs flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:bg-brand-500 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Furniture</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-card border border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search title, SKU, or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs bg-muted/40 border border-border rounded-xl text-foreground focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Living Room">Living Room</option>
            <option value="Dining Room">Dining Room</option>
            <option value="Home Office">Home Office</option>
            <option value="Storage">Storage</option>
            <option value="Outdoor">Outdoor</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-muted/40 border border-border rounded-xl text-foreground focus:outline-none"
          >
            <option value="all">All Stock Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>

          <span className="text-xs text-muted-foreground font-medium pl-2">
            Showing {filteredProducts.length} items
          </span>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                <th className="py-3.5 px-4">Item Details</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Category / Brand</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock Status</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-12 h-12 rounded-xl object-cover border border-border shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-foreground text-xs">{product.title}</p>
                        <div className="flex items-center gap-1 text-[10px] text-amber-500 mt-0.5">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span className="font-semibold">{product.rating}</span>
                          <span className="text-muted-foreground">({product.salesCount} sold)</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-muted-foreground">{product.sku}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-foreground">{product.category}</p>
                    <p className="text-[10px] text-muted-foreground">{product.brand}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-foreground">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-muted-foreground line-through block">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        product.status === 'in_stock'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : product.status === 'low_stock'
                          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                          : 'bg-destructive/15 text-destructive'
                      }`}
                    >
                      {product.status === 'in_stock' && <CheckCircle2 className="w-3 h-3" />}
                      {product.status === 'low_stock' && <AlertCircle className="w-3 h-3" />}
                      {product.status === 'out_of_stock' && <XCircle className="w-3 h-3" />}
                      {product.status === 'in_stock'
                        ? `In Stock (${product.stock})`
                        : product.status === 'low_stock'
                        ? `Low Stock (${product.stock})`
                        : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleFeatured(product.id)}
                      className={`p-1.5 rounded-xl border transition-all ${
                        product.featured
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-muted/40 border-border text-muted-foreground hover:text-foreground'
                      }`}
                      title={product.featured ? 'Featured on Store' : 'Click to feature'}
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
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

      {/* Add Product Modal Mock */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <h2 className="text-lg font-bold font-display text-foreground">Add New Furniture Product</h2>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Italian Leather Recliner Armchair"
                  className="w-full px-3 py-2 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">SKU</label>
                  <input
                    type="text"
                    placeholder="FN-AC-500"
                    className="w-full px-3 py-2 bg-muted/40 border border-border rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Price ($)</label>
                  <input
                    type="number"
                    placeholder="899"
                    className="w-full px-3 py-2 bg-muted/40 border border-border rounded-xl focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-muted text-foreground hover:bg-muted/80"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-brand-500"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
