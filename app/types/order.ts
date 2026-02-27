export type Order = {
  id: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  deliveryMethod: string;
  deliveryAddress: string;
  deliveryPrice: string;
  createdAt: string;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  identifiant: string;
  orderItems: OrderItem[];
  payment: Payment[];
};
export type OrderStatus = "EN_ATTENTE" | "LIVRE" | "ANNULE";

export type OrderItem = {
  id: string;
  productId: string;
  orderId: Order;
  productName: string;
  price: number;
  quantity: number;
};
export type Payment = {
  id: string;
  orderId: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  amount: number;
  createdAt: string;
  response: string;
  paymentLink: string;
  sessionToken: string;
  farotyTransactionId: string;
  identifiant: string;
};

export type PaymentCash = {
  orderId: string;
  paymentMethod: PaymentMethod;
};

export type PaymentMethod =
  | "CASH"
  | "MOMO"
  | "OM"
  | "CARD"
  | "PAYPAL"
  | "FAROTY";

export type PaymentStatus = "Paid" | "Pending" | "Failed";
