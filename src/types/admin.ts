export type NavItemCategory = 'catalog' | 'sales' | 'general';

export interface AdminNavItem {
  id: string;
  label: string;
  href: string;
  iconName: string; // Lucide icon identifier
  category: NavItemCategory;
  badge?: number | string;
  badgeColor?: 'default' | 'primary' | 'warning' | 'destructive' | 'success';
}

export interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  iconName: string;
}

export interface AdminProduct {
  id: string;
  title: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'draft';
  rating: number;
  salesCount: number;
  image: string;
  featured: boolean;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  subcategoriesCount: number;
  productsCount: number;
  status: 'active' | 'hidden';
  image: string;
  featured: boolean;
}

export interface AdminCollection {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  productsCount: number;
  status: 'published' | 'scheduled' | 'archived';
  bannerImage: string;
  discountPercentage?: number;
}

export interface AdminBrand {
  id: string;
  name: string;
  slug: string;
  country: string;
  productsCount: number;
  status: 'active' | 'inactive';
  logo: string;
  rating: number;
}

export interface AdminInventoryItem {
  id: string;
  productName: string;
  sku: string;
  location: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  reorderPoint: number;
  unitCost: number;
  status: 'optimal' | 'low' | 'critical' | 'overstocked';
}

export interface AdminReview {
  id: string;
  productTitle: string;
  productImage: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  sentiment: 'positive' | 'neutral' | 'critical';
  verifiedBuyer: boolean;
  status: 'approved' | 'pending' | 'flagged' | 'rejected';
  createdAt: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  itemsCount: number;
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  fulfillmentStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
  createdAt: string;
  shippingMethod: string;
}

export interface AdminTransaction {
  id: string;
  transactionRef: string;
  orderNumber: string;
  customerName: string;
  paymentMethod: 'stripe' | 'bkash' | 'paypal' | 'credit_card' | 'cod';
  type: 'payment' | 'refund' | 'payout';
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase?: number;
  usageCount: number;
  usageLimit?: number;
  startDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'scheduled' | 'disabled';
}

export interface AdminDiscount {
  id: string;
  name: string;
  type: 'category' | 'collection' | 'volume' | 'seasonal';
  discountValue: string;
  target: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'ended';
  appliedCount: number;
}

export interface AdminShippingMethod {
  id: string;
  name: string;
  type: 'white_glove' | 'express_freight' | 'standard_ground' | 'local_pickup';
  estimatedDays: string;
  rate: number;
  freeShippingThreshold?: number;
  zone: string;
  status: 'active' | 'disabled';
}
