'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Order, OrderStatus } from '@/types/order';
import { OrderRepository } from '@/repositories/order.repository';

export function useOrders(initialStatusFilter: string = 'all') {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>(initialStatusFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const list = OrderRepository.getOrders();
    setOrders(list);
  }, []);

  const refreshOrders = useCallback(() => {
    const list = OrderRepository.getOrders();
    setOrders(list);
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        order.id.toLowerCase().includes(q) ||
        order.items.some((i) => i.title.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, searchQuery]);

  return {
    orders: filteredOrders,
    rawOrders: orders,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    refreshOrders,
    totalCount: orders.length,
  };
}

export default useOrders;
