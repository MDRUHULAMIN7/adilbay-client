'use client';

import React, { useState } from 'react';
import { Boxes, Plus, Minus, Search, AlertTriangle, RefreshCw, Warehouse, CheckCircle2 } from 'lucide-react';
import { MOCK_INVENTORY } from '@/data/admin-mock-data';
import { AdminInventoryItem } from '@/types/admin';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<AdminInventoryItem[]>(MOCK_INVENTORY);
  const [searchTerm, setSearchTerm] = useState('');

  const updateStock = (id: string, delta: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newCurrent = Math.max(0, item.currentStock + delta);
          const newAvailable = Math.max(0, newCurrent - item.reservedStock);
          const newStatus =
            newCurrent === 0
              ? 'critical'
              : newCurrent <= item.reorderPoint
              ? 'low'
              : 'optimal';
          return {
            ...item,
            currentStock: newCurrent,
            availableStock: newAvailable,
            status: newStatus
          };
        }
        return item;
      })
    );
  };

  const filtered = inventory.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Boxes className="w-6 h-6 text-primary" />
            <span>Furniture Warehouse & Inventory</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Track SKU location, reserved customer orders, reorder thresholds, and live stock adjustments.
          </p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-xs flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:bg-brand-500 transition-all">
          <RefreshCw className="w-4 h-4" />
          <span>Stock Audit Sync</span>
        </button>
      </div>

      {/* Filter */}
      <div className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search SKU or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <span className="text-xs text-muted-foreground font-semibold">
          {filtered.length} Monitored Items
        </span>
      </div>

      {/* Inventory Table */}
      <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                <th className="py-3.5 px-4">Item & SKU</th>
                <th className="py-3.5 px-4">Warehouse Location</th>
                <th className="py-3.5 px-4">Stock Breakdown</th>
                <th className="py-3.5 px-4">Reorder Point</th>
                <th className="py-3.5 px-4">Unit Cost</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-foreground">{item.productName}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">SKU: {item.sku}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-muted/60 text-[11px] font-medium text-foreground">
                      <Warehouse className="w-3.5 h-3.5 text-primary" />
                      {item.location}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <p className="font-bold text-foreground">{item.availableStock} Available</p>
                      <p className="text-[10px] text-muted-foreground">
                        {item.currentStock} total ({item.reservedStock} reserved)
                      </p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-muted-foreground">
                    {item.reorderPoint} units
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground">
                    ${item.unitCost.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'optimal'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : item.status === 'low'
                          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                          : 'bg-destructive/15 text-destructive'
                      }`}
                    >
                      {item.status === 'optimal' && <CheckCircle2 className="w-3 h-3" />}
                      {item.status !== 'optimal' && <AlertTriangle className="w-3 h-3" />}
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => updateStock(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-foreground font-bold"
                        title="Decrease Stock"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-bold font-mono">{item.currentStock}</span>
                      <button
                        onClick={() => updateStock(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-primary text-primary-foreground hover:bg-brand-500 flex items-center justify-center font-bold shadow-xs"
                        title="Increase Stock"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
