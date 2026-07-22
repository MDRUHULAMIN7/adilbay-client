import { CartItem } from './cart';
import { ShippingAddress, BillingAddress } from './checkout';
import { PaymentMethodId, PaymentGatewayStatus } from './payment';

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderTimelineStep {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  productSlug: string;
  title: string;
  image: string;
  unitPrice: number;
  quantity: number;
  selectedColor?: string;
  selectedMaterial?: string;
}

export interface Order {
  id: string; // e.g. FX-20260722-00142
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
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
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
  timeline: OrderTimelineStep[];
}

export interface InvoiceData {
  order: Order;
  companyDetails: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    vatRegistration: string;
  };
}
