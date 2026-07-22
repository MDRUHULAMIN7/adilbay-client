import { Order, OrderTimelineStep, InvoiceData } from '@/types/order';
import { CartItem } from '@/types/cart';
import { ShippingAddress, BillingAddress } from '@/types/checkout';
import { PaymentMethodId, PaymentGatewayStatus } from '@/types/payment';
import { generateOrderId } from '@/lib/generate-order-id';
import { OrderRepository } from '@/repositories/order.repository';

export const OrderService = {
  createOrderFromCart(params: {
    items: CartItem[];
    shippingAddress: ShippingAddress;
    billingAddress: BillingAddress;
    shippingMethodTitle: string;
    shippingFee: number;
    paymentMethod: PaymentMethodId;
    paymentStatus: PaymentGatewayStatus;
    subtotal: number;
    discount: number;
    tax: number;
    grandTotal: number;
  }): Order {
    const orderId = generateOrderId();
    const now = new Date().toISOString();

    const timeline: OrderTimelineStep[] = [
      { status: 'placed', title: 'Order Placed', description: 'Order successfully submitted.', timestamp: now, isCompleted: true, isCurrent: true },
      { status: 'confirmed', title: 'Order Confirmed', description: 'Seller verified woodcraft stock availability.', isCompleted: false, isCurrent: false },
      { status: 'packed', title: 'Packed & Quality Checked', description: 'Inspected for finish polish & protective packaging.', isCompleted: false, isCurrent: false },
      { status: 'shipped', title: 'Out For Delivery', description: 'Handed over to Furnixo logistics team.', isCompleted: false, isCurrent: false },
      { status: 'delivered', title: 'Delivered', description: 'Received and unboxed at delivery location.', isCompleted: false, isCurrent: false },
    ];

    const order: Order = {
      id: orderId,
      createdAt: now,
      status: 'placed',
      items: params.items.map((item) => ({
        id: `item-${Date.now()}-${item.id}`,
        productId: item.product.id,
        productSlug: item.product.slug,
        title: item.product.title,
        image: item.product.images[0] || '',
        unitPrice: item.product.price,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        selectedMaterial: item.selectedMaterial,
      })),
      shippingAddress: params.shippingAddress,
      billingAddress: params.billingAddress,
      shippingMethodTitle: params.shippingMethodTitle,
      shippingFee: params.shippingFee,
      paymentMethod: params.paymentMethod,
      paymentStatus: params.paymentStatus,
      subtotal: params.subtotal,
      discount: params.discount,
      tax: params.tax,
      grandTotal: params.grandTotal,
      trackingNumber: `TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
      estimatedDeliveryDate: '3-5 Business Days',
      timeline,
    };

    return OrderRepository.saveOrder(order);
  },

  getInvoiceData(order: Order): InvoiceData {
    return {
      order,
      companyDetails: {
        name: 'Furnixo Crafts Limited',
        address: 'Level 12, Furnixo Tower, Pragati Sarani, Gulshan 2, Dhaka-1212',
        phone: '+880 9612-FURNIXO',
        email: 'billing@furnixo.com',
        website: 'www.furnixo.com',
        vatRegistration: 'VAT-REG-2026-9812401',
      },
    };
  },
};
