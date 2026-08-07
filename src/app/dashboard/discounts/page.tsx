'use client';

import React, { useState } from 'react';
import { BadgePercent, Plus, Search, Calendar, Zap, CheckCircle2, Eye, X } from 'lucide-react';
import { MOCK_DISCOUNTS } from '@/data/admin-mock-data';
import { AdminDiscount } from '@/types/admin';

export default function DiscountsPage() {
  const [discounts] = useState<AdminDiscount[]>(MOCK_DISCOUNTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscount, setSelectedDiscount] = useState<AdminDiscount | null>(null);

  const filtered = discounts.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <BadgePercent className="w-6 h-6 text-primary" />
            <span>Automatic Discount Campaigns</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure catalog-wide automatic discounts, seasonal events, and product bundle offers.
          </p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-xs flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:bg-brand-500 transition-all">
          <Plus className="w-4 h-4" />
          <span>New Discount Rule</span>
        </button>
      </div>

      {/* Filter */}
      <div className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search campaigns or targets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <span className="text-xs text-muted-foreground font-semibold">
          {filtered.length} Active Campaigns
        </span>
      </div>

      {/* Clean Data Table */}
      <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                <th className="py-3.5 px-4">Campaign Name</th>
                <th className="py-3.5 px-4">Target Scope</th>
                <th className="py-3.5 px-4">Discount</th>
                <th className="py-3.5 px-4">Orders Applied</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((disc) => (
                <tr key={disc.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-foreground">{disc.name}</td>
                  <td className="py-3.5 px-4 text-muted-foreground font-semibold">{disc.target}</td>
                  <td className="py-3.5 px-4 font-extrabold text-primary">{disc.discountValue}</td>
                  <td className="py-3.5 px-4 font-bold text-foreground">{disc.appliedCount} orders</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> {disc.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedDiscount(disc)}
                      className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                      title="View Campaign Details"
                    >
                      <Eye className="w-4 h-4 text-primary" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discount Modal */}
      {selectedDiscount && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-base font-bold font-display text-foreground">{selectedDiscount.name}</h2>
              <button onClick={() => setSelectedDiscount(null)} className="p-1.5 rounded-xl hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-muted/40 flex justify-between">
                <span>Discount Value:</span>
                <span className="font-bold text-primary font-display text-sm">{selectedDiscount.discountValue}</span>
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 flex justify-between">
                <span>Target Products:</span>
                <span className="font-bold text-foreground">{selectedDiscount.target}</span>
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 flex justify-between">
                <span>Rule Type:</span>
                <span className="font-semibold text-foreground uppercase">{selectedDiscount.type}</span>
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 flex justify-between">
                <span>Campaign Duration:</span>
                <span className="font-semibold text-foreground">{selectedDiscount.startDate} to {selectedDiscount.endDate}</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedDiscount(null)}
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
