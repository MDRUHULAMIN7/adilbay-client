'use client';

import React, { useState } from 'react';
import { Receipt, Search, DollarSign, CreditCard, ArrowDownLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '@/data/admin-mock-data';
import { AdminTransaction } from '@/types/admin';

export default function TransactionsPage() {
  const [transactions] = useState<AdminTransaction[]>(MOCK_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = transactions.filter(
    (t) =>
      t.transactionRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Receipt className="w-6 h-6 text-primary" />
            <span>Financial Transactions & Payments</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Audit payment logs, gateway transactions (Stripe, bKash, PayPal), refunds, and balance payouts.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search ref ID, order # or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <span className="text-xs text-muted-foreground font-semibold">
          {filtered.length} Recorded Logs
        </span>
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                <th className="py-3.5 px-4">Transaction Ref</th>
                <th className="py-3.5 px-4">Order Ref & Customer</th>
                <th className="py-3.5 px-4">Gateway Method</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-foreground">{t.transactionRef}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-primary font-mono">{t.orderNumber}</p>
                    <p className="text-[10px] text-muted-foreground">{t.customerName}</p>
                  </td>
                  <td className="py-3.5 px-4 uppercase font-bold text-muted-foreground flex items-center gap-1.5 pt-4">
                    <CreditCard className="w-3.5 h-3.5 text-primary" /> {t.paymentMethod}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        t.type === 'payment'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      {t.type === 'payment' ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                      {t.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-foreground">
                    ${t.amount.toFixed(2)} {t.currency}
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">{t.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> {t.status.toUpperCase()}
                    </span>
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
