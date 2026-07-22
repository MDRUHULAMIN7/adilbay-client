import { Order } from '@/types/order';
import { storage } from '@/lib/storage';

const ORDERS_STORAGE_KEY = 'furnixo_orders_history';

export const OrderRepository = {
  getOrders(): Order[] {
    return storage.get<Order[]>(ORDERS_STORAGE_KEY, []);
  },

  getOrderById(id: string): Order | undefined {
    const orders = this.getOrders();
    return orders.find((o) => o.id === id);
  },

  saveOrder(order: Order): Order {
    const orders = this.getOrders();
    const updated = [order, ...orders];
    storage.set(ORDERS_STORAGE_KEY, updated);
    return order;
  },

  updateOrderStatus(orderId: string, status: Order['status']): Order | undefined {
    const orders = this.getOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index === -1) return undefined;

    orders[index].status = status;
    orders[index].timeline = orders[index].timeline.map((step) => {
      if (step.status === status) {
        return { ...step, isCompleted: true, isCurrent: true, timestamp: new Date().toISOString() };
      }
      return { ...step, isCurrent: false };
    });

    storage.set(ORDERS_STORAGE_KEY, orders);
    return orders[index];
  },
};
