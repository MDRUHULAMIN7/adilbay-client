import { PaymentMethodOption } from '@/types/payment';

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'cod',
    title: 'Cash on Delivery',
    description: 'Pay cash upon receiving and inspecting your furniture.',
    iconName: 'truck',
    requiresOnlineGateway: false,
    instructions: 'Please keep exact cash ready upon delivery for quick processing.',
  },
  {
    id: 'card',
    title: 'Credit / Debit Card',
    description: 'Visa, Mastercard, AMEX secure 256-bit encrypted gateway.',
    iconName: 'creditCard',
    requiresOnlineGateway: true,
  },
  {
    id: 'bkash',
    title: 'bKash / Nagad Mobile Banking',
    description: 'Instant mobile wallet payment with 0% extra fee.',
    iconName: 'wallet',
    requiresOnlineGateway: true,
  },
  {
    id: 'bank',
    title: 'Direct Bank Wire Transfer',
    description: 'BFTN / EFT transfer directly to Furnixo Corporate Account.',
    iconName: 'building',
    requiresOnlineGateway: false,
    instructions: 'Account: Furnixo Crafts Ltd | Bank: City Bank | A/C: 1102948192001',
  },
];
