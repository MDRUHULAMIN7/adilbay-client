'use client';

import React, { useState } from 'react';
import { Star, Search, CheckCircle2, Flag, Trash2, MessageSquare, ThumbsUp, ShieldCheck } from 'lucide-react';
import { MOCK_REVIEWS } from '@/data/admin-mock-data';
import { AdminReview } from '@/types/admin';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>(MOCK_REVIEWS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState<string>('all');

  const updateStatus = (id: string, newStatus: AdminReview['status']) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.productTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRating === 'all' || r.rating.toString() === selectedRating;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            <span>Customer Reviews Moderation</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Moderate customer feedback, verify buyer badges, and respond to furniture quality reviews.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="p-4 rounded-2xl bg-card border border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search review comments or products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="px-3 py-2 text-xs bg-muted/40 border border-border rounded-xl text-foreground focus:outline-none"
          >
            <option value="all">All Star Ratings</option>
            <option value="5">5 Stars Only</option>
            <option value="4">4 Stars Only</option>
            <option value="3">3 Stars & Below</option>
          </select>
          <span className="text-xs text-muted-foreground font-semibold">
            {filtered.length} Reviews
          </span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filtered.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-3xl bg-card border border-border shadow-xs hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
              <div className="flex items-center gap-3">
                <img
                  src={rev.productImage}
                  alt={rev.productTitle}
                  className="w-10 h-10 rounded-xl object-cover border border-border shrink-0"
                />
                <div>
                  <p className="text-xs font-bold text-foreground">{rev.productTitle}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-semibold text-foreground">{rev.customerName}</span>
                    {rev.verifiedBuyer && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" /> Verified Buyer
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-500' : 'text-muted-foreground/30'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground font-medium">{rev.createdAt}</span>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">{rev.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">"{rev.comment}"</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  rev.status === 'approved'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : rev.status === 'pending'
                    ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                    : 'bg-destructive/15 text-destructive'
                }`}
              >
                STATUS: {rev.status.toUpperCase()}
              </span>

              <div className="flex items-center gap-2">
                {rev.status !== 'approved' && (
                  <button
                    onClick={() => updateStatus(rev.id, 'approved')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                  </button>
                )}
                <button
                  onClick={() => updateStatus(rev.id, 'flagged')}
                  className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-amber-600"
                  title="Flag Review"
                >
                  <Flag className="w-4 h-4" />
                </button>
                <button className="px-3 py-1.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" /> Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
