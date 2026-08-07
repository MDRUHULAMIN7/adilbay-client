'use client';

import React, { useState } from 'react';
import { ShoppingCart, Search, CheckCircle2, Clock, Truck, PackageCheck, Eye, Filter } from 'lucide-react';
import { MOCK_ORDERS } from '@/data/admin-mock-data';
import { AdminOrder } from '@/types/admin';

export default function OrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(MOCK_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const updateFulfillment = (id: string, status: AdminOrder['fulfillmentStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, fulfillmentStatus: status } : o))
    );
  };

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || o.fulfillmentStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-primary" />
            <span>Furniture Orders Fulfillment</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Process incoming furniture orders, track freight shipping, and update customer fulfillment statuses.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="p-4 rounded-2xl bg-card border border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search order ref, customer name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-muted/40 border border-border rounded-xl text-foreground focus:outline-none"
          >
            <option value="all">All Fulfillment Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
          <span className="text-xs text-muted-foreground font-semibold">
            {filtered.length} Orders
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                <th className="py-3.5 px-4">Order Ref & Date</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Items & Freight</th>
                <th className="py-3.5 px-4">Total Price</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Fulfillment Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-mono font-bold text-primary">{order.orderNumber}</p>
                    <p className="text-[10px] text-muted-foreground">{order.createdAt}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-foreground">{order.customerName}</p>
                    <p className="text-[10px] text-muted-foreground">{order.customerEmail}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-foreground">{order.itemsCount} Furniture Items</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Truck className="w-3 h-3 text-primary" /> {order.shippingMethod}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        order.paymentStatus === 'paid'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      {order.paymentStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={order.fulfillmentStatus}
                      onChange={(e) =>
                        updateFulfillment(order.id, e.target.value as AdminOrder['fulfillmentStatus'])
                      }
                      className="px-2.5 py-1 text-[11px] font-bold bg-muted/60 border border-border rounded-xl focus:outline-none cursor-pointer"
                    >
                      <option value="pending">PENDING</option>
                      <option value="processing">PROCESSING</option>
                      <option value="shipped">SHIPPED</option>
                      <option value="delivered">DELIVERED</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                      title="View Full Order Summary"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h2 className="text-base font-bold font-display text-foreground">
                  Order {selectedOrder.orderNumber}
                </h2>
                <p className="text-xs text-muted-foreground">{selectedOrder.createdAt}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase">
                {selectedOrder.fulfillmentStatus}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-muted/40 space-y-1">
                <p className="font-bold text-foreground">Customer Info</p>
                <p className="text-muted-foreground">{selectedOrder.customerName}</p>
                <p className="text-muted-foreground">{selectedOrder.customerEmail}</p>
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 space-y-1">
                <p className="font-bold text-foreground">Shipping Logistics</p>
                <p className="text-muted-foreground">{selectedOrder.shippingMethod}</p>
              </div>
              <div className="flex justify-between items-center pt-2 text-sm font-bold text-foreground">
                <span>Total Amount Paid:</span>
                <span className="text-primary">${selectedOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 text-xs font-semibold rounded-xl bg-muted text-foreground hover:bg-muted/80 transition-colors"
            >
              Close Drawer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
