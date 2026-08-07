'use client';

import React, { useState } from 'react';
import { Truck, Plus, Search, MapPin, Clock, Eye, X } from 'lucide-react';
import { MOCK_SHIPPING_METHODS } from '@/data/admin-mock-data';
import { AdminShippingMethod } from '@/types/admin';

export default function ShippingPage() {
  const [methods, setMethods] = useState<AdminShippingMethod[]>(MOCK_SHIPPING_METHODS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShipping, setSelectedShipping] = useState<AdminShippingMethod | null>(null);

  const toggleStatus = (id: string) => {
    setMethods((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === 'active' ? 'disabled' : 'active' }
          : m
      )
    );
  };

  const filtered = methods.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Truck className="w-6 h-6 text-primary" />
            <span>Furniture Shipping & Logistics</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure White Glove assembly freight, regional delivery zones, and free shipping thresholds.
          </p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-xs flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:bg-brand-500 transition-all">
          <Plus className="w-4 h-4" />
          <span>Add Shipping Zone</span>
        </button>
      </div>

      {/* Filter */}
      <div className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search shipping methods or zones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <span className="text-xs text-muted-foreground font-semibold">
          {filtered.length} Logistics Zones
        </span>
      </div>

      {/* Clean Shipping Data Table */}
      <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                <th className="py-3.5 px-4">Method Name</th>
                <th className="py-3.5 px-4">Coverage Zone</th>
                <th className="py-3.5 px-4">Transit Time</th>
                <th className="py-3.5 px-4">Freight Rate</th>
                <th className="py-3.5 px-4">Free Threshold</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-foreground">{m.name}</td>
                  <td className="py-3.5 px-4 text-muted-foreground flex items-center gap-1 pt-4">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> {m.zone}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-foreground flex items-center gap-1 pt-4">
                    <Clock className="w-3.5 h-3.5 text-primary" /> {m.estimatedDays}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-foreground">${m.rate.toFixed(2)}</td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                    {m.freeShippingThreshold ? `>$${m.freeShippingThreshold}` : 'N/A'}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleStatus(m.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        m.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {m.status.toUpperCase()}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedShipping(m)}
                      className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                      title="View Shipping Details"
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

      {/* Shipping Details Modal */}
      {selectedShipping && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-base font-bold font-display text-foreground">{selectedShipping.name}</h2>
              <button onClick={() => setSelectedShipping(null)} className="p-1.5 rounded-xl hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-muted/40 flex justify-between">
                <span>Coverage Zone:</span>
                <span className="font-bold text-foreground">{selectedShipping.zone}</span>
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 flex justify-between">
                <span>Estimated Delivery:</span>
                <span className="font-bold text-foreground">{selectedShipping.estimatedDays}</span>
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 flex justify-between">
                <span>Standard Freight Rate:</span>
                <span className="font-bold text-foreground">${selectedShipping.rate.toFixed(2)}</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex justify-between font-bold">
                <span>Free Shipping Threshold:</span>
                <span>{selectedShipping.freeShippingThreshold ? `Orders > $${selectedShipping.freeShippingThreshold}` : 'None'}</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedShipping(null)}
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
