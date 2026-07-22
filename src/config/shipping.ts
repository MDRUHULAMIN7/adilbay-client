export interface ShippingOption {
  id: string;
  title: string;
  description: string;
  fee: number;
  estimatedDays: string;
  badge?: string;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'standard',
    title: 'Standard Delivery',
    description: 'Safe transport via Furnixo logistics partner.',
    fee: 120,
    estimatedDays: '3 - 5 Business Days',
  },
  {
    id: 'express',
    title: 'Express Delivery',
    description: 'Priority handling & white-glove room assembly.',
    fee: 350,
    estimatedDays: '1 - 2 Business Days',
    badge: 'Fastest',
  },
  {
    id: 'pickup',
    title: 'Warehouse Pickup',
    description: 'Collect directly from central Dhaka warehouse.',
    fee: 0,
    estimatedDays: 'Same Day Pickup',
    badge: 'Free',
  },
];
