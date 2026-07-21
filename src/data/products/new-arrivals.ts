import { CATALOG_PRODUCTS } from './products';

export const NEW_ARRIVALS_PRODUCTS = CATALOG_PRODUCTS.filter((p) => p.isNew);
export default NEW_ARRIVALS_PRODUCTS;
