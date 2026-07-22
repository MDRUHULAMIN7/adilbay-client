export type CheckoutStep =
  | 'shipping_address'
  | 'billing_address'
  | 'shipping_method'
  | 'payment_method'
  | 'review'
  | 'success';

export type AddressLabel = 'home' | 'office' | 'other';

export interface ShippingAddress {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  division: string;
  district: string;
  postalCode: string;
  label?: AddressLabel;
  isDefault?: boolean;
}

export type BillingAddress = ShippingAddress;

export interface CheckoutFormData {
  shippingAddress: ShippingAddress;
  sameAsShipping: boolean;
  billingAddress?: BillingAddress;
  shippingMethodId: string;
  paymentMethodId: string;
  orderNotes?: string;
}
