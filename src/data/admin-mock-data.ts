import {
  AdminNavItem,
  MetricCard,
  AdminProduct,
  AdminCategory,
  AdminCollection,
  AdminBrand,
  AdminInventoryItem,
  AdminReview,
  AdminOrder,
  AdminTransaction,
  AdminCoupon,
  AdminDiscount,
  AdminShippingMethod
} from '@/types/admin';

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    id: 'dashboard',
    label: 'Overview',
    href: '/dashboard',
    iconName: 'LayoutDashboard',
    category: 'general'
  },
  // CATALOG & INVENTORY
  {
    id: 'products',
    label: 'Products',
    href: '/dashboard/products',
    iconName: 'Package',
    category: 'catalog',
    badge: 24,
    badgeColor: 'primary'
  },
  {
    id: 'categories',
    label: 'Categories',
    href: '/dashboard/categories',
    iconName: 'FolderTree',
    category: 'catalog'
  },
  {
    id: 'collections',
    label: 'Collections',
    href: '/dashboard/collections',
    iconName: 'Layers',
    category: 'catalog'
  },
  {
    id: 'brands',
    label: 'Brands',
    href: '/dashboard/brands',
    iconName: 'Building2',
    category: 'catalog'
  },
  {
    id: 'inventory',
    label: 'Inventory',
    href: '/dashboard/inventory',
    iconName: 'Boxes',
    category: 'catalog',
    badge: 4,
    badgeColor: 'warning'
  },
  {
    id: 'reviews',
    label: 'Reviews',
    href: '/dashboard/reviews',
    iconName: 'Star',
    category: 'catalog',
    badge: '4.9',
    badgeColor: 'success'
  },
  // SALES & OPERATIONS
  {
    id: 'orders',
    label: 'Orders',
    href: '/dashboard/orders',
    iconName: 'ShoppingCart',
    category: 'sales',
    badge: 12,
    badgeColor: 'destructive'
  },
  {
    id: 'transactions',
    label: 'Transactions',
    href: '/dashboard/transactions',
    iconName: 'Receipt',
    category: 'sales'
  },
  {
    id: 'coupons',
    label: 'Coupons',
    href: '/dashboard/coupons',
    iconName: 'Ticket',
    category: 'sales'
  },
  {
    id: 'discounts',
    label: 'Discounts',
    href: '/dashboard/discounts',
    iconName: 'BadgePercent',
    category: 'sales'
  },
  {
    id: 'shipping',
    label: 'Shipping',
    href: '/dashboard/shipping',
    iconName: 'Truck',
    category: 'sales'
  }
];

export const MOCK_METRICS: MetricCard[] = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '$148,250.00',
    change: '+18.4%',
    isPositive: true,
    timeframe: 'vs last month',
    iconName: 'DollarSign'
  },
  {
    id: 'orders',
    title: 'Furniture Orders',
    value: '1,248',
    change: '+12.1%',
    isPositive: true,
    timeframe: 'vs last month',
    iconName: 'ShoppingBag'
  },
  {
    id: 'items',
    title: 'Items Delivered',
    value: '3,420',
    change: '+8.6%',
    isPositive: true,
    timeframe: 'vs last month',
    iconName: 'Truck'
  },
  {
    id: 'low_stock',
    title: 'Low Stock Alerts',
    value: '4 SKUs',
    change: '-2 items',
    isPositive: false,
    timeframe: 'needs reorder',
    iconName: 'AlertTriangle'
  }
];

export const MOCK_PRODUCTS: AdminProduct[] = [
  {
    id: 'prod-1',
    title: 'Nordic Minimalist Oak Dining Table',
    sku: 'FN-NT-101',
    category: 'Dining Room',
    brand: 'West Elm',
    price: 899.00,
    originalPrice: 1099.00,
    stock: 14,
    status: 'in_stock',
    rating: 4.9,
    salesCount: 142,
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=600&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'prod-2',
    title: 'Velvet Cloud 3-Seater Living Room Sofa',
    sku: 'FN-SF-204',
    category: 'Living Room',
    brand: 'Article',
    price: 1450.00,
    originalPrice: 1650.00,
    stock: 3,
    status: 'low_stock',
    rating: 4.8,
    salesCount: 88,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'prod-3',
    title: 'Ergonomic Task Mesh Office Chair',
    sku: 'FN-CH-308',
    category: 'Home Office',
    brand: 'Herman Miller',
    price: 540.00,
    stock: 28,
    status: 'in_stock',
    rating: 5.0,
    salesCount: 215,
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?q=80&w=600&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'prod-4',
    title: 'Mid-Century Walnut Credenza Sideboard',
    sku: 'FN-SB-402',
    category: 'Storage',
    brand: 'Pottery Barn',
    price: 1120.00,
    originalPrice: 1299.00,
    stock: 0,
    status: 'out_of_stock',
    rating: 4.7,
    salesCount: 64,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'prod-5',
    title: 'Artisan Solid Teak Outdoor Lounge Bed',
    sku: 'FN-OD-501',
    category: 'Outdoor',
    brand: 'Ashley Furniture',
    price: 780.00,
    stock: 19,
    status: 'in_stock',
    rating: 4.9,
    salesCount: 93,
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=600&auto=format&fit=crop',
    featured: true
  }
];

export const MOCK_CATEGORIES: AdminCategory[] = [
  {
    id: 'cat-1',
    name: 'Living Room',
    slug: 'living-room',
    subcategoriesCount: 6,
    productsCount: 142,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'cat-2',
    name: 'Dining Room',
    slug: 'dining-room',
    subcategoriesCount: 4,
    productsCount: 86,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=600&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'cat-3',
    name: 'Bedroom',
    slug: 'bedroom',
    subcategoriesCount: 5,
    productsCount: 98,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c5173?q=80&w=600&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'cat-4',
    name: 'Home Office',
    slug: 'home-office',
    subcategoriesCount: 3,
    productsCount: 54,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?q=80&w=600&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'cat-5',
    name: 'Outdoor & Patio',
    slug: 'outdoor',
    subcategoriesCount: 4,
    productsCount: 38,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=600&auto=format&fit=crop',
    featured: false
  }
];

export const MOCK_COLLECTIONS: AdminCollection[] = [
  {
    id: 'col-1',
    name: 'Mid-Century Velvet Edit',
    slug: 'mid-century-velvet',
    tagline: 'Rich textures and timeless silhouette lounge sofas & armchairs',
    productsCount: 28,
    status: 'published',
    bannerImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
    discountPercentage: 15
  },
  {
    id: 'col-2',
    name: 'Nordic Warmth 2026',
    slug: 'nordic-warmth',
    tagline: 'Light solid oak, soft ivory upholstery, and natural wood aesthetics',
    productsCount: 34,
    status: 'published',
    bannerImage: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=800&auto=format&fit=crop',
    discountPercentage: 10
  },
  {
    id: 'col-3',
    name: 'Executive Studio & Office',
    slug: 'executive-studio',
    tagline: 'High-performance ergonomic seating and walnut work desks',
    productsCount: 19,
    status: 'published',
    bannerImage: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?q=80&w=800&auto=format&fit=crop'
  }
];

export const MOCK_BRANDS: AdminBrand[] = [
  {
    id: 'br-1',
    name: 'Herman Miller',
    slug: 'herman-miller',
    country: 'United States',
    productsCount: 38,
    status: 'active',
    logo: 'HM',
    rating: 4.95
  },
  {
    id: 'br-2',
    name: 'West Elm',
    slug: 'west-elm',
    country: 'United States',
    productsCount: 72,
    status: 'active',
    logo: 'WE',
    rating: 4.85
  },
  {
    id: 'br-3',
    name: 'Article',
    slug: 'article',
    country: 'Canada',
    productsCount: 45,
    status: 'active',
    logo: 'AR',
    rating: 4.80
  },
  {
    id: 'br-4',
    name: 'IKEA Modern',
    slug: 'ikea-modern',
    country: 'Sweden',
    productsCount: 110,
    status: 'active',
    logo: 'IK',
    rating: 4.65
  }
];

export const MOCK_INVENTORY: AdminInventoryItem[] = [
  {
    id: 'inv-1',
    productName: 'Nordic Minimalist Oak Dining Table',
    sku: 'FN-NT-101',
    location: 'Warehouse A - Aisle 4 - Shelf B',
    currentStock: 14,
    reservedStock: 4,
    availableStock: 10,
    reorderPoint: 5,
    unitCost: 450.00,
    status: 'optimal'
  },
  {
    id: 'inv-2',
    productName: 'Velvet Cloud 3-Seater Living Room Sofa',
    sku: 'FN-SF-204',
    location: 'Warehouse B - Zone 2',
    currentStock: 3,
    reservedStock: 2,
    availableStock: 1,
    reorderPoint: 6,
    unitCost: 820.00,
    status: 'critical'
  },
  {
    id: 'inv-3',
    productName: 'Ergonomic Task Mesh Office Chair',
    sku: 'FN-CH-308',
    location: 'Warehouse A - Aisle 1 - Shelf A',
    currentStock: 28,
    reservedStock: 5,
    availableStock: 23,
    reorderPoint: 10,
    unitCost: 240.00,
    status: 'optimal'
  },
  {
    id: 'inv-4',
    productName: 'Mid-Century Walnut Credenza Sideboard',
    sku: 'FN-SB-402',
    location: 'Warehouse A - Aisle 6',
    currentStock: 0,
    reservedStock: 0,
    availableStock: 0,
    reorderPoint: 4,
    unitCost: 610.00,
    status: 'low'
  }
];

export const MOCK_REVIEWS: AdminReview[] = [
  {
    id: 'rev-1',
    productTitle: 'Velvet Cloud 3-Seater Living Room Sofa',
    productImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=200&auto=format&fit=crop',
    customerName: 'Sophia Montgomery',
    rating: 5,
    title: 'Exceeded all expectations!',
    comment: 'The velvet texture feels incredibly luxurious and sturdy. Delivery crew assembled it right in my living room.',
    sentiment: 'positive',
    verifiedBuyer: true,
    status: 'approved',
    createdAt: '2 hours ago'
  },
  {
    id: 'rev-2',
    productTitle: 'Nordic Minimalist Oak Dining Table',
    productImage: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=200&auto=format&fit=crop',
    customerName: 'Marcus Vance',
    rating: 5,
    title: 'Beautiful solid oak craftsmanship',
    comment: 'Fits 6 chairs comfortably. Grain on the wood top is gorgeous and smooth finish.',
    sentiment: 'positive',
    verifiedBuyer: true,
    status: 'approved',
    createdAt: 'Yesterday'
  },
  {
    id: 'rev-3',
    productTitle: 'Ergonomic Task Mesh Office Chair',
    productImage: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?q=80&w=200&auto=format&fit=crop',
    customerName: 'Daniel Kim',
    rating: 4,
    title: 'Great lumbar support for long hours',
    comment: 'Adjustable arms and tilt tension are smooth. Delivery took 3 days longer than estimated though.',
    sentiment: 'neutral',
    verifiedBuyer: true,
    status: 'pending',
    createdAt: '3 days ago'
  }
];

export const MOCK_ORDERS: AdminOrder[] = [
  {
    id: 'ord-1001',
    orderNumber: '#FRN-84920',
    customerName: 'Eleanor Vance',
    customerEmail: 'eleanor.v@example.com',
    itemsCount: 3,
    totalAmount: 2349.00,
    paymentStatus: 'paid',
    fulfillmentStatus: 'processing',
    createdAt: '2026-08-07 10:14 AM',
    shippingMethod: 'White Glove Freight'
  },
  {
    id: 'ord-1002',
    orderNumber: '#FRN-84921',
    customerName: 'Jameson Reed',
    customerEmail: 'j.reed@example.com',
    itemsCount: 1,
    totalAmount: 899.00,
    paymentStatus: 'paid',
    fulfillmentStatus: 'shipped',
    createdAt: '2026-08-06 04:30 PM',
    shippingMethod: 'Standard Express Truck'
  },
  {
    id: 'ord-1003',
    orderNumber: '#FRN-84922',
    customerName: 'Clara Oswald',
    customerEmail: 'clara.o@example.com',
    itemsCount: 2,
    totalAmount: 1439.00,
    paymentStatus: 'paid',
    fulfillmentStatus: 'delivered',
    createdAt: '2026-08-05 02:15 PM',
    shippingMethod: 'White Glove Freight'
  },
  {
    id: 'ord-1004',
    orderNumber: '#FRN-84923',
    customerName: 'Lucas Sterling',
    customerEmail: 'lucas.s@example.com',
    itemsCount: 4,
    totalAmount: 3820.00,
    paymentStatus: 'pending',
    fulfillmentStatus: 'pending',
    createdAt: '2026-08-07 11:45 AM',
    shippingMethod: 'White Glove Freight'
  }
];

export const MOCK_TRANSACTIONS: AdminTransaction[] = [
  {
    id: 'txn-1',
    transactionRef: 'TXN-98402198',
    orderNumber: '#FRN-84920',
    customerName: 'Eleanor Vance',
    paymentMethod: 'stripe',
    type: 'payment',
    amount: 2349.00,
    currency: 'USD',
    status: 'completed',
    date: '2026-08-07 10:15 AM'
  },
  {
    id: 'txn-2',
    transactionRef: 'TXN-98402199',
    orderNumber: '#FRN-84921',
    customerName: 'Jameson Reed',
    paymentMethod: 'credit_card',
    type: 'payment',
    amount: 899.00,
    currency: 'USD',
    status: 'completed',
    date: '2026-08-06 04:32 PM'
  },
  {
    id: 'txn-3',
    transactionRef: 'TXN-98402200',
    orderNumber: '#FRN-84812',
    customerName: 'Hannah Abbott',
    paymentMethod: 'paypal',
    type: 'refund',
    amount: 450.00,
    currency: 'USD',
    status: 'completed',
    date: '2026-08-05 11:10 AM'
  }
];

export const MOCK_COUPONS: AdminCoupon[] = [
  {
    id: 'coup-1',
    code: 'FURNIXO20',
    type: 'percentage',
    value: 20,
    minPurchase: 500,
    usageCount: 148,
    usageLimit: 500,
    startDate: '2026-08-01',
    expiryDate: '2026-08-31',
    status: 'active'
  },
  {
    id: 'coup-2',
    code: 'FREESHIP500',
    type: 'fixed',
    value: 120,
    minPurchase: 1200,
    usageCount: 84,
    startDate: '2026-07-15',
    expiryDate: '2026-09-01',
    status: 'active'
  },
  {
    id: 'coup-3',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    usageCount: 420,
    startDate: '2026-01-01',
    expiryDate: '2026-12-31',
    status: 'active'
  }
];

export const MOCK_DISCOUNTS: AdminDiscount[] = [
  {
    id: 'disc-1',
    name: 'Summer Living Room Sale',
    type: 'category',
    discountValue: '15% OFF',
    target: 'Living Room Sofas & Loungers',
    startDate: '2026-08-01',
    endDate: '2026-08-20',
    status: 'active',
    appliedCount: 230
  },
  {
    id: 'disc-2',
    name: 'Home Office Productivity Bundle',
    type: 'volume',
    discountValue: '$150 Flat Off',
    target: 'Desk + Ergonomic Chair Bundle',
    startDate: '2026-08-05',
    endDate: '2026-08-25',
    status: 'active',
    appliedCount: 94
  }
];

export const MOCK_SHIPPING_METHODS: AdminShippingMethod[] = [
  {
    id: 'ship-1',
    name: 'White Glove Assembly & Delivery',
    type: 'white_glove',
    estimatedDays: '3-5 Business Days',
    rate: 149.00,
    freeShippingThreshold: 2500.00,
    zone: 'Nationwide Metro',
    status: 'active'
  },
  {
    id: 'ship-2',
    name: 'Express Freight Trucking',
    type: 'express_freight',
    estimatedDays: '2-3 Business Days',
    rate: 89.00,
    zone: 'East & West Coast',
    status: 'active'
  },
  {
    id: 'ship-3',
    name: 'Standard Doorstep Ground',
    type: 'standard_ground',
    estimatedDays: '5-7 Business Days',
    rate: 49.00,
    freeShippingThreshold: 999.00,
    zone: 'All Regions',
    status: 'active'
  }
];
