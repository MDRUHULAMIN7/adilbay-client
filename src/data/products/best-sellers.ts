import { CATALOG_PRODUCTS } from './products';

export const BEST_SELLERS_PRODUCTS = CATALOG_PRODUCTS.filter((p) => p.isBestSeller);
export default BEST_SELLERS_PRODUCTS;
