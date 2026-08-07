'use client';

import React, { useState } from 'react';
import { Ticket, Plus, Search, Copy, Check, Calendar, Tag, Trash2, Eye, X } from 'lucide-react';
import { MOCK_COUPONS } from '@/data/admin-mock-data';
import { AdminCoupon } from '@/types/admin';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>(MOCK_COUPONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<AdminCoupon | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'active' ? 'disabled' : 'active' }
          : c
      )
    );
  };

  const filtered = coupons.filter((c) =>
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Ticket className="w-6 h-6 text-primary" />
            <span>Promo Coupons & Voucher Codes</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Create promotional checkout voucher codes, spend limits, and track redemption metrics.
          </p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-xs flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:bg-brand-500 transition-all">
          <Plus className="w-4 h-4" />
          <span>Create Coupon Code</span>
        </button>
      </div>

      {/* Filter */}
      <div className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search coupon code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <span className="text-xs text-muted-foreground font-semibold">
          {filtered.length} Active Vouchers
        </span>
      </div>

      {/* Clean Coupons Data Table */}
      <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                <th className="py-3.5 px-4">Coupon Code</th>
                <th className="py-3.5 px-4">Discount Value</th>
                <th className="py-3.5 px-4">Min Spend</th>
                <th className="py-3.5 px-4">Redemptions</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-xl bg-primary/10 text-primary font-mono font-extrabold text-xs border border-primary/20 flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {c.code}
                      </span>
                      <button
                        onClick={() => copyCode(c.code)}
                        className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="Copy Code"
                      >
                        {copiedCode === c.code ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground">
                    {c.type === 'percentage' ? `${c.value}% OFF` : `$${c.value} FLAT`}
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground font-semibold">
                    {c.minPurchase ? `$${c.minPurchase}` : 'No Minimum'}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground">
                    {c.usageCount} times {c.usageLimit ? `/ ${c.usageLimit}` : ''}
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">{c.expiryDate}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleStatus(c.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {c.status.toUpperCase()}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedCoupon(c)}
                        className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="View Coupon Details"
                      >
                        <Eye className="w-4 h-4 text-primary" />
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

      {/* Coupon Modal */}
      {selectedCoupon && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="px-3 py-1 rounded-xl bg-primary/10 text-primary font-mono font-extrabold text-sm border border-primary/20">
                {selectedCoupon.code}
              </span>
              <button onClick={() => setSelectedCoupon(null)} className="p-1.5 rounded-xl hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-muted/40 flex justify-between">
                <span>Discount Offer:</span>
                <span className="font-bold text-foreground font-display text-sm">
                  {selectedCoupon.type === 'percentage' ? `${selectedCoupon.value}% OFF` : `$${selectedCoupon.value} FLAT`}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 flex justify-between">
                <span>Minimum Spend:</span>
                <span className="font-bold text-foreground">{selectedCoupon.minPurchase ? `$${selectedCoupon.minPurchase}` : 'None'}</span>
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 flex justify-between">
                <span>Total Redemptions:</span>
                <span className="font-bold text-foreground">{selectedCoupon.usageCount} times used</span>
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 flex justify-between">
                <span>Validity Period:</span>
                <span className="font-semibold text-foreground">{selectedCoupon.startDate} to {selectedCoupon.expiryDate}</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedCoupon(null)}
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
