'use client';

import React from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  Truck,
  AlertTriangle,
  ArrowUpRight,
  Plus,
  TrendingUp,
  Package,
  Calendar,
  Layers,
  Star,
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { MOCK_METRICS, MOCK_ORDERS, MOCK_PRODUCTS, MOCK_INVENTORY } from '@/data/admin-mock-data';

const ICON_MAP: Record<string, React.ElementType> = {
  DollarSign,
  ShoppingBag,
  Truck,
  AlertTriangle
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Executive Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 text-white p-6 sm:p-8 shadow-xl border border-brand-800/50">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
              Welcome back, Alex 👋
            </h1>
            <p className="text-sm text-brand-200 mt-1 max-w-xl">
              Here is what is happening across Furnixo stores today. Your revenue is up <span className="text-emerald-400 font-bold">+18.4%</span> this month.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/products"
              className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-brand-400 font-medium text-xs flex items-center gap-2 shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Furniture Item</span>
            </Link>
            <Link
              href="/dashboard/orders"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs backdrop-blur-md border border-white/10 flex items-center gap-2 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Manage Orders</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {MOCK_METRICS.map((metric) => {
          const Icon = ICON_MAP[metric.iconName] || DollarSign;
          return (
            <div
              key={metric.id}
              className="p-5 rounded-2xl bg-card border border-border shadow-xs hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">{metric.title}</span>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-110">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <h3 className="text-2xl font-bold font-display text-foreground tracking-tight">
                  {metric.value}
                </h3>
                <span
                  className={`text-xs font-bold flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
                    metric.isPositive
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}
                >
                  <TrendingUp className="w-3 h-3" />
                  {metric.change}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground/70 mt-1">{metric.timeframe}</p>
            </div>
          );
        })}
      </div>

      {/* Main Graph & Low Inventory Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Performance & Monthly Trend Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-card border border-border shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-foreground font-display flex items-center gap-2">
                <span>Revenue Performance</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-sans font-semibold">
                  +18.4% YoY
                </span>
              </h2>
              <p className="text-xs text-muted-foreground">Monthly sales revenue vs target breakdown ($ USD)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-primary block"></span> Actual Sales
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground ml-3">
                <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30 block"></span> Target Goal
              </span>
            </div>
          </div>

          {/* Minimalist Visual Bar Chart */}
          <div className="pt-4 pb-2">
            <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 border-b border-border pb-2">
              {[
                { month: 'Jan', value: 65, target: 80, amount: '$65k' },
                { month: 'Feb', value: 78, target: 80, amount: '$78k' },
                { month: 'Mar', value: 92, target: 85, amount: '$92k' },
                { month: 'Apr', value: 84, target: 85, amount: '$84k' },
                { month: 'May', value: 110, target: 100, amount: '$110k' },
                { month: 'Jun', value: 125, target: 110, amount: '$125k' },
                { month: 'Jul', value: 138, target: 120, amount: '$138k' },
                { month: 'Aug', value: 148, target: 130, amount: '$148k', current: true }
              ].map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-1 group relative">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded shadow-lg pointer-events-none whitespace-nowrap z-20">
                    {item.month}: {item.amount}
                  </div>
                  <div className="w-full max-w-[36px] bg-muted/60 rounded-t-lg h-full flex items-end relative overflow-hidden">
                    <div
                      style={{ height: `${(item.value / 160) * 100}%` }}
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        item.current
                          ? 'bg-gradient-to-t from-primary to-brand-300 shadow-md'
                          : 'bg-primary/80 group-hover:bg-primary'
                      }`}
                    />
                  </div>
                  <span className={`text-[11px] font-medium ${item.current ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Stock Furniture Alert Widget */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-foreground font-display flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Low Inventory Warning</span>
              </h2>
              <Link href="/dashboard/inventory" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              4 furniture SKUs are at or below reorder threshold. Stock up to prevent order fulfillment delays.
            </p>

            <div className="space-y-3">
              {MOCK_INVENTORY.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-muted/40 border border-border/60 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-semibold text-foreground truncate max-w-[180px]">{item.productName}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.currentStock === 0
                          ? 'bg-destructive/15 text-destructive'
                          : 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      {item.currentStock === 0 ? 'Out of Stock' : `${item.currentStock} left`}
                    </span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Reorder @ {item.reorderPoint}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard/inventory"
            className="mt-4 w-full py-2.5 text-center text-xs font-semibold rounded-xl bg-muted hover:bg-muted/80 text-foreground transition-colors block"
          >
            Reorder Stock Now
          </Link>
        </div>
      </div>

      {/* Bottom Split: Recent Orders Table & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground font-display">Recent Furniture Orders</h2>
              <p className="text-xs text-muted-foreground">Latest transactions placed across all online channels</p>
            </div>
            <Link href="/dashboard/orders" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
              View All Orders <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-semibold">
                  <th className="py-3 px-2">Order Ref</th>
                  <th className="py-3 px-2">Customer</th>
                  <th className="py-3 px-2">Total</th>
                  <th className="py-3 px-2">Fulfillment</th>
                  <th className="py-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {MOCK_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2 font-mono font-semibold text-primary">{order.orderNumber}</td>
                    <td className="py-3 px-2">
                      <p className="font-semibold text-foreground">{order.customerName}</p>
                      <p className="text-[10px] text-muted-foreground">{order.customerEmail}</p>
                    </td>
                    <td className="py-3 px-2 font-semibold text-foreground">${order.totalAmount.toFixed(2)}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.fulfillmentStatus === 'delivered'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : order.fulfillmentStatus === 'shipped'
                            ? 'bg-info/10 text-info'
                            : order.fulfillmentStatus === 'processing'
                            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {order.fulfillmentStatus === 'delivered' && <CheckCircle2 className="w-3 h-3" />}
                        {order.fulfillmentStatus === 'processing' && <Clock className="w-3 h-3" />}
                        {order.fulfillmentStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <Link
                        href="/dashboard/orders"
                        className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground inline-block"
                        title="View Details"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground font-display">Top Selling Furniture</h2>
            <Link href="/dashboard/products" className="text-xs text-primary font-semibold hover:underline">
              Catalog
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_PRODUCTS.slice(0, 4).map((prod) => (
              <div key={prod.id} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-muted/40 transition-colors">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-12 h-12 rounded-xl object-cover border border-border shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{prod.title}</p>
                  <p className="text-[10px] text-muted-foreground">{prod.category} • ${prod.price}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-foreground">{prod.salesCount} sold</span>
                  <div className="flex items-center justify-end text-[10px] text-amber-500 gap-0.5">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span>{prod.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
