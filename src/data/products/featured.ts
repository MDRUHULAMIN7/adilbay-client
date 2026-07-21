import { CATALOG_PRODUCTS } from './products';

export const FEATURED_PRODUCTS = CATALOG_PRODUCTS.filter((p) => p.isFeatured);
export default FEATURED_PRODUCTS;
