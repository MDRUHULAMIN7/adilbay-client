'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Layers,
  Building2,
  Boxes,
  Star,
  ShoppingCart,
  Receipt,
  Ticket,
  BadgePercent,
  Truck,
  ChevronLeft,
  ChevronRight,
  Armchair,
  X,
  Sparkles
} from 'lucide-react';
import { ADMIN_NAV_ITEMS } from '@/data/admin-mock-data';
import { AdminNavItem } from '@/types/admin';

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  Package,
  FolderTree,
  Layers,
  Building2,
  Boxes,
  Star,
  ShoppingCart,
  Receipt,
  Ticket,
  BadgePercent,
  Truck
};

export function AdminSidebar({ isMobileOpen, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // On mobile drawer open, force full expanded state
  const isEffectiveCollapsed = isCollapsed && !isMobileOpen;

  const catalogItems = ADMIN_NAV_ITEMS.filter((item) => item.category === 'catalog');
  const salesItems = ADMIN_NAV_ITEMS.filter((item) => item.category === 'sales');
  const generalItems = ADMIN_NAV_ITEMS.filter((item) => item.category === 'general');

  const renderNavGroup = (title: string, items: AdminNavItem[]) => (
    <div className="mb-6">
      {!isEffectiveCollapsed && (
        <h3 className="px-3 text-[11px] font-bold tracking-wider text-muted-foreground/70 uppercase mb-2">
          {title}
        </h3>
      )}
      <ul className="space-y-1">
        {items.map((item) => {
          const Icon = ICON_MAP[item.iconName] || Package;
          const isActive = pathname === item.href;

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative cursor-pointer ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'text-foreground/80 hover:text-foreground hover:bg-muted/80'
                }`}
                title={isEffectiveCollapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />

                {!isEffectiveCollapsed && (
                  <span className="truncate flex-1 font-semibold">{item.label}</span>
                )}

                {!isEffectiveCollapsed && item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      isActive
                        ? 'bg-white/20 text-primary-foreground'
                        : item.badgeColor === 'destructive'
                        ? 'bg-destructive/15 text-destructive'
                        : item.badgeColor === 'warning'
                        ? 'bg-warning/20 text-amber-700 dark:text-amber-400'
                        : item.badgeColor === 'success'
                        ? 'bg-success/20 text-emerald-700 dark:text-emerald-400'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Collapsed Badge Dot Indicator (desktop collapsed mode only) */}
                {isEffectiveCollapsed && item.badge !== undefined && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden cursor-pointer"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Main Container */}
      <aside
        className={`fixed lg:sticky top-0 z-50 h-screen flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out shadow-xs ${
          isEffectiveCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen
            ? 'translate-x-0 w-64'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header: Exactly h-16 (64px) matching AdminHeader height */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border shrink-0">
          <Link href="/" className="flex items-center gap-3 group overflow-hidden cursor-pointer" title="Go to Furnixo Storefront Home">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-brand-300 flex items-center justify-center text-primary-foreground shadow-md shadow-primary/20 shrink-0 transition-transform group-hover:scale-105 cursor-pointer">
              <Armchair className="w-5 h-5" />
            </div>
            {!isEffectiveCollapsed && (
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight tracking-tight text-foreground flex items-center gap-1.5">
                  FURNIXO <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-sans font-semibold uppercase">Admin</span>
                </span>
                <span className="text-[11px] text-muted-foreground font-medium">Furniture Control Center</span>
              </div>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section Scrollable */}
        <div className="flex-1 overflow-y-auto p-3 scrollbar-theme">
          {renderNavGroup('Main', generalItems)}
          {renderNavGroup('Catalog & Inventory', catalogItems)}
          {renderNavGroup('Sales & Operations', salesItems)}
        </div>

        {/* Sidebar Footer with Store Status & Collapse Toggle */}
        <div className="p-3 border-t border-border bg-muted/30 shrink-0">
          {!isEffectiveCollapsed && (
            <div className="mb-3 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/20 border border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute inset-0 opacity-75"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-foreground">Store Status</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Online & Accepting Orders</span>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-full py-2 px-3 text-xs font-medium text-muted-foreground hover:text-foreground rounded-xl bg-muted/60 hover:bg-muted transition-colors gap-2 cursor-pointer"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
