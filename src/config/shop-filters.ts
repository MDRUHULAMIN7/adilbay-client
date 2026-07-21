export const SHOP_FILTERS = {
  categories: [
    { label: 'Living Room', value: 'living' },
    { label: 'Bedroom', value: 'bedroom' },
    { label: 'Dining & Kitchen', value: 'dining' },
    { label: 'Home Office', value: 'office' },
    { label: 'Outdoor Furniture', value: 'outdoor' },
    { label: 'Storage & Shelves', value: 'storage' },
  ],
  materials: [
    { label: 'Burma Teak', value: 'Solid Grade-A Teak' },
    { label: 'American Walnut', value: 'Solid American Walnut' },
    { label: 'Oakwood', value: 'Solid White Oak' },
    { label: 'Ash Wood', value: 'Solid Ash Wood' },
  ],
  colors: [
    { name: 'Natural Gold', hex: '#d4a373' },
    { name: 'Honey Oak', hex: '#b5838d' },
    { name: 'Deep Espresso', hex: '#4a3f35' },
    { name: 'Light Ash', hex: '#e9ecef' },
    { name: 'Charcoal Grey', hex: '#343a40' },
    { name: 'White Oak', hex: '#dfd3c3' },
  ],
  availability: [
    { label: 'In Stock', value: 'in-stock' },
    { label: 'Low Stock', value: 'low-stock' },
    { label: 'Out of Stock', value: 'out-of-stock' },
  ],
  sortOptions: [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Highest Rated', value: 'rating' },
  ],
  priceRanges: [
    { label: 'Under Tk 10,000', min: 0, max: 10000 },
    { label: 'Tk 10,000 - Tk 30,000', min: 10000, max: 30000 },
    { label: 'Tk 30,000 - Tk 60,000', min: 30000, max: 60000 },
    { label: 'Tk 60,000 - Tk 100,000', min: 60000, max: 100000 },
    { label: 'Over Tk 100,000', min: 100000, max: 1000000 },
  ],
};
