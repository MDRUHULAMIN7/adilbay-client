'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Bell,
  Menu,
  Plus,
  Moon,
  Sun,
  ChevronDown,
  User,
  LogOut,
  Sparkles,
  PackagePlus,
  Tag,
  Boxes,
  CheckCircle2
} from 'lucide-react';

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
}

export function AdminHeader({ onOpenMobileMenu }: AdminHeaderProps) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Sync dark mode state from document root
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const toggleDarkMode = () => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      if (root.classList.contains('dark')) {
        root.classList.remove('dark');
        setIsDarkMode(false);
      } else {
        root.classList.add('dark');
        setIsDarkMode(true);
      }
    }
  };

  // Get current section label (without showing "Dashboard" text)
  const segments = pathname.split('/').filter(Boolean);
  const subSegment = segments[1];
  const currentPageTitle = subSegment
    ? subSegment.charAt(0).toUpperCase() + subSegment.slice(1).replace('-', ' ')
    : 'Overview';

  return (
    <header className="sticky top-0 z-30 h-16 bg-card/90 backdrop-blur-md border-b border-border px-5 lg:px-8 flex items-center justify-between transition-colors">
      {/* Left Section: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-5.5 h-5.5" />
        </button>

        {/* Clean Page Title Display Aligned Vertically with Sidebar Header */}
        <div className="flex items-center gap-2">
          <h1 className="text-base sm:text-lg font-bold font-display text-foreground tracking-tight leading-none">
            {currentPageTitle}
          </h1>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-lg mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products, orders, customers, SKUs..."
            className="w-full pl-10 pr-12 py-2 text-sm bg-muted/50 focus:bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-xs font-mono font-medium text-muted-foreground bg-card border border-border rounded shadow-xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Section: Quick Action Button & Profile Dropdown */}
      <div className="flex items-center gap-3">
        {/* Quick Action Button */}
        <div className="relative">
          <button
            onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-brand-500 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Action</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-80" />
          </button>

          {isQuickActionsOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-card border border-border rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Create New
              </div>
              <Link
                href="/dashboard/products"
                onClick={() => setIsQuickActionsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors cursor-pointer"
              >
                <PackagePlus className="w-4 h-4 text-primary" />
                <span>Add New Product</span>
              </Link>
              <Link
                href="/dashboard/coupons"
                onClick={() => setIsQuickActionsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors cursor-pointer"
              >
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>Create Coupon</span>
              </Link>
              <Link
                href="/dashboard/inventory"
                onClick={() => setIsQuickActionsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors cursor-pointer"
              >
                <Boxes className="w-4 h-4 text-amber-600" />
                <span>Adjust Inventory</span>
              </Link>
            </div>
          )}
        </div>

        {/* Profile Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1 rounded-2xl hover:bg-muted/80 transition-colors border border-transparent hover:border-border cursor-pointer"
          >
            <div className="w-8.5 h-8.5 rounded-xl bg-brand-200 dark:bg-brand-900 text-brand-800 dark:text-brand-100 flex items-center justify-center font-bold text-xs border border-brand-300 shadow-xs cursor-pointer">
              AT
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-foreground leading-tight">Alex Turner</span>
              <span className="text-[10px] text-muted-foreground font-medium">Store Director</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-card border border-border rounded-3xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
              {/* Profile Header Info */}
              <div className="p-3 border-b border-border mb-2 bg-muted/30 rounded-2xl">
                <p className="text-sm font-bold text-foreground">Alex Turner</p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">alex.turner@furnixo.com</p>
              </div>

              <div className="space-y-1">
                {/* User Profile */}
                <Link
                  href="/account/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-primary" />
                  <span>My Profile</span>
                </Link>

                {/* Theme Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {isDarkMode ? (
                      <Sun className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    )}
                    <span>Theme Mode</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-muted text-muted-foreground uppercase cursor-pointer">
                    {isDarkMode ? 'Dark' : 'Light'}
                  </span>
                </button>

                {/* Notifications */}
                <div className="border-t border-border/60 pt-1 my-1">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 text-primary" />
                      <span>Notifications</span>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-destructive animate-pulse" />
                  </button>

                  {/* Inline Notifications Subpanel */}
                  {showNotifications && (
                    <div className="mt-2 p-2.5 bg-muted/50 border border-border rounded-2xl space-y-2 text-xs">
                      <div className="p-2 rounded-xl bg-card border border-border/80 flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-foreground">New Order #FRN-84920</p>
                          <p className="text-[11px] text-muted-foreground">3 items ($2,349)</p>
                        </div>
                      </div>
                      <div className="p-2 rounded-xl bg-card border border-border/80 flex gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-foreground">Low Stock Warning</p>
                          <p className="text-[11px] text-muted-foreground">Velvet Sofa (3 left)</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Logout Button */}
                <div className="border-t border-border pt-1">
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
