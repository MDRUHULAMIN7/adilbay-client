export type PaymentMethodId = 'cod' | 'card' | 'bkash' | 'nagad' | 'bank';

export type PaymentGatewayStatus = 'pending' | 'success' | 'failed' | 'cancelled';

export interface PaymentMethodOption {
  id: PaymentMethodId;
  title: string;
  description: string;
  iconName: string;
  requiresOnlineGateway: boolean;
  instructions?: string;
}

export interface PaymentTransactionResult {
  transactionId: string;
  status: PaymentGatewayStatus;
  paymentMethod: PaymentMethodId;
  amount: number;
  message: string;
  timestamp: string;
}
